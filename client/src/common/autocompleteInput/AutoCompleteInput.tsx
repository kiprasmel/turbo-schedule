import React, { useState, ChangeEvent } from "react";

import "./AutoCompleteInput.scss";

export interface IAutocompleInputProps<T = any> {
	autoCompletionsArray: Array<T>;
	handleAutoCompletionSelection: (autoCompletion: string) => any;
	autoFocus?: boolean;
}

const getMatchingAutoCompletions = (autoCompletionsArray: Array<any> = [], searchString: string): Array<any> =>
	autoCompletionsArray.filter(
		({ text }: { text: string }) => !!text.toLowerCase().match(searchString.toLowerCase())

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
	);

const AutoCompleteInput = ({
	autoCompletionsArray = [],
	handleAutoCompletionSelection,
	autoFocus = false,
}: IAutocompleInputProps) => {
	const [searchString, setSearchString] = useState("");

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

	const matchingAutoCompletions: Array<any> = getMatchingAutoCompletions(autoCompletionsArray, searchString);

	const matchingAutoCompletionList: Array<JSX.Element> = matchingAutoCompletions.map((autoCompletion, index) => (
		/** TODO `key` */
		<li key={index} style={{ marginBottom: "0.25em" }}>
			<button
				type="button"
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
