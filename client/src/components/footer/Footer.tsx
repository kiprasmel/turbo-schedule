import React, { FC } from "react";
import { css, cx } from "emotion";

import MailingListJoiner from "./MailingListJoiner";
import { BuildMetaInfo } from "./BuildMetaInfo";
import { MadeBy } from "./MadeBy";

export type FooterProps = {
	enableMailingListJoiner?: boolean
	enableMadeBy?: boolean
	disableBuildMetaInfo?: boolean

	className?: string;
}

const Footer: FC<FooterProps> = ({
	enableMailingListJoiner = false,
	enableMadeBy = false,
	disableBuildMetaInfo = false,
	className = "",
}) => (
	<footer className={cx(
		css`
		margin-top: 4rem;
		margin-bottom: 0.5rem;
	`, className)}>
		{!enableMailingListJoiner ? null : <MailingListJoiner />}
		{!enableMadeBy ? null :
			<div className={css`margin-bottom: 2.5rem; `}>
				<MadeBy />
			</div>
		}
		{disableBuildMetaInfo ? null : <BuildMetaInfo />}
	</footer>
);

export default Footer;
