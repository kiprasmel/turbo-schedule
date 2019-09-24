import React, { useState, useEffect } from "react";
import "./StudentList.scss";

import { fetchStudentsList } from "../../utils/fetchStudentsList";
import AutoCompleteInput from "../../common/autocompleteInput/AutoCompleteInput";

import { history } from "../../utils/history";

import { useTranslation } from "../../i18n/useTranslation";

const StudentList = () => {
	const t = useTranslation();

	const [studentsList, setStudentsList] = useState();

	useEffect(() => {
		const wrapper = async () => {
			const studentsList: Array<any> = await fetchStudentsList();

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
				autoFocus={true}
			/>
		</div>
	);
};

export default StudentList;
