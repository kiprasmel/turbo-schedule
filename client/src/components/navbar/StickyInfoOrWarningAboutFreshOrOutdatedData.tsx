/* eslint-disable indent */

import React, { FC, Reducer, useMemo, useReducer } from "react";
import { css, cx } from "emotion";

import { getDefaultHealth, Health } from "@turbo-schedule/common";

import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useTranslation } from "../../i18n/useTranslation";
import { useFetchHealth } from "../../hooks/useFetchers";
import { useWindow } from "../../hooks/useWindow";
import { Divider } from "../studentSchedule/Divider";

export const StickyInfoOrWarningAboutFreshOrOutdatedData: FC = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [health, _setH, isLoading] = useFetchHealth(getDefaultHealth(), []);

	return isLoading ? null : <StickyInfoOrWarningAboutFreshOrOutdatedDataLoadingless health={health} />;
};

type StickyWarningAboutOutdateDataProps = {
	health: Health;
};

export function StickyInfoOrWarningAboutFreshOrOutdatedDataLoadingless({
	health,
}: StickyWarningAboutOutdateDataProps): ReturnType<FC> {
	const { desktop } = useWindow();

	const t = useTranslation();

	/**
	 * [[you'll know it when it's right]]
	 */
	enum AckLevel {
		NOT_WARNING = -2,
		NOT_INFO = -1,
		NONE = 0,
		INFO = 1,
		WARNING = 2,
	}
	const [highestLevelUserHasEverAcknowledged, setHighestLevelUserHasEverAcknowledged] = useLocalStorage<AckLevel>(
		"turbo-schedule.outdated-data.highest-level-user-has-ever-acknowledged", //
		AckLevel.NONE
	);
	const acknowledge = (): void =>
		setHighestLevelUserHasEverAcknowledged(
			highestLevelUserHasEverAcknowledged < AckLevel.NONE
				? -highestLevelUserHasEverAcknowledged // bring it back
				: isDataConsideredOutdated
				? AckLevel.WARNING
				: AckLevel.INFO
		);
	const unAcknowledge = (): void => setHighestLevelUserHasEverAcknowledged(-highestLevelUserHasEverAcknowledged);
	const currentlyNotAcknowledged = {
		warning: highestLevelUserHasEverAcknowledged < AckLevel.WARNING,
		info: highestLevelUserHasEverAcknowledged < AckLevel.INFO,
	} as const;

	/**
	 * dates, timings & stuff
	 */
	const scrapeEndDate = new Date(health.scrapeInfo.timeEndISO);

	const {
		ago,
		isDataConsideredOutdated, //
		intervalOfTimeAgo,
		nextIntervalOfTimeAgo,
	} = useTimeAgo(scrapeEndDate);

	const shouldShowCardThatNeedsAcknowledgement: boolean = isDataConsideredOutdated
		? currentlyNotAcknowledged.warning
		: currentlyNotAcknowledged.info;

	const warningContent = useMemo(
		() => (
			<>
				{[
					t(
						"outdated-data-warning: Attention! For yet unclear reasons, turbo schedule fails to update (it fails to collect data from the original schedule)."
					),
					t(
						"outdated-data-warning: Thus, it's important to know that the schedule you see here might be outdated."
					),
					t(
						"outdated-data-warning: Turbo Schedule checks every minute if the original schedule has any updates. If has, it tries to collect the whole schedule."
					),
					t(
						"outdated-data-warning: Additionally, Turbo Schedule collects data of the whole schedule every 24 hours."
					),
					t("outdated-data-warning: This collection of data is what doesn't work properly right now."),
				].map((paragraph) => (
					<p key={paragraph}>{paragraph}</p>
				))}
			</>
		),
		[t]
	);

	const infoContent = useMemo(
		() => (
			<>
				{[
					t(
						"outdated-data-warning: Turbo Schedule checks every minute if the original schedule has any updates. If has, it tries to collect the whole schedule."
					),
					t(
						"outdated-data-warning: Additionally, Turbo Schedule collects data of the whole schedule every 24 hours."
					),
				].map((paragraph) => (
					<p key={paragraph}>{paragraph}</p>
				))}
			</>
		),
		[t]
	);

	return (
		<div
			className={cx(
				css`
					position: sticky;
					width: 100%;
					padding: 0.5rem;
					background-color: ${Number.isNaN(ago)
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
						isDataConsideredOutdated
						? "hsl(45, 100%, 50%)"
						: "hsl(210, 100%, 90%)"};
				`
			)}
		>
			<div
				className={cx(
					css`
						margin: auto;

						max-width: 65ch;

						font-size: 1.5rem;
					`
				)}
			>
				{!shouldShowCardThatNeedsAcknowledgement ? null : (
					<>
						{isDataConsideredOutdated ? warningContent : infoContent}

						<button
							type="button"
							onClick={acknowledge}
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
						{!shouldShowCardThatNeedsAcknowledgement ? null : <Divider />}

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
								className={css`
									margin-bottom: 0.8rem;
								`}
							>
								{t("outdated-data-warning: Last time the data collection happened: ")}

								<span>
									{Intl.DateTimeFormat(t("intl-locale-string"), {
										year: "numeric",
										month: "long",
										day: "numeric",
										hour: "numeric",
										minute: "numeric",
										second: "numeric",
										timeZoneName: "short",
									}).format(scrapeEndDate)}
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

							{shouldShowCardThatNeedsAcknowledgement ? null : (
								<>
									<Divider />

									<button
										type="button"
										onClick={unAcknowledge}
										className={css`
											font-size: 1.7rem;
											margin-top: -0.5rem;
											margin-bottom: 0.2rem;

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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function useTimeAgo(scrapeEndDate: Date) {
	const agoMs = new Date().getTime() - scrapeEndDate.getTime();

	/**
	 * we scrape regularly at least once every 24h,
	 * and here we add an additional 1 hour for the scraping to happen
	 * before we consider the data outdated (usually it takes a few minutes max).
	 */
	const isDataConsideredOutdated = agoMs >= 1000 * 60 * 60 * (24 + 1); // TODO FIXME

	const defaultValueOfTimeAgo: "day" | "hour" = isDataConsideredOutdated ? "day" : "hour";

	const [defaultIntervalOfTimeAgo, setDefaultIntervalOfTimeAgo] = useLocalStorage<Intl.RelativeTimeFormatUnit>(
		"turbo-schedule.outdated-data.ago-interval",
		defaultValueOfTimeAgo
	);

	const [intervalOfTimeAgo, nextIntervalOfTimeAgo] = useReducer<Reducer<Intl.RelativeTimeFormatUnit, void>>(
		(curr) => {
			const cycle = {
				day: "hour",
				hour: "minute",
				minute: "day",
			};

			const ret = cycle[curr] || defaultValueOfTimeAgo;

			setDefaultIntervalOfTimeAgo(ret);
			return ret;
		},
		defaultIntervalOfTimeAgo
	);

	const toMin = (x: number): number => x / 1000 / 60;
	const toH = (x: number): number => x / 60;
	const toDay = (x: number): number => x / 24;

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

	return {
		ago,
		isDataConsideredOutdated,
		intervalOfTimeAgo,
		nextIntervalOfTimeAgo,
	} as const;
}
