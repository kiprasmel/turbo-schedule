import React, { FC, useState, useContext } from "react";

import "./LanguageSelect.scss";

import { CurrentLangContext, ICurrentLangContextValue } from "../components/currentLangContext/currentLangContext";
import { ILang } from "../i18n/i18n";
import { useTranslation } from "../i18n/useTranslation";

interface ILanguageSelectProps {
	// handleClick: (e: React.MouseEvent, language: ILang) => any;
}

const LanguageSelect: FC<ILanguageSelectProps> = () => {
	const langContext: ICurrentLangContextValue = useContext(CurrentLangContext);
	const { availableLangs, setLang, currentLang } = langContext;

	const t = useTranslation();

	const [showLangs, setShowLangs] = useState<boolean>(false);

	const handleLangSelect = (newLang: ILang) => {
		setLang(newLang);
		setShowLangs(false);
	};

	return (
		<>
			<div style={{ position: "relative" }}>
				<div style={{ position: "absolute", top: "1ch", right: "2ch", margin: 0, padding: 0, zIndex: 10 }}>
					<button
						type="button"
						className=""
						style={{ textTransform: "uppercase" }}
						onClick={(_e) => setShowLangs((_showLangs) => !_showLangs)}
					>
						<span>{currentLang} </span>
						<span className="material-icons md-18" style={{ verticalAlign: "middle" }}>
							expand_more
						</span>
					</button>

					{showLangs && (
						<ul
							style={{
								margin: 0,
								padding: 0,
								marginTop: "6px",
								background: "#fff",
							}}
							className="language-list"
						>
							{availableLangs.map((lang, index) => (
								<li key={lang}>
									<button
										type="button"
										// className="btn"
										style={{
											width: "100%",
											borderTop: index === 0 ? "" : "none",
										}}
										onClick={(_e) => handleLangSelect(lang)}
									>
										{t(lang)}
									</button>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</>
	);
};

export default LanguageSelect;
