import React, { FC } from "react"
import { css } from "emotion"

import { useTranslation } from "../../i18n/useTranslation"

export const MadeBy: FC = () => {
	const t = useTranslation()

	return <div>
		<span dangerouslySetInnerHTML={{ __html: t("Made with love by (__html)") }} />{" "}
		<a
			href="https://kipras.org"
			className={css`
				font-weight: 700;
			`}
		>
			<span
				className={css`
					background-color: hsl(240, 37%, 54%);
					color: hsl(240, 100%, 95%);

					padding: 0.5rem 1rem;

					border-radius: 2px;
				`}
			>
				Kipras
			</span>
		</a>
	</div>
}
