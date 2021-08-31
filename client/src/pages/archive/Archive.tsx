import React, { FC, useContext } from "react";
import { css } from "emotion";

import { Select } from "../../common/Select";
import { Navbar } from "../../components/navbar/Navbar";
import { useTranslation } from "../../i18n/useTranslation";

import { defaultYearRange, getYearRanges, YearRange } from "./getYearRanges";
import { CurrentYearCtx } from "./currentYearContext";

export const Archive: FC<{}> = () => {
	const t = useTranslation();

	const yearsRanges: YearRange[] = getYearRanges();

	const mappedOptions: JSX.Element[] = yearsRanges.map((year) => (
		<option key={year} value={year}>
			{year === "latest" ?  t("latest") : year}
		</option>
	));

	const [currentYearRange, setCurrentYearRange] = useContext(CurrentYearCtx);

	return (
		<>
			<Navbar />

			<h1>{t("Archive")}</h1>

			<section>
				<h2>{t("Select wanted year")}</h2>
				<Select defaultValue={currentYearRange ?? defaultYearRange}	onChange={(e: any) => setCurrentYearRange(e.target.value)}>
					{mappedOptions}
				</Select>
			</section>

			<section>
				<details
					className={css`
						margin-top: 2rem;
					`}
				>
					<summary
						className={css`
							cursor: pointer;
						`}
					>
						WIP
					</summary>

					<h2>what has changed between</h2>
					<Select defaultValue={yearsRanges[yearsRanges.length - 1]}>
						{mappedOptions}
					</Select>

					<span> and </span>

					<Select defaultValue={yearsRanges[0]}>
						{mappedOptions}
					</Select>
				</details>
			</section>

		</>
	);
};
