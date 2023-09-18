import React, { useState } from "react";
import { css } from "emotion";

import { useFetchParticipants } from "../../hooks/useFetchers";
import { history } from "../../utils/history";
import { ParticipantListList } from "../studentSchedule/ParticipantList";
import { FancyStickyBackgroundForSearch, Search } from "../navbar/Search";
import { Navbar } from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Archive } from "../../pages/archive/Archive";

/** TODO FIXME WWidth - this bad boy ain't even re-sizing */
const Landing = () => {
	const [searchString, setSearchString] = useState<string>("");

	const [participants] = useFetchParticipants([], []);

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

					<ParticipantListList participants={participants} searchString={searchString} />

					<Archive searchString={searchString} />
				</div>
			</div>

			<Footer enableMailingListJoiner />
		</>
	);
};

export default Landing;
