import { useMemo } from "react";
import { deburr } from "lodash";
import fuzzysort from "fuzzysort";

import { Participant, remapEntries } from "@turbo-schedule/common";
import { ParticipantLabelToTextToSnapshotObj } from "@turbo-schedule/database";

import { TextPreparedForSearching } from "../../../hooks/useFetchers";

import { GroupedParticipants, ParticipantMix, parseParticipantMixIntoGroups } from "./participant-mix";

export type GroupedParticipantsPreparedForSearching = {
	[key in keyof GroupedParticipants]: GroupedParticipantReadyForSearchItem[];
}

export type GroupedParticipantReadyForSearchItem = {
	// label: ParticipantLabel;
	text: Participant["text"];
} & TextPreparedForSearching;

export function useSearchableParticipantGroups(participants: ParticipantMix, searchString: string | undefined): ParticipantLabelToTextToSnapshotObj {
	const parsed: ParticipantLabelToTextToSnapshotObj = useMemo(
		() => parseParticipantMixIntoGroups(participants),
		[participants]
	);

	const parsedFiltered: ParticipantLabelToTextToSnapshotObj = !searchString
		? parsed
		: remapEntries(parsed, ([label, texts2SnapshotsObj]) => [
			label,
			remapEntries(texts2SnapshotsObj, ([text, snapshots]) =>
				fuzzysort.single(searchString, text) !== null
					? [text, snapshots]
					: null
			)]
		);

	return parsedFiltered;
}

export const simplifyStrForSearching = (str: string): string => deburr(str.toLowerCase());
