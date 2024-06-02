import { cache } from "react";
import { dbClient } from "@/shared/lib/db";

class CoursesRepository {
  getCoursesList = cache(
    (): Promise<CourseListElement[]> => dbClient.course.findMany(),
  );

  createCourseElement = (
    command: CreateCourseListElementCommand,
  ): Promise<CourseListElement> => {
    return dbClient.course.create({
      data: command,
    });
  };

  deleteCourseElement = (command: DeleteCourseListElementCommand) => {
    return dbClient.course.delete({
      where: { id: command.id },
    });
  };
}

export const coursesRepository = new CoursesRepository();
