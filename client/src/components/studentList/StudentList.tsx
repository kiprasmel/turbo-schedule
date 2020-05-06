import React, { useState, useEffect } from "react";
import "./StudentList.scss";
import { StudentFromList } from "@turbo-schedule/common";

import { fetchStudents } from "../../utils/fetchStudents";
import AutoCompleteInput from "../../common/autocompleteInput/AutoCompleteInput";

import { history } from "../../utils/history";

import { useTranslation } from "../../i18n/useTranslation";

const StudentList = () => {
	const t = useTranslation();

	const [studentsList, setStudentsList] = useState<StudentFromList[]>([]);

	useEffect(() => {
		const wrapper = async () => {
			const studentsList: StudentFromList[] = await (await fetchStudents()).map((s) => ({
				...s,
				text:
					s.labels[0] === "student"
						? s.firstName + " " + s.lastName + " " + s.classNum + s.classChar
						: s.labels[0] === "class"
							? s.text
							: s.labels[0] === "teacher" || s.labels[0] === "room"
						? s.text
						: s.text,

				// (
				// 	s.firstName && s.lastName ? s.firstName + " " + s.lastName : s.text
				// ) + (s.classNum && s.classChar)
				// 	? " " + s.classNum + s.classChar
				// 	: "",
			}));

			setStudentsList(studentsList);
		};

		wrapper();
	}, []);

	const handleAutoCompletionSelection = (autoCompletion: string) => {
		console.log("autoCompletion", autoCompletion);
		autoCompletion = encodeURIComponent(autoCompletion);

		history.push(`/${autoCompletion}`);
	};

	return (
		<div className="wrapper">
			<h1>{t("I am")}</h1>

			<AutoCompleteInput
				autoCompletionsArray={studentsList}
				handleAutoCompletionSelection={handleAutoCompletionSelection}
				autoFocus
			/>
		</div>
	);
};

export default StudentList;
