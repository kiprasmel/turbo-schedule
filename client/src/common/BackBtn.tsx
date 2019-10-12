import React from "react";

import { history } from "../utils/history";
import { useTranslation } from "../i18n/useTranslation";

const BackBtn = () => {
	const t = useTranslation();

	return (
		<>
			<button className="btn btn--big" style={{ marginTop: "1em" }} onClick={(_e) => history.push("/")}>
				{t("Go back")}
			</button>
		</>
	);
};

export default BackBtn;
