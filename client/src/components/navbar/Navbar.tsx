/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

import React, { forwardRef, FC } from "react";
import { Link } from "react-router-dom";
import { css } from "emotion";

import { SearchProps, Search } from "./Search";
import { LangSelect } from "./LangSelect";
import { useTranslation } from "../../i18n/useTranslation";
import { NavbarMobile } from "./NavbarMobile";

interface Props {
	search?: false | SearchProps;
}

export const Navbar = forwardRef<HTMLElement, Props>((props, ref) => {
	const isDesktop = window.innerWidth >= 1024; /** TODO FIXME WWidth */

	const { search } = props;
	const SearchElement = !search ? undefined : (
		<Search
			searchElementRef={search.searchElementRef}
			searchString={search.searchString}
			setSearchString={search.setSearchString}
		/>
	);

	const NavbarElement = isDesktop ? (
		<NavbarDesktop {...props} SearchElement={SearchElement} />
	) : (
		<NavbarMobile {...props} SearchElement={SearchElement} />
	);

	return (
		<nav
			ref={ref}
			className={css`
				/* background: red; */
				/* flex: 0 1 auto; */
				width: 100%;

				/* min-height: 3.75em;
					height: 3.75em; */
				max-height: 6rem;
				height: 6rem;
				font-size: 1.25em;

				display: flex;
				flex-direction: row;
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
			{NavbarElement}
		</nav>
	);
});

const NavbarDesktop: FC<{ SearchElement?: JSX.Element }> = (props) => {
	const { SearchElement } = props;

	const t = useTranslation();

	return (
		<>
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
		</>
	);
};

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
			<a href="https://ts.kipras.org/api" target="_blank" rel="noopener">
				API
			</a>
		</li>
		<li>
			<a href="https://github.com/sarpik/turbo-schedule" target="_blank" rel="noopener">
				GitHub
			</a>
		</li>
	</>
);
