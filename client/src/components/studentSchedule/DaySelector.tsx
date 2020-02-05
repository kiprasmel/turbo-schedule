import React, { FC } from "react";
import { scheduleDaysArray, ScheduleDay } from "../../utils/selectSchedule";
import { useTranslation } from "../../i18n/useTranslation";

export interface DaySelectorProps {
	selectedDay: ScheduleDay;
	handleClick: (e: React.MouseEvent, day: ScheduleDay) => any;
}

const DaySelector: FC<DaySelectorProps> = ({ selectedDay, handleClick }) => {
	const t = useTranslation();
	return (
		<div style={{ width: "100%", position: "sticky", top: "0", background: "#fff" }}>
			{scheduleDaysArray.map((dayIndex) => (
				<button
					key={dayIndex}
					onClick={(e) => handleClick(e, dayIndex)}
					className={`btn${dayIndex === selectedDay ? " selected" : ""}`}
					style={{ display: "inline-block", width: `${100 / scheduleDaysArray.length}%`, minHeight: "30px" }}
				>
					<span>{dayIndex === "Week" ? t("Week") : dayIndex + 1}</span>
				</button>
			))}
		</div>
	);
};

export default DaySelector;
