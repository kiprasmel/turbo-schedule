import { useMemo } from "react";
import { deburr } from "lodash";
import fuzzysort from "fuzzysort";

import { Participant } from "@turbo-schedule/common";

import { TextPreparedForSearching } from "../../../hooks/useFetchers";

import { GroupedParticipants, ParticipantMix, parseParticipantMixIntoGroups } from "./participant-mix";

export type GroupedParticipantsPreparedForSearching = {
	[key in keyof GroupedParticipants]: GroupedParticipantReadyForSearchItem[];
}

export type GroupedParticipantReadyForSearchItem = {
	// label: ParticipantLabel;
	text: Participant["text"];
} & TextPreparedForSearching;

export function useSearchableParticipantGroups(participants: ParticipantMix, searchString: string | undefined): GroupedParticipants {
	const parsed: GroupedParticipants = useMemo(
		() => parseParticipantMixIntoGroups(participants),
		[participants]
	);

	const preparedForSearch: GroupedParticipantsPreparedForSearching = useMemo<GroupedParticipantsPreparedForSearching>(
		() =>
			Object.entries(parsed).reduce(
				(acc, [label, texts]) => {
					acc[label] = texts.map((text) => ({
						// label: label as ParticipantLabel,
						text,
						textPrepared: fuzzysort.prepare(simplifyStrForSearching(text)),
					}));

					return acc;
				},
				{} as GroupedParticipantsPreparedForSearching
			),
		[parsed]
	);

	const filtered: GroupedParticipants = useMemo(() => {
			if (!searchString || !searchString.trim()) {
				return parsed;
			}

			const searchStringSimplified: string = simplifyStrForSearching(searchString);

			return Object.entries(preparedForSearch).reduce(
				(acc, [label, items]) => {
					const matchingParticipants: Fuzzysort.KeyResults<GroupedParticipantReadyForSearchItem> = fuzzysort.go(
						searchStringSimplified,
						items,
						{
							key: "textPrepared",
						}
					);

					const matchingTexts: string[] = matchingParticipants.map(p => p.obj.text);

					acc[label] = matchingTexts;

					return acc;
				},
				{} as GroupedParticipants
			)
		},
		[parsed, preparedForSearch, searchString]
	)

	return filtered;
}

export const simplifyStrForSearching = (str: string): string => deburr(str.toLowerCase());
