import React, { FC } from "react";
// import React, { FC, useState, useContext } from "react";

// import "../../index.d";
// import "react-simple-dropdown/styles/Dropdown.css";
// import Dropdown, { DropdownTrigger, DropdownContent } from "react-simple-dropdown";

// import { CurrentLangContext, ICurrentLangContextValue } from "../currentLangContext/currentLangContext";

// import { useTranslation } from "../../i18n/useTranslation";

// // import { ReactComponent as TranslationLogo } from "../../asset/translateLogo.svg";

interface ILanguageSelectProps {
	// handleClick: (e: React.MouseEvent, language: ILang) => any;
}

const LanguageSelect: FC<ILanguageSelectProps> = () => {
	return <></>; /** TODO */
};
// const LanguageSelect: FC<ILanguageSelectProps> = () => {
// 	const langContext: ICurrentLangContextValue = useContext(CurrentLangContext);
// 	const { availableLangs, currentLang, setLang } = langContext;

// 	const t = useTranslation();

// 	const [showLangs, setShowLangs] = useState<boolean>(false);

// 	return (
// 		<>
// 			<Dropdown>
// 				<DropdownTrigger style={{ cursor: "pointer", width: "100%" }}>
// 					<button onClick={(e) => setShowLangs((_showLangs) => !_showLangs)}>
// 						{/* <TranslationLogo /> */}
// 						<span>{t("Language")}</span>
// 					</button>

// 					{/* {t("Language")} */}
// 				</DropdownTrigger>
// 				<DropdownContent>
// 					<ul>
// 						{availableLangs.map((lang) => (
// 							<li key={lang}>
// 								<button onClick={(e) => setLang(lang)}>{t(lang)}</button>
// 							</li>
// 						))}
// 					</ul>
// 				</DropdownContent>
// 			</Dropdown>

// 			{/* <Dropdown options={availableLangs} value={t("Language")} /> */}
// 			{/* {showLangs && (
// 				<ul>
// 					{availableLangs.map((lang) => (
// 						<li key={lang}>
// 							<button onClick={(e) => setLang(lang)}>{t(lang)}</button>
// 						</li>
// 					))}
// 				</ul>
// 			)} */}
// 		</>
// 	);
// };

export default LanguageSelect;
