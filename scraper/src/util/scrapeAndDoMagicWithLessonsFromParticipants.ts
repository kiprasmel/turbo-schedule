import { Participant, Lesson, NonUniqueLesson, mergeDuplicateLessons, sortLessons } from "@turbo-schedule/common";

import { extractLessonFromTeacher } from "./extractLessons";
import { createLesson } from "../initializer/createLesson";

const awaitAll = async <T>(promises: Promise<T[]>[]) => await Promise.all(promises);
const flatten = <T>(items: T[][]): T[] => items.flat();
const createLeanLessons = (lessons: NonUniqueLesson[]) => lessons.map(createLesson);

export const scrapeAndDoMagicWithLessonsFromParticipants = async (
	participants: Participant[] = [],
	lessonPromises: Promise<NonUniqueLesson[]>[] = participants.map((p) =>
		extractLessonFromTeacher(p.originalScheduleURI, {
			text: p.text,
			isActive: true,
			labels: p.labels,
		})
	).flat()
): Promise<Lesson[]> =>
	await (lessonPromises |> awaitAll)
		|> flatten
		|> mergeDuplicateLessons
		|> sortLessons
		|> createLeanLessons
	;
