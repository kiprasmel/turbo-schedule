import React, { FC, useState } from "react";

// export interface IGeneralContextValue<T = unknown> {
export type IGeneralContextValue<T> = [
	currentValue: T,
	setNewValue: (newValue: T) => T,
	availableValues: readonly T[],
];

export function createGeneralContext<T>(
	getAvailableValues: () => T[] = () => [], //
	defaultValue: T
) {
	let defaultContextValue: IGeneralContextValue<T> = [
		defaultValue,
		(newValue = defaultValue) => {
			defaultContextValue[0] = newValue;

			/**
			 * update self to trigger a re-render
			 * (comparisons are made using references)
			 */
			defaultContextValue[0] = newValue;

			return defaultContextValue[0]
		},
		getAvailableValues()
	]

	const GeneralContext: IGeneralContext<T> = React.createContext<IGeneralContextValue<T>>(defaultContextValue);

	const Provider: FC = ({ children }) => {
		const [contextValue, setContextValue] = useState<IGeneralContextValue<T>>([
			/** TODO FIXME ? */
			defaultValue,
			(newValue: T = defaultValue): T => {
				/**
				 * update self to trigger a re-render
				 * (
				 * comparisons are made using references -
				 * see https://reactjs.org/docs/context.html#contextprovider
				 * )
				 */
				setContextValue((_currContextValue) => {
					let temp: IGeneralContextValue<T> = [...contextValue] // TODO FIXME - _currContextValue ?
					temp[0] = newValue;
					return temp;
				});

				/** TODO FIXME ? */
				// setNewValue(newValue);

				return contextValue[0]
			},
			getAvailableValues(),
		]);

		return <GeneralContext.Provider value={contextValue}>{children}</GeneralContext.Provider>;
	};

	return [GeneralContext, Provider] as const;
}

export type IGeneralContext<T = unknown> = React.Context<IGeneralContextValue<T>>;
