import React, { FC, useMemo } from "react"
import { css } from "emotion";

import { Navbar } from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useWindow } from "../../hooks/useWindow";
import { useTranslation } from "../../i18n/useTranslation";
import { useAutoSwitchToLastSelectedSchool } from "../../hooks/useSelectedSchool";

import { SchoolBox } from "./SchoolBox";

export type LandingProps = {

}

export const Landing: FC<LandingProps> = () => {
	const t = useTranslation()
	const { desktop, notDesktop } = useWindow()

	const schoolList = useMemo(() => SCHOOL_LIST(t as any /** TODO TS */), [t])

	useAutoSwitchToLastSelectedSchool();

	return <>
			<div
				className={css`
					min-height: 100vh;

					display: flex;
					flex-direction: column;
				`}
			>
				<Navbar disableWarningAboutOutdatedData />

				<div className={css`
					margin-top: 2rem;
					margin-bottom: 2rem;
				`}>
					<h2 className={css`
						font-weight: normal;
						font-size: 1.5rem;

						${desktop} {
							font-size: 2rem;
							text-transform: uppercase;
						}
					`}>{t("Choose your school")}</h2>

					<ul className={css`
						display: flex;
						flex-wrap: wrap;
						justify-content: space-between;

						${desktop} {
							margin: 3rem 6rem;
						}
						${notDesktop} {
							margin: auto;
							flex-direction: column;
						}


						& > * {
							${desktop} {
								margin-left: 1rem;
								margin-right: 1rem;

								margin-top: 1rem;
								margin-bottom: 1rem;
							}
							${notDesktop} {
								margin-left: auto;
								margin-right: auto;

								margin-top: 0.5rem;
								margin-bottom: 0.5rem;
							}
						}
					`}>
						{schoolList.map(school => (
							<SchoolBox key={school.id} {...school} />
						))}
					</ul>
				</div>

				{/* TODO: */}
				{/* <div>feature list</div> */}

				<Footer className={css`
					margin-top: auto;
				`} />
			</div>
	</>;
}

export const SCHOOL_ID__ADD_YOUR_SCHOOL = "add_your_school"

export const SCHOOL_LIST = (t: (x: string) => string = x => x) => [
	{
		id: "kpg",
		// fullName: t("school-full-name: kpg"),
		name: t("school-core-name: kpg"),
		type: t("school-type: kpg"),
		WIP: false,
		NEW: false,
	},
	{
		id: "kjpug",
		// fullName: t("school-full-name: kjpug"),
		name: t("school-core-name: kjpug"),
		type: t("school-type: kjpug"),
		WIP: true,
		NEW: false,
	},
	{
		id: "kdp",
		name: t("school-core-name: kdp"),
		type: t("school-type: kdp"),
		// fullName: t("school-full-name: kdp"),
		WIP: true,
		NEW: false,
	},
	{
		id: SCHOOL_ID__ADD_YOUR_SCHOOL,
		name: t("Don't see your school?"),
		type: t("Message us!"),
		WIP: false,
		NEW: true,
		forceLineSplitBetweenNameAndType: true,
	},
] as const;

export const CURRENTLY_SUPPORTED_SCHOOLS = SCHOOL_LIST().filter(x => !x.WIP && x.id !== SCHOOL_ID__ADD_YOUR_SCHOOL).map(x => x.id)
export type SchoolID = typeof CURRENTLY_SUPPORTED_SCHOOLS[number]
