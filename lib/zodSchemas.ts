// don,t worry much about this file i have already defined it in the admin/courses/create/page.tsx file
// Same error i am supposed to fix price and duration i have had to set them as string in the page.tsx file
// because react-hook-form does not support z.coerce.number() as of now
// I will keep an eye on the react-hook-form updates and when they support it i will change it back to number
// for now just ignore this file and the errors in the page.tsx file
import { z } from "zod"


export const courseLevels = ["beginner", "intermediate", "advanced"] as const;
export const courseStatus = ["draft", "published", "archived"] as const;

export const courseSchema = z.object({
        title: z.string().min(3,{
            message: "Title must be at least 3 characters long"}).max(100, {
                message: "Title must be at most 100 characters long"}),
        description: z.string().min(10, {
            message: "Description must be at least 10 characters long"}),
        fileKey: z.string().min(1,{
            message: "File key is required"}),
        price: z.coerce.number().min(1, 
            {message: "Price must be at least 1"}),
        duration: z.coerce.number().min(1, {
            message: "Duration must be at least 1 hour"}).max(500),
        level: z.enum(courseLevels, {message: "Level is required"}),
        category: z.string(),
        smallDescription: z.string().min(10, {
            message: "Small Description must be at least 3 characters long"}).max(200, {
                message: "Small Description must be at most 200 characters long"}),
        slug: z.string().min(3, {
            message: "Slug must be at least 3 characters long"}).max(100, {
                message: "Slug must be at most 100 characters long"}),
        status: z.enum(courseStatus, {
            message: "Status is required"}),
    });

export type CourseSchemaType = z.infer<typeof courseSchema>;