import React, { FC, Fragment } from "react";

import LessonTextBox, { ILessonTextBox } from "./LessonTextBox";
import { useRenderCount } from "../../hooks/useRenderCount";

import { getLessonTimesFormatted, isLessonHappeningNow } from "../../utils/getLessonTimes";

import { Lesson } from "@turbo-schedule/common";

import assets from "../../assets";
const { lessonLogo, classRoomLogo, studentLogo, teacherLogo, clockLogo } = assets;

export interface LessonProps {
	lessonIndex: number;
	lesson: Lesson;
	handleLessonMouseClick: (e: React.MouseEvent, lesson: Lesson) => any;
	handleLessonKeyboardClick: (e: React.KeyboardEvent, lesson: Lesson) => any;
}

const LessonItem: FC<LessonProps> = React.memo(
	({ lessonIndex, lesson, handleLessonMouseClick, handleLessonKeyboardClick }) => {
		useRenderCount("lesson");

		const { id, name, room, teacher, students, dayIndex, timeIndex } = lesson;

		/** TODO `howMuchDone` */
		let { isHappeningNow } = isLessonHappeningNow(dayIndex, timeIndex);

		const textBoxes: Array<ILessonTextBox> = [
			{ logo: lessonLogo, text: name },
			{ logo: classRoomLogo, text: room },
			{ logo: teacherLogo, text: teacher },
			{ logo: clockLogo, text: getLessonTimesFormatted(timeIndex) },
			{ logo: studentLogo, text: students?.length || "" },
		];

		return (
			<li
				key={id}
				tabIndex={0}
				onClick={(e) => handleLessonMouseClick(e, lesson)}
				onKeyDown={(e) => handleLessonKeyboardClick(e, lesson)}
				style={{
					background: "#eee",
					width: "90%",
					margin: "auto",
					padding: "4px",
					marginBottom: "1em",
					textAlign: "left",
					fontSize: "20px",
					cursor: "pointer",
				}}
			>
				<ul>
					{textBoxes.map((textBox, index: number) => (
						<Fragment key={index}>
							<LessonTextBox key={index} textBox={textBox} />

							{index === Math.floor(textBoxes.length / 2) - 1 && (
								<span
									style={{
										float: "right",
										marginRight: "1em",
										color: isHappeningNow ? "dodgerBlue" : "",
									}}
								>
									# {lessonIndex + 1}
								</span>
							)}
						</Fragment>
					))}
				</ul>
			</li>
		);
	}
);

export default LessonItem;
