import React, { useState, useEffect, useMemo } from "react";
import { css } from "emotion";
import fuzzysort from "fuzzysort";
import { deburr } from "lodash";


import { PreparedLessolessP, useFetchParticipants } from "../../hooks/useFetchers";
import { history } from "../../utils/history";
import { ParticipantListList } from "../studentSchedule/ParticipantList";
import { Search } from "../navbar/Search";
import { Navbar } from "../navbar/Navbar";
import Footer from "../footer/Footer";

export const simplifyStrForSearching = (str: string): string => deburr(str.toLowerCase());

/** TODO FIXME WWidth - this bad boy ain't even re-sizing */
const Landing = () => {
	const [searchString, setSearchString] = useState<string>("");

	const [participants] = useFetchParticipants([], []);

	const participantsForSearching = useMemo<PreparedLessolessP[]>(
		() => participants.map((p): PreparedLessolessP => ({ ...p, textPrepared: fuzzysort.prepare(simplifyStrForSearching(p.text)) })),
		[participants]
	);
	const [matchingParticipants, setMatchingParticipants] = useState<PreparedLessolessP[]>([]);

	useEffect(() => {
		if (!searchString || !searchString.trim()) {
			setMatchingParticipants(participantsForSearching);
			return;
		}

		const searchStringSimplified = simplifyStrForSearching(searchString);

		const newParticipants: Fuzzysort.KeyResults<PreparedLessolessP> = fuzzysort.go(
			searchStringSimplified,
			participantsForSearching,
			{
				key: "textPrepared",
			}
		);

		const newParticipantsReady: PreparedLessolessP[] = newParticipants.map(p => p.obj);

		setMatchingParticipants(newParticipantsReady);
	}, [searchString, participantsForSearching, setMatchingParticipants]);

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

				<div
					className={css`
						margin-top: 2em;
						margin-bottom: 1em;

						& > * + * {
							margin-top: 4em;
						}
					`}
				>
					<Search searchString={searchString} setSearchString={setSearchString} onKeyDown={handleOnKeyDown} />
					<ParticipantListList participants={matchingParticipants} />
				</div>
			</div>

			<Footer enableMailingListJoiner />
		</>
	);
};

export default Landing;
