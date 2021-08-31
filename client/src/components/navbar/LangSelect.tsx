/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

import React, { FC, useContext } from "react";

import { Select } from "../../common/Select";
import { CurrentLangContext } from "../currentLangContext/currentLangContext";
import { ILang } from "../../i18n/i18n";

interface Props {
	//
}

/** TODO `react-select` @ https://react-select.com */
export const LangSelect: FC<Props> = () => {
	const { currentLang, setLang, availableLangs } = useContext(CurrentLangContext);

	return (
		<Select
			name="lang"
			// // value={currentLang}
			defaultValue={currentLang.toUpperCase()}
			onChange={(e) => setLang(e.target.value.toLowerCase() as ILang)}
		>
			{availableLangs
				.map((lang) => lang.toUpperCase())
				.map((lang) => (
					<option key={lang} value={lang}>
						{lang}
					</option>
				))}
		</Select>
	);
};
