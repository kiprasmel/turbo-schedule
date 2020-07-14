/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

import React, { forwardRef, useContext } from "react";
import { Link } from "react-router-dom";
import { css } from "emotion";

import { SearchProps, Search } from "./Search";
import { CurrentLangContext } from "../currentLangContext/currentLangContext";
import { ILang } from "../../i18n/i18n";
import { useTranslation } from "../../i18n/useTranslation";

interface Props {
	search?: false | SearchProps;
}

export const Navbar = forwardRef<HTMLElement, Props>(({ search }, ref) => {
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

			{!!search && (
				<Search
					searchElementRef={search.searchElementRef}
					searchString={search.searchString}
					setSearchString={search.setSearchString}
				/>
			)}

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