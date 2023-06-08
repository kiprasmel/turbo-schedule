/* eslint-disable react/prop-types */
/** not a concern since we're linking to a known website ourselves (github) */
/* eslint-disable react/jsx-no-target-blank */

/** TODO a11y */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React, { FC, useState, useRef, useLayoutEffect } from "react";
import { css } from "emotion";

import { Navbar } from "../navbar/Navbar";
import { LessonsList } from "./LessonsList";
import { DaysList } from "./DaysList";
import { LessonDisplay } from "./LessonDisplay";
import { getStuffFromSSM, useStudentScheduleMachine } from "./student-schedule-machine";
import { ScheduleDay } from "../../utils/selectSchedule";

export const SchedulePageDesktop: FC = () => {
	const SSM = useStudentScheduleMachine();
	const { selectedDay, selectedLessons, selectedLesson } = getStuffFromSSM(SSM.state)

	const searchElementRef = useRef<HTMLInputElement>(null);
	const [searchString, setSearchString] = useState<string>(SSM.state.context.participant.participant || "");

	const navbarElement = useRef<HTMLElement>(null);
	const [navbarHeight, setNavbarHeight] = useState<number>(0);

	useLayoutEffect(() => {
		const height = navbarElement?.current?.clientHeight || 0;
		setNavbarHeight(height);
	}, [setNavbarHeight]);

	return (
		<div
			className={css`
				display: flex;
				flex-direction: column;

				height: 100vh;
				max-height: 100vh;
				width: 100vw;
				max-width: 100vw;

				overflow: hidden; /** TODO investigate if actually works */
			`}
		>
			<Navbar
				ref={navbarElement}
				search={{
					searchElementRef,
					searchString,
					setSearchString,
				}}
			/>

			<main
				className={css`
					flex-grow: 1;

					max-height: calc(100% - ${navbarHeight}px);
					height: calc(100% - ${navbarHeight}px);
					overflow: hidden;

					display: flex;
					justify-content: space-between;
				`}
			>
				<DaysList selectedDay={selectedDay! /** TODO TS */} onSelectDay={(day) => SSM.send({ type: "SELECT_DAY", day: day === "*" ? day : (day) as ScheduleDay })} />

				<LessonsList lessons={selectedLessons} />

				<article
					className={css`
						/* background: lightskyblue; */
						flex: 5;
						flex-shrink: 3;

						overflow-x: hidden;
						overflow-y: auto;
					`}
				>
					<LessonDisplay lesson={selectedLesson} />
				</article>
			</main>
		</div>
	);
};
