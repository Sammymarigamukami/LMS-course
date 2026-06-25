import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";


export async function adminGetCourse() {
    await requireAdmin();

    const data = await prisma.course.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            id: true,
            title: true,
            smallDescription: true,
            duration: true,
            level: true,
            status: true,
            price: true,
            fileKey:true,
            slug: true,
        }
    });
    return data;
}

export type AdminCourseType = Awaited<ReturnType<typeof adminGetCourse>>[0];