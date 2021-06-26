import React, { FC, useState, useCallback, useEffect } from "react";
import { cx, css } from "emotion";

// export interface CheckboxProps<T = any> extends React.HTMLAttributes<T> {
export interface CheckboxProps {
	handleClick?: (isSelected: boolean) => void;
	/**
	 * a binding to the internal state via useEffect.
	 *
	 * you should use this if you want to control the state value externally,
	 * e.g. when you have a lot of checkboxes and want to toggle them all
	 * with a single button.
	 *
	 * note - this will only do anything once the value changes,
	 * meaning it will not lock the value to the provided one;
	 * it will merely update the current value, while still allowing
	 * the user to change it.
	 */
	isSelectedStateOverride?: boolean;
	left?: JSX.Element;
	right?: JSX.Element;
	labelStyles?: React.HTMLAttributes<HTMLLabelElement>["className"];
	/**
	 * shorthand to quickly apply `inline-flex`
	 */
	flex?: boolean;
	checkboxStyles?: React.HTMLAttributes<HTMLInputElement>["className"];
	spanStyles?: React.HTMLAttributes<HTMLSpanElement>["className"];
}

export const Checkbox: FC<CheckboxProps> = ({
	children, //
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	handleClick = (): void => {},
	isSelectedStateOverride = undefined,
	left,
	right,
	labelStyles,
	flex,
	checkboxStyles,
	spanStyles,
	...rest
}) => {
	const [isSelected, _setIsSelected] = useState<boolean>(false);

	const handleIsSelected = useCallback(
		(newIsSelected: boolean) => {
			if (newIsSelected !== isSelected) {
				_setIsSelected(newIsSelected);
				handleClick(newIsSelected);
			}
		},
		[handleClick, isSelected]
	);

	useEffect(() => {
		if (isSelectedStateOverride !== undefined) {
			/**
			 * update only the local state and **do not** call the `handleClick` handler,
			 * because if this effect happens, it is because the higher up state
			 * has already updated.
			 *
			 * if we do call the `handleClick` here, we go into endless rendering
			 * and crash the app.
			 *
			 */
			_setIsSelected(isSelectedStateOverride);
		}
	}, [isSelectedStateOverride]);

	return (
		// eslint-disable-next-line jsx-a11y/label-has-associated-control
		<label
			className={cx(
				css``,
				{
					[css`
						display: inline-flex;
						flex-direction: row;
					`]: flex,
				},
				labelStyles
			)}
		>
			{left}

			<input
				type="checkbox"
				checked={isSelected}
				onChange={(e) => handleIsSelected(e.target.checked)}
				className={cx(css``, checkboxStyles)}
			/>

			<span
				{...rest}
				className={cx(
					css`
						user-select: none; /* disable text selection when clicking to toggle the checkbox */
					`,
					spanStyles
				)}
			>
				{children}
			</span>

			{right}
		</label>
	);
};
