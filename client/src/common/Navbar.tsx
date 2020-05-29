/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

import React, { forwardRef, useContext } from "react";
import { Link } from "react-router-dom";
import { css } from "emotion";

import { CurrentLangContext } from "../components/currentLangContext/currentLangContext";
import { ILang } from "../i18n/i18n";
import { useTranslation } from "../i18n/useTranslation";

interface Props {
	searchElementRef: React.RefObject<HTMLInputElement>;
	searchString: string;
	setSearchString: React.Dispatch<React.SetStateAction<string>>;
}

export const Navbar = forwardRef<HTMLElement, Props>(({ searchElementRef, searchString, setSearchString }, ref) => {
	const { currentLang, setLang, availableLangs } = useContext(CurrentLangContext);
	const t = useTranslation();

	return (
		<nav
			ref={ref}
			className={css`
				/* background: red; */
				/* flex: 0 1 auto; */

				/* min-height: 3.75em;
					height: 3.75em; */
				max-height: 6rem;
				height: 6rem;
				font-size: 1.25em;

				display: flex;
				align-items: center;
				justify-content: end;
				/* justify-content: space-between; */

				padding-left: 2em;
				padding-right: 2em;

				& > * + * {
					margin-left: 2em;
				}
			`}
		>
			{/* left */}
			{/* <div
					className={css`
						display: flex;
						align-items: center;

					`}
				> */}
			<h1
				className={css`
					display: inline-block;
				`}
			>
				<Link to="/">{t("Turbo Schedule")}</Link>
			</h1>

			<span>
				<input
					type="search"
					name="search"
					ref={searchElementRef}
					className={css`
						font-size: 1.5em;
						max-width: 12em;
						padding: 0.3em 0.3em;
						/* padding: 0.5em 0.5em; */

						border: 0.125em solid #000;
						border-radius: 0.5em;

						border-top-right-radius: 0;
						border-bottom-right-radius: 0;
					`}
					value={searchString}
					onChange={(e) => setSearchString(e.target.value)}
					onFocus={(e) => e.target.select()}
				/>
				<button
					type="button"
					onClick={(_e) => {
						setSearchString("");
						searchElementRef?.current?.focus();
					}}
					className={css`
						/** same as input's - just different borders */
						font-size: 1.5em;
						max-width: 12em;
						/* padding: 0.3em 0.3em; */
						padding: 0.3em 0.6em;
						/* padding: 0.5em 0.5em; */

						border: 0.125em solid #000;
						border-radius: 0.5em;

						border-top-left-radius: 0;
						border-bottom-left-radius: 0;

						border-left: none; /** avoid double border */

						outline: none;
						cursor: pointer;
					`}
				>
					X
				</button>
			</span>

			<ul
				className={css`
					flex-grow: 1;

					display: flex;
					align-items: center;
					justify-content: center;

					& > * + * {
						margin-left: 2em;
					}

					font-size: 1.2em;
				`}
			>
				{/* SOON™ */}
				{/* <li>
						<Link
							to={`/${participant.text}`}
							className={css`
								border-bottom: 0.125em solid #000;
								font-weight: bold;
							`}
						>
							{t("Schedule")}
						</Link>
					</li>
					<li>
						<Link to={`/${participant.text}/stats`}>{t("Statistics")}</Link>
					</li> */}
				{/* SOON™ */}
				{/* <li
						className={css`
							margin-left: auto;
						`}
					>
						<Link to="/about">{t("About")}</Link>
					</li> */}
				<li
					className={css`
						margin-left: auto;
					`}
				>
					<a href="https://ts.kipras.org/api" target="_blank" rel="noopener">
						API
					</a>
				</li>
				<li>
					<a href="https://github.com/sarpik/turbo-schedule" target="_blank" rel="noopener">
						GitHub
					</a>
				</li>
				<li>
					{/* <Select options={availableLangs.map((lang) => ({ value: lang, label: lang.toUpperCase() }))} /> */}
					<select
						name="lang"
						// value={currentLang}
						defaultValue={currentLang.toUpperCase()}
						onChange={(e) => setLang(e.target.value.toLowerCase() as ILang)}
						className={css`
							vertical-align: bottom;
							font-size: 1em;
						`}
					>
						{availableLangs
							.map((lang) => lang.toUpperCase())
							.map((lang) => (
								<option key={lang} value={lang}>
									{lang}
								</option>
							))}
					</select>
				</li>
			</ul>
		</nav>
	);
});
