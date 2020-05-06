import React, { useState, ChangeEvent, useEffect } from "react";

import "./AutoCompleteInput.scss";
// import { fuzzyMatchV2 } from "@turbo-schedule/common";

export interface IAutocompleInputProps<T = any> {
	autoCompletionsArray: Array<T>;
	handleAutoCompletionSelection: (autoCompletion: string) => any;
	autoFocus?: boolean;
}
const splitStr = (str: string): string[] => str?.trim?.().toLowerCase().split(" ") || [];

const getMatchingAutoCompletions = (autoCompletionsArray: Array<any> = [], searchString: string): Array<any> => {
	if (!searchString.trim()) {
		console.log("empty str");
		return autoCompletionsArray;
	}

	const searchStringSplit: string[] = splitStr(searchString);
	// console.log("searchStringSplit", searchStringSplit, "requiredMatchCount", requiredMatchCount);

	const filterAutoCompletion = (autoCompletion: string): boolean => {
		// console.log("autoCompletion", autoCompletion);
		const autoCompletionsSplit: string[] = splitStr(autoCompletion);

		let howManyMatched = 0;

		const foundMatches: boolean[] = new Array(searchStringSplit.length).fill(0);
		const foundMatchers: boolean[] = new Array(autoCompletionsSplit.length).fill(0);

		// for (const needsToBeMatched of searchStringSplit) {
		// 	for (const matcher of autoCompletionsSplit) {
		for (let i = 0; i < searchStringSplit.length; i++) {
			/** optimization. You still need to check this in the inner loop */
			if (foundMatches[i]) {
				continue;
			}

			for (let j = 0; j < autoCompletionsSplit.length; j++) {
				if (foundMatches[i] || foundMatchers[j]) {
					continue;
				}

				const needsToBeMatched = searchStringSplit[i];
				const matcher = autoCompletionsSplit[j];

				const match = matcher.match(needsToBeMatched);
				// const match = fuzzyMatchV2(needsToBeMatched, matcher, { threshold: 0.2 });

				if (match) {
					foundMatches[i] = true;
					foundMatchers[j] = true;

					howManyMatched++;

					const requiredMatchCount: number = searchStringSplit.length;

					const cond = howManyMatched >= requiredMatchCount;

					// console.log("cond", cond);

					if (cond === true) {
						console.log(
							howManyMatched,
							requiredMatchCount,
							cond,
							searchStringSplit,
							autoCompletionsSplit,
							match
						);
						return true;
					}

					/**
					 * TODO - delete the current `matcher` & `needsToBeMatched`
					 */
				}
			}
		}

		return false;

		// if (
		// 	searchStringSplit.every((ss) => {
		// 		// for (let i = 0; i < autoCompletionsSplit.length; i++) {
		// 		// 	if (ss.match(autoCompletionsArray[i])) return true;
		// 		// }
		// 		// return false;
		// 	})
		// ) {
		// 	return true;
		// }
		// return false;
	};

	return autoCompletionsArray.filter(({ text }) => filterAutoCompletion(text));
};
// ({ text }: { text: string }) => !!text.toLowerCase().match(searchString.toLowerCase())

/** TODO - more advanced matching l8r */

// ({ text }: { text: string }): boolean => {
// 	let matched: boolean = true;

// 	text
// 		.toLowerCase()
// 		.split(" ")
// 		.forEach((partOfText: string) => {
// 			let innerMatched: boolean = true;

// 			searchString.split(" ").forEach((partOfSearchString: string) => {
// 				if (!partOfText.match(partOfSearchString.toLowerCase())) {
// 					innerMatched = false;
// 				}
// 			});

// 			if (!innerMatched) {
// 				matched = false;
// 			}
// 		});

// 	return matched;
// }

const AutoCompleteInput = ({
	autoCompletionsArray = [],
	handleAutoCompletionSelection,
	autoFocus = false,
}: IAutocompleInputProps) => {
	const [searchString, setSearchString] = useState("");

	const [isSearching, setIsSearching] = useState<boolean>(() => true);

	const [matchingAutoCompletions, setMatchingAutoCompletions] = useState<any[]>(() =>
		getMatchingAutoCompletions(autoCompletionsArray, searchString)
	);
	// let matchingAutoCompletions: Array<any> = getMatchingAutoCompletions(autoCompletionsArray, searchString);

	/** initial */
	// useEffect(() => {
	// 	console.log("initial match compl");
	// 	setMatchingAutoCompletions(getMatchingAutoCompletions(autoCompletionsArray, searchString));
	// }, []);

	useEffect(() => {
		setIsSearching(true);
		console.log("BEGIN SEARCHING");
		const ret = getMatchingAutoCompletions(autoCompletionsArray, searchString);
		console.log("END SEARCHING");
		setMatchingAutoCompletions(ret);
		setIsSearching(false);
	}, [autoCompletionsArray, searchString]);

	/** --- */

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		setSearchString(value);
	};

	const handleOnKeyDown = (e: React.KeyboardEvent, autoCompletionIndex: number = 0) => {
		// /** if there's only 1 result left */

		/** select first autoCompletion */
		if (e.key === "Enter" && matchingAutoCompletions.length === 1) {
			// if (e.key === "Enter") {
			handleAutoCompletionSelection(matchingAutoCompletions[autoCompletionIndex].text);
		}
	};

	const handleOnClick = (_e: React.MouseEvent) => {
		handleAutoCompletionSelection(matchingAutoCompletions[0].text);
	};

	// let inputRef: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

	const matchingAutoCompletionList: Array<JSX.Element> = matchingAutoCompletions.map((autoCompletion, index) => (
		/** TODO `key` */
		<li key={index} style={{ marginBottom: "0.25em" }}>
			<button
				onClick={(_e) => handleAutoCompletionSelection(autoCompletion.text)}
				onKeyDown={(e) => handleOnKeyDown(e, index)}
				style={{
					/** reset */
					background: "none",
					border: "none",

					width: "75%",
					margin: "auto",
					padding: "8px 16px",
					cursor: "pointer",
				}}
			>
				<span
					style={{
						borderBottom:
							index === 0 && matchingAutoCompletions.length === 1 ? "1px solid dodgerBlue" : "none",
					}}
				>
					{autoCompletion.text}
				</span>
			</button>
		</li>
	));

	return (
		<div onKeyDown={(e) => handleOnKeyDown(e)}>
			<input
				type="text"
				value={searchString}
				onChange={(e) => handleInputChange(e)}
				style={{ padding: "8px 16px" }}
				// ref={inputRef}
				autoFocus={!!autoFocus}
			/>

			{isSearching && <div style={{ width: "50px", height: "50px", color: "red" }}>...</div>}

			<ul style={{ marginTop: "1em" }}>{matchingAutoCompletionList}</ul>

			{/*
				Make the user aware of the `Enter` click possability.
				They shall notice.
			*/}
			{matchingAutoCompletions.length === 1 && (
				<div className="enter" tabIndex={0} onClick={(e) => handleOnClick(e)}>
					<span style={{ color: "dodgerBlue" }}>{"<"}</span>
					<span>Enter</span>
					<span style={{ color: "dodgerBlue" }}>{">"}</span>
				</div>
			)}
		</div>
	);
};

export default AutoCompleteInput;
