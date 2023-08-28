/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

import React, { FC, forwardRef } from "react";
import { Link } from "react-router-dom";
import { css } from "emotion";

import { SearchProps, Search } from "./Search";
import { LangSelect } from "./LangSelect";
import { useTranslation } from "../../i18n/useTranslation";
import { useSelectedSchool } from "../../hooks/useSelectedSchool";
// eslint-disable-next-line import/no-cycle
import { NavbarMobile } from "./NavbarMobile";

import { StickyInfoOrWarningAboutFreshOrOutdatedData } from "./StickyInfoOrWarningAboutFreshOrOutdatedData";

interface Props {
	search?: SearchProps;
	disableWarningAboutOutdatedData?: boolean;
}

export const Navbar = forwardRef<HTMLElement, Props>(function Navbar(props, ref) {
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

const NavbarDesktop = forwardRef<
	HTMLElement,
	{
		SearchElement?: JSX.Element; //
		disableWarningAboutOutdatedData?: boolean;
	}
>(function NavbarDesktop(props, ref) {
	const { SearchElement } = props;

	const t = useTranslation();

	return (
		<>
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
					<NavbarLinksOne />

					<NavbarLinksTwo
						className={css`
							margin-left: auto;
						`}
					/>

					<li>
						<LangSelect />
					</li>
				</ul>
			</nav>

			{props.disableWarningAboutOutdatedData ? null : <StickyInfoOrWarningAboutFreshOrOutdatedData />}
		</>
	);
});

/** left / top */
export const NavbarLinksOne: FC<React.HTMLProps<HTMLLIElement>> = (firstElementProps) => {
	const t = useTranslation();
	const school = useSelectedSchool()

	const scheduleLink = !school ? "/" : "/" + school
	const commonAvailLink = !school
		? "/" /** global /avail is not a concept yet */
		// ? "/kpg/avail" // TODO MULTI_SCHOOL
		: "/" + school + "/avail"

	return (
		<>
			<li {...firstElementProps}>
				{/* TODO SCHOOL_LIST */}
				<Link to={scheduleLink}>{t("Schedule")}</Link>
			</li>
			<li>
				<Link to={commonAvailLink}>
					<div>
						<span
							className={css`
								display: inline-flex;
								flex-direction: column;

								position: relative;
							`}
						>
							<>
								<span
									className={css`
										display: inline-block;
										width: auto;
										margin: auto;
									`}
								>
									{t("Common")}
								</span>
								<span
									className={css`
										text-transform: lowercase;
									`}
								>
									{t("Availability")}
								</span>
							</>
						</span>
					</div>
				</Link>
			</li>
			{/* <li>
				<Link to="/archive">
					<span
						className={css`
							display: inline-flex;
							flex-direction: column;

							position: relative;
						`}
					>
						<span>
							Archyvai
						</span>
						<BadgeBeta gapWidth={-8} />
					</span>
				</Link>
			</li> */}
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
		</>
	);
};

/** right / bottom */
export const NavbarLinksTwo: FC<React.HTMLProps<HTMLLIElement>> = (firstElementProps) => (
	<>
		{/* <li
					>
						<Link to="/about">{t("About")}</Link>
					</li> */}
		<li {...firstElementProps}>
			{/* eslint-disable-next-line react/jsx-no-target-blank */}
			<a href="/api/v1/docs" target="_blank" rel="noopener">
				API
			</a>
		</li>
		<li>
			{/* eslint-disable-next-line react/jsx-no-target-blank */}
			<a href="https://github.com/kiprasmel/turbo-schedule" target="_blank" rel="noopener">
				GitHub
			</a>
		</li>
	</>
);
