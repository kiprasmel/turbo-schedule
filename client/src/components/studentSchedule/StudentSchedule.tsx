import React, { useState, useEffect, useCallback, useRef } from "react";
import { throttle } from "lodash";

import { Lesson, getDefaultLesson } from "@turbo-schedule/common";

import "./StudentSchedule.scss";

import Footer from "components/footer/Footer";
import Header from "components/header/Header";
import StudentListModal from "./StudentListModal";
import Loading from "../../common/Loading";
import BackBtn from "../../common/BackBtn";
import { useRenderCount } from "../../hooks/useRenderCount";

import { fetchStudent } from "../../utils/fetchStudent";
import DaySelector from "./DaySelector";
import { ScheduleDay, getTodaysScheduleDay } from "../../utils/selectSchedule";
import { useTranslation } from "../../i18n/useTranslation";
import OneDaySchedule from "./OneDaySchedule";
import { SchedulePageDesktop } from "./SchedulePageDesktop";

export interface IStudentScheduleProps {
	match: any /** TODO */;
}

const StudentSchedule = ({ match }: IStudentScheduleProps) => {
	const t = useTranslation();

	useRenderCount("schedule");

	/** scroll to top of page on mount */
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	/** TODO week component */
	const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

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

	const { studentName } = match.params;

	const todaysScheduleDay: ScheduleDay = getTodaysScheduleDay({
		defaultToDay: 0,
	});
	const [selectedDay, setSelectedDay] = useState<ScheduleDay>(todaysScheduleDay);

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

	const [showStudents, setShowStudents] = useState(false);

	const [selectedLesson, setSelectedLesson] = useState<Lesson>(() => getDefaultLesson());

	const handleLessonMouseClick = useCallback(
		(_e: React.MouseEvent, lesson: Lesson) => {
			setShowStudents((_showStudents) => !_showStudents);
			setSelectedLesson(lesson);
		},
		[setShowStudents, setSelectedLesson]
	);

	const handleLessonKeyboardClick = (e: React.KeyboardEvent, lesson: any) => {
		if (e.key !== "Enter") {
			return;
		}

		/** avoid instantly closing the modal */
		e.preventDefault();

		setShowStudents(!showStudents);
		setSelectedLesson(lesson);
	};

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

	const isDesktop: boolean = windowWidth > 1024;

	return (
		<>
			{isDesktop ? (
				<SchedulePageDesktop />
			) : (
				<>
					<Header />

					<BackBtn />

					<h1>{studentName}</h1>

					<DaySelector selectedDay={selectedDay} handleClick={(_e, day) => setSelectedDay(day)} />

					<br />

					{selectedDay === "Week" ? (
						scheduleByDays.map((lessonsArray, index) => (
							<div key={index} style={weekStyles}>
								<h3 style={{ padding: "1em 2em" }}>{t("weekday")(index)}</h3>

								<OneDaySchedule
									key={index}
									lessonsArray={lessonsArray}
									handleLessonMouseClick={handleLessonMouseClick}
									handleLessonKeyboardClick={handleLessonKeyboardClick}
									// ulProps={{ style: { display: "inline-block" } }}
								/>
							</div>
						))
					) : (
						<>
							<OneDaySchedule
								lessonsArray={scheduleByDays[selectedDay]}
								handleLessonMouseClick={handleLessonMouseClick}
								handleLessonKeyboardClick={handleLessonKeyboardClick}
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
