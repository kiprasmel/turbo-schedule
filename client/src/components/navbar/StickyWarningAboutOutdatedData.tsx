/* eslint-disable indent */

import React, { Reducer, useReducer } from "react";
import { css, cx } from "emotion";

import { getDefaultHealth, noop } from "@turbo-schedule/common";

import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useTranslation } from "../../i18n/useTranslation";
import { useFetchHealth } from "../../hooks/useFetchers";
import { useWindow } from "../../hooks/useWindow";
import { Divider } from "../studentSchedule/Divider";

export function StickyWarningAboutOutdatedData(): ReturnType<React.FC> {
	const [health, _setH, isLoading] = useFetchHealth(getDefaultHealth(), []);
	noop(_setH);
	const date = new Date(health.scrapeInfo.timeEndISO);

	const [hasAcknowledgedWarning, setHasAcknowledgedWarning] = useLocalStorage(
		"turbo-schedule.outdated-data.ack", //
		false
	);

	const { desktop } = useWindow();

	const t = useTranslation();

	/**
	 * BEGIN formatting
	 */
	const [defaultIntervalOfTimeAgo, setDefaultIntervalOfTimeAgo] = useLocalStorage<Intl.RelativeTimeFormatUnit>(
		"turbo-schedule.outdated-data.ago-interval",
		"day"
	);

	const [intervalOfTimeAgo, nextIntervalOfTimeAgo] = useReducer<Reducer<Intl.RelativeTimeFormatUnit, void>>(
		(curr) => {
			const cycle = {
				day: "hour",
				hour: "minute",
				minute: "day",
			};

			const ret = cycle[curr] || "day";

			setDefaultIntervalOfTimeAgo(ret);
			return ret;
		},
		defaultIntervalOfTimeAgo
	);

	const toMin = (x: number): number => x / 1000 / 60;
	const toH = (x: number): number => x / 60;
	const toDay = (x: number): number => x / 24;

	/**
	 * actually does "floor" since the comparison is reversed.
	 */
	const agoMs = new Date().getTime() - date.getTime();
	let ago: number = -agoMs;

	ago =
		intervalOfTimeAgo === "minute"
			? [ago] //
					.map(toMin)[0]
			: intervalOfTimeAgo === "hour"
			? [ago] //
					.map(toMin)
					.map(toH)[0]
			: [ago] //
					.map(toMin)
					.map(toH)
					.map(toDay)[0];

	/**
	 * -0.1 to avoid ever having an "after", rather than "before"
	 */
	ago = ago - 0.1;

	ago = Math.ceil(ago);
	/**
	 * END formatting
	 */

	return (
		<div
			className={cx(
				css`
					position: sticky;
					width: 100%;
					background-color: ${!agoMs
						? "hsl(0, 10%, 90%)"
						: /**
						 *
						 * if > 1 day passed,
						 * +1h for buffer for confirming
						 * since we collect every 24h,
						 *
						 * show orange (warning);
						 * otherwise, show light blue (info).
						 *
						 */
						agoMs >= 1000 * 60 * 60 * (24 + 1)
						? "hsl(45, 100%, 50%)"
						: "hsl(210, 100%, 90%)"};
				`,
				{
					[css`
						padding: 0.5rem;
					`]: !hasAcknowledgedWarning || !isLoading,
				}
			)}
		>
			<div
				className={cx(
					css`
						margin: auto;

						max-width: 65ch;

						font-size: 1.5rem;
					`,

					{
						[css`
							max-width: 100%;
						`]: hasAcknowledgedWarning,
					}
				)}
			>
				{hasAcknowledgedWarning ? null : (
					<>
						<p>
							{t(
								"outdated-data-warning: Attention! For yet unclear reasons, turbo schedule fails to update (it fails to collect data from the original schedule)."
							)}
						</p>
						<p>
							{t(
								"outdated-data-warning: Thus, it's important to know that the schedule you see here might be outdated."
							)}
						</p>
						<p>
							{t(
								"outdated-data-warning: turbo schedule checks every minute if the original schedule has any updates. If has, it tries to collect the whole schedule. This is exactly the part that doesn't work properly right now."
							)}
						</p>

						<button
							type="button"
							onClick={() => {
								setHasAcknowledgedWarning(true);
							}}
							className={css`
								font-size: 2rem;
								margin-bottom: 1rem;
								margin-top: -1rem;
							`}
						>
							{t("outdated-data-warning: I understand.")}
						</button>
					</>
				)}
				{!health.isDataFake && (
					<>
						{hasAcknowledgedWarning ? null : <Divider />}

						<div
							className={css`
								display: flex;

								flex-direction: column;
								${desktop} {
									flex-direction: row;
								}

								justify-content: center;
								align-items: center;

								& > * + * {
									margin-left: 1rem;
								}
							`}
						>
							<p
								title={health.scrapeInfo.timeEndISO} //
							>
								{t("outdated-data-warning: Last time the data collection succeeded: ")}
								<span>
									{Intl.DateTimeFormat(t("intl-locale-string"), {
										year: "numeric",
										month: "long",
										day: "numeric",
										hour: "numeric",
										minute: "numeric",
										second: "numeric",
										timeZoneName: "short",
									}).format(date)}
								</span>
								<br />
								<button
									type="button"
									onClick={() => nextIntervalOfTimeAgo()} //
									className={css`
										font-size: inherit;

										cursor: pointer;
										/* pointer-events: none; */
										user-select: none;
									`}
								>
									(
									{new Intl.RelativeTimeFormat(t("intl-locale-string"), {
										numeric: "always",
										style: "short",
									}).format(ago, intervalOfTimeAgo)}
									)
								</button>
							</p>
							{!hasAcknowledgedWarning ? null : (
								<>
									<Divider />

									<button
										type="button"
										onClick={() => {
											setHasAcknowledgedWarning(false);
										}}
										className={css`
											font-size: 1.7rem;
											margin-top: -1rem;

											${desktop} {
												font-size: 2rem;
												margin-top: 0;

												padding: 1rem 2rem;
											}
										`}
									>
										?
									</button>
								</>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
}
