/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import React, { FC, useRef, useLayoutEffect } from "react";
import { css } from "emotion";

export interface SearchProps {
	searchElementRef?: React.RefObject<HTMLInputElement>;

	/** TODO FIXME status reporting instead */
	searchString: string;
	setSearchString: React.Dispatch<React.SetStateAction<string>>;

	onKeyDown?: (e: React.KeyboardEvent) => void;
}

export const Search: FC<SearchProps> = ({ searchString, setSearchString, onKeyDown }) => {
	/**
	 * I just couldn't get autofocus to work properly on first load / refresh...
	 */
	const ref = useRef<HTMLInputElement>(null);

	// useEffect(() => {
	// 	ref?.current?.focus();
	// 	ref?.current?.click();
	// }, []);

	// useLayoutEffect(() => {
	// 	ref?.current?.focus();
	// 	ref?.current?.click();
	// }, []);

	useLayoutEffect(() => {
		// eslint-disable-next-line no-unused-expressions
		// ref.current?.focus();
	}, []);

	return (
		<span onKeyDown={onKeyDown}>
			<input
				type="search"
				name="search"
				// autoFocus
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

/**
 * expects parent tag with `position: relative;`
 */
export const FancyStickyBackgroundForSearch: FC = ({ children }) => {
	return (
		<div
			className={css`
			position: sticky;
			top: 0;
			z-index: 1;

			padding: 1rem;
			width: fit-content;
			margin: auto;

			background: white;
			border-radius: 0.5rem;

			/* TODO: add box-shadow, but only if already scrolled, not if default */
			/*
			box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
			*/
		`}
		>
			{children}
		</div>
	)
}
