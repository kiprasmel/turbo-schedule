import React, { FC } from "react";

import { Lesson } from "@turbo-schedule/common";

import LessonItem, { LessonProps } from "./Lesson";

export interface IOneDayScheduleProps extends Omit<LessonProps, "lesson" | "lessonIndex"> {
	lessonsArray: Array<Lesson>;

	// ulProps: React.AllHTMLAttributes<HTMLUListElement>;
	// rest: any /** TODO like `CloseBtn` */;
}

const OneDaySchedule: FC<IOneDayScheduleProps> = ({
	lessonsArray = [],
	handleLessonMouseClick = () => null,
	handleLessonKeyboardClick = () => null,
}) => (
	<ul>
		{lessonsArray.map((lesson) => (
			<LessonItem
				key={lesson.id}
				lessonIndex={lesson.timeIndex}
				lesson={lesson}
				handleLessonMouseClick={handleLessonMouseClick}
				handleLessonKeyboardClick={handleLessonKeyboardClick}
			/>
		))}
	</ul>
);

export default OneDaySchedule;
