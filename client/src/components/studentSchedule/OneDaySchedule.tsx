import React, { FC } from "react";

import LessonItem, { LessonProps } from "./Lesson";
import { Lesson } from "@turbo-schedule/common";

export interface IOneDayScheduleProps extends Omit<LessonProps, "lesson" | "lessonIndex"> {
	lessonsArray: Array<Lesson>;

	// ulProps: React.AllHTMLAttributes<HTMLUListElement>;
	// rest: any /** TODO like `CloseBtn` */;
}

const OneDaySchedule: FC<IOneDayScheduleProps> = ({
	lessonsArray = [],
	handleLessonMouseClick = () => null,
	handleLessonKeyboardClick = () => null,
}) => {
	return (
		<ul>
			{lessonsArray.map((lesson, index) => (
				<LessonItem
					key={lesson.id}
					lessonIndex={index}
					lesson={lesson}
					handleLessonMouseClick={handleLessonMouseClick}
					handleLessonKeyboardClick={handleLessonKeyboardClick}
				/>
			))}
		</ul>
	);
};

export default OneDaySchedule;
