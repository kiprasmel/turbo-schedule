import React, { FC } from "react";

import { Select } from "../../common/Select";
import { Navbar } from "../../components/navbar/Navbar";
import { useTranslation } from "../../i18n/useTranslation";

export type _YearsRange = `${number}-${number}`;
export type YearsRange = "latest" | _YearsRange;

const getYearsRanges = (startingFromIncl = 2017): YearsRange[] => {
	const years: YearsRange[] = [];

	for (let year = startingFromIncl; year < new Date().getFullYear(); year++) {
		const range: YearsRange = `${year}-${year + 1}`;
		years.push(range);
	}

	years.push("latest");

	years.reverse();

	return years;
};

export const Archive: FC<{}> = () => {
	const t = useTranslation();

	const yearsRanges: YearsRange[] = getYearsRanges();

	return (
		<div>
			<Navbar />

			<h1>{t("Archive")}</h1>

			<section>
				<h2>select curr year</h2>
				<Select onChange={(e: any) => console.log(e.target.value)}>
					{yearsRanges.map((year) => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
				</Select>
			</section>

			<section>
				<h2>what has changed between</h2>
				<Select defaultValue={yearsRanges[yearsRanges.length - 1]}>
					{yearsRanges.map((year) => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
				</Select>

				<span> and </span>

				<Select defaultValue={yearsRanges[0]}>
					{yearsRanges.map((year) => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
				</Select>
			</section>
		</div>
	);
};
