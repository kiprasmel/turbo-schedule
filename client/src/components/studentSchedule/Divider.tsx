/* eslint-disable react/prop-types */

import React, { FC } from "react";
import { css } from "emotion";

export const Divider: FC<{ height?: string }> = ({ height = "2px" }) => (
	<div
		className={css`
			height: ${height};
			background: #000;
		`}
	/>
);
