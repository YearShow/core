import { revalidatePath } from "next/cache";
import { coursesRepository } from "../courses.repository";
import { CourseItem } from "../ui/course-item";

export async function CoursesList({
    revalidatePagePath,
}: {
    revalidatePagePath: string;
}) {
    const coursesList = await coursesRepository.getCoursesList();


    const handleDeleteAction = async (coureseId: string) => {
        "use server";

        await coursesRepository.deleteCourseElement({id: coureseId});
        await revalidatePath(revalidatePagePath);
    }

    return <div className="flex flex-col gap-3">
        {coursesList.map(course => (
            <CourseItem 
            course={course} 
            onDelete={handleDeleteAction.bind(null, course.id)} 
            />
        ))}
    </div>
}