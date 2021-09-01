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
		const controller = new AbortController();

		fetchStudents(controller.signal).then((s) => setStudentsList(s));

		return (): void => {
			console.log("aborting!", controller.signal);
			controller.abort();
		};
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
