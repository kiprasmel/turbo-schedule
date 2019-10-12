import React from "react";

import { history } from "../utils/history";
import { useTranslation } from "../i18n/useTranslation";

const BackBtn = () => {
	const t = useTranslation();
	return (
		<div>
			<button className="btn btn--big" style={{ marginTop: "1em" }} onClick={(_e) => history.push("/")}>
				{t("Go back")}
			</button>
		</div>
	);
};

export default BackBtn;
