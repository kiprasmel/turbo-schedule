import React, { FC } from "react"
import { css, cx } from "emotion";

import { ReactComponent as ArrowRight } from "../../assets/arrow-right.svg";
import { useWindow } from "../../hooks/useWindow";
import { BadgeNew, BadgeWIP } from "../../common/Badge";
import { navigateToSchool } from "../../utils/navigation";
import { useTranslation } from "../../i18n/useTranslation";

import { SCHOOL_ID__ADD_YOUR_SCHOOL } from "./Landing";

export type SchoolBoxProps = {
	id: string;
	name: string;
	type: string;
	WIP: boolean;
	NEW: boolean;

	forceLineSplitBetweenNameAndType?: boolean;
}

export const SchoolBox: FC<SchoolBoxProps> = ({ id, name, type, WIP, NEW, forceLineSplitBetweenNameAndType = false }) => {
	const t = useTranslation()
	const { isDesktop, desktop, notDesktop } = useWindow()

	const title: string | undefined = !WIP ? undefined : t("Not available yet...")

	return <>
		<div
			title={title}
			className={cx(
				css`
					${desktop} {
						// width: 25vw;
						width: 31%;
						min-height: 20vh;
					}

					${notDesktop} {
						width: 80vw;
						// min-height: 20vh;
					}

					border: 1px solid gray;
					border-radius: 6px;

					/* for the WIP Badge if WIP */
					position: relative;
				`,
				{
					[WIPSchoolCss]: WIP,
					// [StripedPattern]: WIP,
				})
			}
		>
			{!WIP ? null : <BadgeWIP gapWidth={24} className={css`
				${notDesktop} {
					top: -10px;
				}
			`} />}
			{!NEW ? null : <BadgeNew gapWidth={24} className={css`
				${notDesktop} {
					top: -10px;
				}
			`} />}

			<div
				className={cx(
					css`
						padding: 0 1rem;
						width: 100%;
						height: 100%;

						display: flex;
						flex-direction: column;
						justify-content: space-between;
					`,
					{
						[StripedPattern]: WIP,
					})
				}
			>
				<h2>
					<span>{name}</span>
					{isDesktop || forceLineSplitBetweenNameAndType ? <br /> : " "}
					<span>{type}</span>
				</h2>

				{id !== SCHOOL_ID__ADD_YOUR_SCHOOL
					? (<button
							type="button"
							onClick={() => WIP ? void 0 : navigateToSchool(id)}
							className={ButtonStyles}
						>
							<span className={css`
								text-transform: uppercase;
								text-align: left;
							`}>
								{id}
							</span>

							<ButtonArrow />
					</button>
					) : (
						<a
							href={`mailto:kipras@kipras.org?subject=${t("i-want-turbo-schedule--mailto-subject")}&body=${t("i-want-turbo-schedule--mailto-body")}`}
							className={ButtonStyles}
						>
							<small className={css`
								${desktop} {
									text-transform: uppercase;
								}
							`}>
								{t("I want Turbo Schedule!")}
							</small>

							<ButtonArrow />
						</a>
					)
				}
			</div>
		</div>
	</>;
}

// https://www.magicpattern.design/tools/css-backgrounds
export const StripedPattern = css`
	background-color: #e5e5f799;
	opacity: 0.6;
	// background: repeating-linear-gradient( -45deg, #444cf7, #444cf7 5px, #e5e5f7 5px, #e5e5f7 25px );
	// background: repeating-linear-gradient( -45deg,#f7a944,#f7a944 5px,white 5px,white 25px );
	background: repeating-linear-gradient( -40deg,#f7a944,#f7a944 5px,white 5px,white 15px )
`

// export const WIPSchoolCss = cx(
// 	StripedPattern,
// 	css`
// 		cursor: not-allowed;
// 	`,
// )

const WIPSchoolCss = css`
	cursor: not-allowed;
	& * {
		cursor: not-allowed;
	}
`

const ButtonStyles = css`
	display: flex;
	align-items: center;
	margin: auto auto 1rem auto;

	padding: 0.2rem 1rem;

	border: 1px solid black;
	border-radius: 6px;
`

const ButtonArrow = () =>
	<ArrowRight className={css`
		width: 40px;
		margin-left: 0.5rem;
	`} />
