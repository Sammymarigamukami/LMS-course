import { AdminCourseType } from "@/app/data/admin/admin-get-course";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface iAppProps {
    data: AdminCourseType;
}
export function AdminCourseCard({ data }: iAppProps) {
    return (
        <Card className="group relative">
            <div></div>
            <Image src={data.fileKey} alt="Thumbnail Url" width={600} height={400} />
        </Card>
    )
}