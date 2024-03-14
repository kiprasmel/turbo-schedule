// /**
//  * https://react.i18next.com/guides/quick-start
//  * https://react.i18next.com/latest/using-with-hooks
//  */

// import i18n, { Resource } from "i18next";
// import { initReactI18next } from "react-i18next";

import { Dictionary } from "./Dictionary";
import { en } from "./en";
import { lt } from "./lt";

export * from "./Dictionary";
export * from "./en";
export * from "./lt";

export interface ITranslations {
	// [key: string]: ITranslation;
	en: Dictionary;
	lt: Dictionary;
}

export const translations: ITranslations = {
	en,
	lt,
};

export type ILang = keyof ITranslations;

export const defaultLang: ILang = "lt";

export const availableLangs: Array<ILang> = Object.keys(translations).map((translation) => translation as ILang);

export const isLang = (str: string) => availableLangs.includes(str as ILang);

const localStorageIdentifier: string = "lang";

export const setLang = (newLang: ILang) => {
	localStorage.setItem(localStorageIdentifier, newLang);
};

export const getLang = (): ILang => {
	const currentLang: ILang | string | null = localStorage.getItem(localStorageIdentifier);

	/**
	 * make sure since localStorage could've been modified
	 * not by us.
	 */

	if (availableLangs.includes(currentLang as ILang)) {
		return currentLang as ILang;
	}

	return defaultLang;
};

// i18n
// 	.use(initReactI18next) // passes i18n down to react-i18next
// 	.init({
// 		resources: translations,
// 		lng: "en",

// 		keySeparator: false, // we do not use keys in form messages.welcome

// 		interpolation: {
// 			escapeValue: false, // react already safes from xss
// 		},
// 	});

// export default i18n;
