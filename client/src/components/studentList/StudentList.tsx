import React from "react";
import "./StudentList.scss";

import AutoCompleteInput from "../../common/autocompleteInput/AutoCompleteInput";

import { history } from "../../utils/history";
import { useFetchParticipants } from "../../hooks/useFetchers";

import { useTranslation } from "../../i18n/useTranslation";

const StudentList = () => {
	const t = useTranslation();

	const [studentsList] = useFetchParticipants([], []);

	const handleAutoCompletionSelection = (autoCompletion: string) =>
		history.push("/" + encodeURIComponent(autoCompletion));

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
