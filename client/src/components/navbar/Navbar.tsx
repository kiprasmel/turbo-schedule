/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

import React, { FC, forwardRef } from "react";
import { Link } from "react-router-dom";
import { css } from "emotion";

import { SearchProps, Search } from "./Search";
import { LangSelect } from "./LangSelect";
import { useTranslation } from "../../i18n/useTranslation";
// eslint-disable-next-line import/no-cycle
import { NavbarMobile } from "./NavbarMobile";

interface Props {
	search?: SearchProps;
}

export const Navbar = forwardRef<HTMLElement, Props>((props, ref) => {
	const isDesktop = window.innerWidth >= 1024; /** TODO FIXME WWidth */

	const { search } = props;

	const SearchElement = !search ? (
		undefined
	) : (
		<Search
			searchElementRef={search.searchElementRef}
			searchString={search.searchString}
			setSearchString={search.setSearchString}
		/>
	);

	const NavbarElement = isDesktop ? (
		<NavbarDesktop {...props} SearchElement={SearchElement} ref={ref} />
	) : (
		<NavbarMobile {...props} SearchElement={SearchElement} ref={ref} />
	);

	/** TODO individual `nav` elements instead of some smart wrapper lmao */
	return NavbarElement;
});

const NavbarDesktop = forwardRef<HTMLElement, { SearchElement?: JSX.Element }>((props, ref) => {
	const { SearchElement } = props;

	const t = useTranslation();

	return (
		<nav
			ref={ref}
			className={css`
				width: 100%;

				max-height: 6rem;
				height: 6rem;
				font-size: 1.25em;

				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: end;

				padding-left: 2em;
				padding-right: 2em;

				& > * + * {
					margin-left: 2em;
				}
			`}
		>
			<h1
				className={css`
					display: inline-block;
				`}
			>
				<Link to="/">{t("Turbo Schedule")}</Link>
				{/* <Link to="/">{window.innerWidth >= 1024 ? t("Turbo Schedule") : <Logo />}</Link> */}
			</h1>

			{SearchElement}

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
				<NavbarLinks />
				<li>
					<LangSelect />
				</li>
			</ul>
		</nav>
	);
});

export const NavbarLinks: FC<{}> = () => (
	<>
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
			{/* eslint-disable-next-line react/jsx-no-target-blank */}
			<a href="https://ts.kipras.org/api" target="_blank" rel="noopener">
				API
			</a>
		</li>
		<li>
			{/* eslint-disable-next-line react/jsx-no-target-blank */}
			<a href="https://github.com/sarpik/turbo-schedule" target="_blank" rel="noopener">
				GitHub
			</a>
		</li>
	</>
);
