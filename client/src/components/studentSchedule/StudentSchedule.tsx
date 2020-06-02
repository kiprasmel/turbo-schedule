import React, { useState, useEffect, useRef } from "react";
import { throttle } from "lodash";

import { Lesson, getDefaultLesson, Student } from "@turbo-schedule/common";

import "./StudentSchedule.scss";

import Footer from "components/footer/Footer";
import { Navbar } from "components/navbar/Navbar";
import { history } from "utils/history";
import StudentListModal from "./StudentListModal";
import Loading from "../../common/Loading";
import BackBtn from "../../common/BackBtn";

import { fetchStudent } from "../../utils/fetchStudent";
import DaySelector from "./DaySelector";
import { ScheduleDay, getTodaysScheduleDay } from "../../utils/selectSchedule";
import { useTranslation } from "../../i18n/useTranslation";
import { SchedulePageDesktop } from "./SchedulePageDesktop";
import { LessonsList } from "./LessonsList";

export interface IStudentScheduleProps {
	match: any /** TODO */;
}

const StudentSchedule = ({ match }: IStudentScheduleProps) => {
	const t = useTranslation();

	/** scroll to top of page on mount */
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	/** TODO week component */
	const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

	const isDesktop: boolean = windowWidth > 1024;

	const baseWeekStyles: React.CSSProperties = { verticalAlign: "top" };
	const weekStyles: React.CSSProperties = {
		...baseWeekStyles,
		...(windowWidth > 777 ? { display: "inline-block" } : { display: "block" }),
	};

	const throttledWindowWidth = useRef(
		throttle(() => {
			setWindowWidth(window.innerWidth);
		}, 1000)
	);

	window.addEventListener("resize", () => throttledWindowWidth.current());

	/** END TODO week component */

	const { params } = match;
	const { studentName } = params;

	const todaysScheduleDay: ScheduleDay = getTodaysScheduleDay({
		defaultToDay: 0,
	});

	/**
	 * TODO FIXME PARAMS - everything that comes from the route params, SHALL BE the single source of truth
	 * without any additional bs states, because we have to sync them & bugs come real quick
	 */
	const [selectedDay, setSelectedDay] = useState<ScheduleDay>(
		params.dayIndex !== undefined ? decodeDay(params.dayIndex) : todaysScheduleDay
	);

	useEffect(() => {
		setSelectedDay(params.dayIndex !== undefined ? decodeDay(params.dayIndex) : todaysScheduleDay);
	}, [params.dayIndex]);

	// const [selectedSchedule, setSelectedSchedule] = useState<Array<Array<ILesson>> | Array<ILesson>>([]);

	// const handleDayChange = (newDay: ScheduleDay) => {
	// 	setSelectedDay(newDay);

	// 	if (selectedDay === "Week") {
	// 		setSelectedSchedule(scheduleByDays);
	// 	} else {
	// 		setSelectedSchedule(scheduleByDays[selectedDay - 1]);
	// 	}
	// };

	const [isLoading, setIsLoading] = useState(true);
	const [scheduleByDays, setScheduleByDays] = useState([[]] as Array<Array<Lesson>>);

	useEffect(() => {
		const wrapper = async () => {
			try {
				setIsLoading(true);
				const { lessons } = await fetchStudent(studentName);

				if (!lessons || !lessons.length) {
					setScheduleByDays([[]]);
					setIsLoading(false);
					return;
				}

				const scheduleByDays: Array<Array<Lesson>> = [];

				lessons.forEach((lesson) => {
					/** make sure there's always an array inside an array */
					if (!scheduleByDays[lesson.dayIndex]) {
						scheduleByDays.push([]);
					}

					scheduleByDays[lesson.dayIndex].push(lesson);
				});

				setScheduleByDays(scheduleByDays);
				setIsLoading(false);
			} catch (err) {
				console.error("Error!", err);
				setScheduleByDays([[]]);
				setIsLoading(false);
			}
		};

		wrapper();
	}, [studentName]);

	/** TODO refactor me */
	const [showStudents, setShowStudents] = useState(false);

	const [selectedLesson, setSelectedLesson] = useState<Lesson>(() => getDefaultLesson());

	useEffect(() => {
		/**
		 * it should only open the lesson if the lesson was selected
		 * (otherwise only the day has changed on mobile).
		 *
		 * But if it's desktop, we have enough screen size
		 * & we update & show the lesson even if only the day is changed
		 */
		const shouldShowTheLesson: boolean = showStudents || isDesktop;

		navigateToDesiredPath({
			studentName,
			day: selectedDay,
			timeIndex: selectedLesson.timeIndex,
			shouldShowTheLesson,
		});
	}, [studentName, selectedDay, selectedLesson, isDesktop, showStudents]);

	if (isLoading) {
		return (
			<>
				<BackBtn />

				<h1>{studentName}</h1>

				<Loading />
			</>
		);
	}

	if (!scheduleByDays || !scheduleByDays.length || !scheduleByDays[0] || !scheduleByDays[0].length) {
		return (
			<>
				<BackBtn />

				<h1>{t("Student not found")(studentName)}</h1>
				<p>{t("Go back and search for a different one")}</p>
			</>
		);
	}

	return (
		<>
			{isDesktop ? (
				<SchedulePageDesktop match={match} />
			) : (
				<>
					<Navbar />

					<h1>{studentName}</h1>

					<DaySelector
						selectedDay={selectedDay}
						handleClick={(_e, day) => {
							setSelectedDay(day);
							// handleLessonOrDaySelection({
							// 	day,
							// 	lesson: selectedLesson,
							// 	shouldShowTheLesson: false,
							// });
						}}
					/>

					<br />

					{selectedDay === "*" ? (
						scheduleByDays.map((lessonsArray, index) => (
							<div key={index} style={weekStyles}>
								<h3 style={{ padding: "1em 2em" }}>{t("weekday")(index)}</h3>

								<LessonsList
									lessons={lessonsArray}
									selectedDay={selectedDay}
									selectedLesson={null}
									handleClick={(_e, lesson) => {
										setSelectedLesson(lesson);
										setShowStudents(true);
										// handleLessonOrDaySelection({
										// 	day: selectedDay,
										// 	lesson,
										// 	shouldShowTheLesson: true,
										// });
									}}
								/>
							</div>
						))
					) : (
						<>
							<LessonsList
								lessons={scheduleByDays[selectedDay]}
								selectedDay={selectedDay}
								selectedLesson={null}
								handleClick={(_e, lesson) => {
									setSelectedLesson(lesson);
									setShowStudents(true);
									// handleLessonOrDaySelection({
									// 	day: selectedDay,
									// 	lesson,
									// 	shouldShowTheLesson: true,
									// });
								}}
							/>
						</>
					)}

					<StudentListModal
						isOpen={showStudents}
						handleClose={() => setShowStudents((_showStudents) => !_showStudents)}
						lesson={selectedLesson}
					/>

					<Footer />
				</>
			)}
		</>
	);
};

export default StudentSchedule;

/** TODO architect in such a way that we won't need this */
const encodeDay = (day: ScheduleDay) => (day === "*" ? "*" : Number(day) + 1);
const decodeDay = (day: number | "*"): ScheduleDay => (day === "*" ? "*" : ((day - 1) as ScheduleDay));

const encodeTimeIndex = (time: number) => time + 1;
// const decodeTimeIndex = (time: number) => time - 1;

const navigateToDesiredPath = ({
	studentName,
	day,
	timeIndex,
	shouldShowTheLesson /** shall be `false` on mobile unless the lesson was selected; always `true` on desktop */,
}: {
	studentName: Student["text"];
	day: ScheduleDay;
	timeIndex: number;
	shouldShowTheLesson: boolean;
}): void => {
	const encodedDay = encodeDay(day);
	const encodedTimeIndex = encodeTimeIndex(timeIndex);

	if (!studentName?.trim() || day === undefined) {
		return;
	}

	if (timeIndex === undefined || !shouldShowTheLesson) {
		history.push(`/${studentName}/${encodedDay}`);
		return;
	}

	history.push(`/${studentName}/${encodedDay}/${encodedTimeIndex}`);
};
