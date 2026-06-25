import { adminGetCourse } from "@/app/data/admin/admin-get-course";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function CoursesPage() {
    const data = await adminGetCourse();
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Your Course</h1>
                <Link className={buttonVariants()}
                href="/admin/courses/create">Create Courses</Link>
            </div>

            <div>
                {data.map((course) => (
                    <p key={course.id}>{course.title}</p>
                ))}
            </div>
        </>
    )
}