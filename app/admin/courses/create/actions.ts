"use server"

import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/type";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchemas";
import { request } from "@arcjet/next";
import { headers } from "next/headers";

const aj = arcjet
.withRule(
    detectBot({
        mode: "LIVE",
        allow: [],
    })
)
.withRule(
    fixedWindow({
        mode: "LIVE",
        window: "1m",
        max: 5
    })
)

export async function CreateCourse(values: CourseSchemaType): Promise<ApiResponse>{

    const session = await requireAdmin();

    try {

        const req = await request();
        const decision = await aj.protect(req, {
            fingerprint: session.user.id,
        });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return {
                    status: "error",
                    message: "Too many requests. Please try again later.",
                };
            } else {
                return {
                    status: "error", 
                    message: "Request denied",
                }
            }
        }
        
        const validation = courseSchema.safeParse(values);

        if (!validation.success) {
            return {
                status: "error",
                message: "Invalid Form Data",
            }
        }

         await prisma.course.create({
            data: {
                ...validation.data,
                userId: session?.user.id as string,
            }
        });
        return {
            status: "success",
            message: "Course created successfully",
        }
    } catch (error) {
        console.log("Error creating course:", error);
        return {
            status: "error",
            message: "Failed to create course",
        }
    }
}