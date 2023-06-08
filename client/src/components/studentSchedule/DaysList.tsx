/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

import React, { FC } from "react";
import { css } from "emotion";
import { scheduleDaysArray, ScheduleDay } from "../../utils/selectSchedule";

interface Props {
	selectedDay: ScheduleDay;
	onSelectDay: (day: ScheduleDay) => void
}

export const DaysList: FC<Props> = ({ selectedDay, onSelectDay }) => (
	<nav
		className={css`
			/* background: lightcyan; */
			flex: 1;
			flex-shrink: 2;

			min-width: 10em; /** TODO - does not prevent the shrinking when we want it to prevent:/ */

			height: 100%;
			max-height: 100%;
			overflow-x: hidden;
			overflow-y: auto;
		`}
	>
		<ul
			className={css`
				display: flex;
				flex-direction: column;

				height: 100%;

				align-items: center;
				justify-content: center;

				& > * {
					flex: 1;
				}

				& > * + * {
					border-top: 1px solid #000;
				}
			`}
		>
			{scheduleDaysArray.map((dayIndex) => (
				<li
					key={dayIndex}
					className={css`
									flex-grow: 1;
									width: 100%;


									/* ${dayIndex === selectedDay && "border-left: 0.75em solid #000;"} */
									position: relative;
								`}
				>
					{dayIndex === selectedDay && (
						<span
							className={css`
								position: absolute;
								left: 0;
								top: 0;

								width: 0.75em;
								height: 100%;

								background: #000;
							`}
						/>
					)}

					<button
						type="button"
						onClick={(_e) => onSelectDay(dayIndex)}
						className={css`
										display: flex;
										align-items: center;
										justify-content: center;

										width: 100%;
										height: 100%;
										font-size: 4em;

										/* ${dayIndex === selectedDay && "font-weight: 700; background: #000; color: lightcyan;"} */
									`}
					>
						<span>{dayIndex === "*" ? dayIndex : dayIndex + 1}</span>
					</button>
				</li>
			))}
		</ul>
	</nav>
);
