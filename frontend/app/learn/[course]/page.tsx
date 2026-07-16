import { redirect } from "next/navigation";
import { courseRoutes } from "@/lib/courseConfig";

export default function CourseLearningEntry({ params }: { params: { course: string } }) {
  redirect(courseRoutes.modules(params.course));
}
