import React, { useEffect, useState } from "react";
import { css } from "emotion";

import { noop } from "@turbo-schedule/common";

import { useFetchParticipants } from "../../hooks/useFetchers";
import { history } from "../../utils/history";
import { ParticipantListList } from "../studentSchedule/ParticipantList";
import { FancyStickyBackgroundForSearch, Search } from "../navbar/Search";
import { Navbar } from "../navbar/Navbar";
import Footer from "../footer/Footer";
// import { Archive } from "../../pages/archive/Archive";
import { useWindow } from "../../hooks/useWindow";
import { ILang, isLang } from "i18n/i18n";
import { useLang } from "components/currentLangContext/currentLangContext";
import { isSchool } from "hooks/useSelectedSchool";

/** TODO FIXME WWidth - this bad boy ain't even re-sizing */
const SchoolLanding = () => {
	const [searchString, setSearchString] = useState<string>("");
	const { notDesktop } = useWindow()
	const [participants] = useFetchParticipants([], []);
	const { setLang } = useLang();

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

		const [_path0, path1, ...pathrest] = pathname.split("/")
		noop(_path0);
		const searchQuery = new URLSearchParams(search).toString()
		const searchQueryReady = (!searchQuery ? "" : "?" + searchQuery)

		/**
		 * TODO: "RedirectHandler" component.
		 *
		 * currently if >1 path, will go to different component
		 * (Availability or StudentSchedulePage),
		 * so won't end up here, so lang won't be handled correctly.
		 *
		 * this is minor issue since the only use case i have for /:lang
		 * right now is linking from my resume to this project
		 * and defaulting to english, so no need for deeper paths.
		 * but ofc, should have proper solution eventually.
		 *
		 */

		 if (isLang(path1)) {
		 	 setLang(path1 as ILang);
			 const newPath = "/" + pathrest + searchQueryReady;
			 history.replace(newPath);
			 return;
		 }

		if (!isSchool(path1)) {
			const newPath = "/kpg/" + path1 + searchQueryReady
			history.replace(newPath)
			return
		}
		// eslint-disable-next-line
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
