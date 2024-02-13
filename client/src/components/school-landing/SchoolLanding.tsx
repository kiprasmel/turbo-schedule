import React, { useEffect, useState } from "react";
import { css } from "emotion";

import { useFetchParticipants } from "../../hooks/useFetchers";
import { history } from "../../utils/history";
import { ParticipantListList } from "../studentSchedule/ParticipantList";
import { FancyStickyBackgroundForSearch, Search } from "../navbar/Search";
import { Navbar } from "../navbar/Navbar";
import Footer from "../footer/Footer";
// import { Archive } from "../../pages/archive/Archive";
import { CURRENTLY_SUPPORTED_SCHOOLS, SchoolID } from "../../pages/landing/Landing";
import { useWindow } from "../../hooks/useWindow";

/** TODO FIXME WWidth - this bad boy ain't even re-sizing */
const SchoolLanding = () => {
	const [searchString, setSearchString] = useState<string>("");
	const { notDesktop } = useWindow()
	const [participants] = useFetchParticipants([], []);

	/**
	 * BACKWARDS COMPAT (pre MULTI_SCHOOL) - rewrite /avail?p=...&... to /kpg/avail?p=...&...,
	 *
	 * since now /avail is tracked as a "school" and this component gets loaded for it,
	 * instead of the Availability one.
	 *
	 * same with previous /:participant - participant is now taken as a "school" too.
	 * so, need to check if we are actually supporting the school;
	 * otherwise do the previous default - go to the participant's schedule.
	 */
	useEffect(() => {
		const { pathname, search } = history.location

		if (pathname === "/avail") {
			const searchQuery = new URLSearchParams(search).toString()
			const newPath = "/kpg/avail?" + searchQuery
			history.replace(newPath)
			return
		}

		const potentiallySchool = pathname.split("/")[1]
		const isNotSchool = !CURRENTLY_SUPPORTED_SCHOOLS.includes(potentiallySchool as SchoolID)

		if (isNotSchool) {
			const searchQuery = new URLSearchParams(search).toString()
			const newPath = "/kpg/" + potentiallySchool /** now is expected to be a participant */ + "?" + searchQuery
			history.replace(newPath)
			return
		}
	}, [])

	const matchingParticipants: any[] = [] // TODO FIXME - enable back together with `isOnlyOneMatchingParticipant`.

	/**
	 *  select first autoCompletion
	 *
	 * TODO FIXME status reports instead ((set)searchString) & handle stuff better
	 *
	 */
	const handleOnKeyDown = (e: React.KeyboardEvent) => {
		if (!(e.key === "Enter" && matchingParticipants.length === 1)) {
			return;
		}

		const match: string = matchingParticipants[0].text;
		history.push(`/${match}`);
	};

	return (
		<>
			<div
				className={css`
					min-height: 100vh;
				`}
			>
				<Navbar disableWarningAboutOutdatedData />

				{/* TODO: extract into "reusables" `CompleteParticipantSearch` */}
				<div
					className={css`
						margin-top: 1em;
						margin-bottom: 1em;

						& > * + * {
							margin-top: 2.7em;
						}

						margin-bottom: 3rem;

						position: relative;
					`}
				>
					<FancyStickyBackgroundForSearch>
						<Search searchString={searchString} setSearchString={setSearchString} onKeyDown={handleOnKeyDown} />
					</FancyStickyBackgroundForSearch>

					<ParticipantListList participants={participants} searchString={searchString} className={css`
						${notDesktop} {
							margin-top: -1rem;
						}
					`} />

					{/* <Archive searchString={searchString} /> */}
				</div>
			</div>

			<Footer />
		</>
	);
};

export default SchoolLanding;
