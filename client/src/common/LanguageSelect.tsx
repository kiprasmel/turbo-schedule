import React, { FC, useState, useContext } from "react";

import { CurrentLangContext, ICurrentLangContextValue } from "../components/currentLangContext/currentLangContext";
import { useTranslation } from "../i18n/useTranslation";
import { ILang } from "i18n/i18n";

interface ILanguageSelectProps {
	// handleClick: (e: React.MouseEvent, language: ILang) => any;
}

const LanguageSelect: FC<ILanguageSelectProps> = () => {
	const langContext: ICurrentLangContextValue = useContext(CurrentLangContext);
	const { availableLangs, setLang } = langContext;

	const t = useTranslation();

	const [showLangs, setShowLangs] = useState<boolean>(false);

	const handleLangSelect = (newLang: ILang) => {
		setLang(newLang);
		setShowLangs(false);
	};

	return (
		<>
			<div style={{ position: "relative" }}>
				<div style={{ position: "absolute", top: 0, right: "20px", margin: 0, padding: 0, zIndex: 10 }}>
					{/* <Dropdown options={availableLangs} value={t("Language")} /> */}
					<button
						className="btn"
						style={{ marginRight: 0 }}
						onClick={(_e) => setShowLangs((_showLangs) => !showLangs)}
					>
						<div style={{ fontSize: "18px" }}>
							<i style={{ verticalAlign: "middle" }} className="material-icons md-18">
								translate
							</i>
							<span style={{ verticalAlign: "middle", marginLeft: "4px" }}>{t("Language")}</span>
						</div>
					</button>

					{showLangs && (
						// <ul style={{ position: "absolute", margin: 0, padding: 0 }}>
						<ul
							style={{
								margin: 0,
								padding: 0,
								marginTop: "6px",
								background: "#fff",
							}}
						>
							{availableLangs.map((lang, index) => (
								<li key={lang}>
									<button
										className="btn"
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
