import React, { FC } from "react";
import { css, cx } from "emotion";

import { BuildMetaInfo } from "./BuildMetaInfo";
import { MadeBy } from "./MadeBy";

export type FooterProps = {
	enableMadeBy?: boolean
	disableBuildMetaInfo?: boolean

	className?: string;
}

const Footer: FC<FooterProps> = ({
	enableMadeBy = false,
	disableBuildMetaInfo = false,
	className = "",
}) => (
	<footer className={cx(
		css`
		margin-top: 4rem;
		margin-bottom: 0.5rem;
	`, className)}>
		{!enableMadeBy ? null :
			<div className={css`margin-bottom: 2.5rem; `}>
				<MadeBy />
			</div>
		}
		{disableBuildMetaInfo ? null : <BuildMetaInfo />}
	</footer>
);

export default Footer;
