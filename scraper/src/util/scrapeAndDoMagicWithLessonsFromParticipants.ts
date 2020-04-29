import { Participant, Lesson, NonUniqueLesson, mergeDuplicateLessons, sortLessons } from "@turbo-schedule/common";

import { extractLessonFromTeacher } from "./extractLessons";
import { createLesson } from "../initializer/createLesson";

export const scrapeAndDoMagicWithLessonsFromParticipants = async (participants: Participant[]): Promise<Lesson[]> => {
	const nonUniqueLessons2DWithParticipants: NonUniqueLesson[][] = await Promise.all(
		participants.map((p) =>
			extractLessonFromTeacher(p.originalScheduleURI, {
				text: p.text,
				isActive: true,
				labels: p.labels,
			})
		)
	);

	const nonUniqueLessonsWithParticipants: NonUniqueLesson[] = nonUniqueLessons2DWithParticipants.flat();

	const uniqueLessonsWithParticipants: NonUniqueLesson[] = mergeDuplicateLessons(nonUniqueLessonsWithParticipants);

	const sortedUniqueLessonsWithParticipants: NonUniqueLesson[] = sortLessons(uniqueLessonsWithParticipants);

	const sortedUniqueLeanLessons: Lesson[] = sortedUniqueLessonsWithParticipants.map(createLesson);

	return sortedUniqueLeanLessons;
};
