import React, { FC } from "react";

import Lesson, { ILessonProps } from "./Lesson";
import { ILesson } from "../../model/Lesson";

export interface IOneDayScheduleProps extends Omit<ILessonProps, "lesson" | "lessonIndex"> {
	lessonsArray: Array<ILesson>;

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
				<Lesson
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
