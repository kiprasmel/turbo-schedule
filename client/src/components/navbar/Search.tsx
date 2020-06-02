/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import React, { FC, useRef } from "react";
import { css } from "emotion";

export interface SearchProps {
	searchElementRef?: React.RefObject<HTMLInputElement>;

	/** TODO FIXME status reporting instead */
	searchString: string;
	setSearchString: React.Dispatch<React.SetStateAction<string>>;

	onKeyDown?: (e: React.KeyboardEvent) => void;
}

export const Search: FC<SearchProps> = ({ searchString, setSearchString, onKeyDown }) => {
	const ref = useRef<HTMLInputElement>(null);

	// useEffect(() => {
	// 	ref?.current?.focus();
	// 	ref?.current?.click();
	// }, []);

	// useLayoutEffect(() => {
	// 	ref?.current?.focus();
	// 	ref?.current?.click();
	// }, []);

	return (
		<span onKeyDown={onKeyDown}>
			<input
				type="search"
				name="search"
				autoFocus
				ref={ref}
				className={css`
					font-size: 1.5em;
					max-width: 12em;
					padding: 0.3em 0.3em;
					/* padding: 0.5em 0.5em; */

					border: 0.125em solid #000;
					border-radius: 0.5em;

					border-top-right-radius: 0;
					border-bottom-right-radius: 0;
				`}
				value={searchString}
				onChange={(e) => setSearchString(e.target.value)}
				onFocus={(e) => e.target.select()}
			/>
			<button
				type="button"
				onClick={(_e) => {
					setSearchString("");
					ref.current?.focus();
					// searchElementRef?.current?.focus();
				}}
				className={css`
					/** same as input's - just different borders */
					font-size: 1.5em;
					max-width: 12em;
					/* padding: 0.3em 0.3em; */
					padding: 0.3em 0.6em;
					/* padding: 0.5em 0.5em; */

					border: 0.125em solid #000;
					border-radius: 0.5em;

					border-top-left-radius: 0;
					border-bottom-left-radius: 0;

					border-left: none; /** avoid double border */

					outline: none;
					cursor: pointer;
				`}
			>
				X
			</button>
		</span>
	);
};
