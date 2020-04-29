import {
	NonUniqueLesson,
	getDefaultNonUniqueLesson,
	createLessonWithParticipantsId,
	LessonInitData,
	p2students,
	p2teachers,
	p2rooms,
	Lesson,
	p2classes,
} from "@turbo-schedule/common";

export const createLessonWithParticipants = (data: LessonInitData = getDefaultNonUniqueLesson()): NonUniqueLesson => {
	const { participants } = data;

	const teachers = p2teachers(participants);
	const rooms = p2rooms(participants);

	/** @deprecated - only for backwards compatibility */
	const teacher = teachers.join(", ").trim();

	/** @deprecated - only for backwards compatibility */
	const room = rooms.join(", ").trim();

	const almostLesson: Omit<NonUniqueLesson, "id"> = {
		...data,

		teacher,
		room,
	};

	const id: string = createLessonWithParticipantsId(almostLesson as NonUniqueLesson);

	return {
		...almostLesson,
		id,
	};
};

export const createLesson = (data: NonUniqueLesson = getDefaultNonUniqueLesson()): Lesson => {
	const { participants, ...rest } = data;

	const teachers = p2teachers(participants);
	const rooms = p2rooms(participants);
	const classes = p2classes(participants);
	const students = p2students(participants);

	return {
		...rest,
		teachers,
		rooms,
		classes,
		students,
	};
};
