import React, { FC } from "react";
import { css } from "emotion";

import MailingListJoiner from "./MailingListJoiner";
import { BuildMetaInfo } from "./BuildMetaInfo";
import { MadeBy } from "./MadeBy";

export type FooterProps = {
	enableMailingListJoiner?: boolean
	enableMadeBy?: boolean
	disableBuildMetaInfo?: boolean
}

const Footer: FC<FooterProps> = ({
	enableMailingListJoiner = false,
	enableMadeBy = false,
	disableBuildMetaInfo = false,
}) => (
	<footer className={css`
		margin-top: 4rem;
		margin-bottom: 0.5rem;
	`}>
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
