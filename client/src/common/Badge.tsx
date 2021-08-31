import React, { FC } from "react";
import { cx, css } from "emotion";

type Props = {
	text: string;
	gapWidth?: number;
} & React.HTMLProps<HTMLDivElement>;

export const Badge: FC<Props> = ({ text, gapWidth = 0, ...rest }) => (
	<div
		{...rest}
		className={cx(
			css`
				position: absolute;

				top: -16px;
				right: ${-38 + gapWidth}px;

				transform: rotateZ(25deg);

				padding: 4px;
				border-radius: 4px;

				/* box-shadow: 0 0 transparent 0 0 transparent; */
				/* box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); */
				/* box-shadow: -5px 15px 20px -5px rgba(0, 0, 0, 0.1),
										0 10px 10px -5px rgba(0, 0, 0, 0.04); */

				box-shadow: -2px 18px 18px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

				font-size: 0.75em;
				font-weight: 600;
				background-color: hsl(240, 100%, 95%);
				color: hsl(240, 37%, 54%) !important;
			`,
			rest.className
		)}
	>
		{text}
	</div>
);

export const BadgeHolder: FC = ({ children }) => (
	<span
		className={css`
			display: inline-flex;
			flex-direction: column;

			position: relative;
		`}
	>
		{children}
	</span>
);

type P = Omit<Props, "text">;

export const BadgeNew: FC<P> = ({ gapWidth, ...rest }) => (
	<Badge
		text="New" //
		gapWidth={gapWidth}
		{...rest}
		className={cx(
			css`
				transform: rotateZ(8deg);
				top: clamp(-22px, -2.2vw, -30px);
				right: -20px;

				background-color: hsl(200, 100%, 80%);
				color: hsl(200, 90%, 30%) !important;
			`,
			rest.className
		)}
	/>
);

export const BadgeBeta: FC<P> = ({ gapWidth }) => (
	<Badge
		text="Beta"
		gapWidth={gapWidth}
		className={css`
			background: hsl(50, 100%, 75%) !important;
			color: hsl(50, 100%, 20%) !important;
		`}
	/>
);
