import React, { FC } from "react";
import { css } from "emotion";
import { scheduleDaysArray, ScheduleDay } from "../../utils/selectSchedule";

export interface DaySelectorProps {
	selectedDay: ScheduleDay;
	handleClick: (e: React.MouseEvent, day: ScheduleDay) => any;
}

const DaySelector: FC<DaySelectorProps> = ({ selectedDay, handleClick }) => (
	<div
		className={css`
			width: 100%;
			position: sticky;
			top: 0;
			background: #fff;
			z-index: 1;

			& > * {
				border-left: none !important;
			}

			& > *:last-child {
				border-right: none !important;
			}
		`}
	>
		{scheduleDaysArray.map((dayIndex) => (
			<button
				type="button"
				key={dayIndex}
				onClick={(e) => handleClick(e, dayIndex)}
				className={
					css`
						display: inline-block;
						width: ${100 / scheduleDaysArray.length}%;
						min-height: 30px;
					` + ` btn${dayIndex === selectedDay ? " selected" : ""}`
				}
			>
				<span>{dayIndex === "*" ? dayIndex : dayIndex + 1}</span>
			</button>
		))}
	</div>
);

export default DaySelector;
