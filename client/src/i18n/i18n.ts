// /**
//  * https://react.i18next.com/guides/quick-start
//  * https://react.i18next.com/latest/using-with-hooks
//  */

// import i18n, { Resource } from "i18next";
// import { initReactI18next } from "react-i18next";

import { Dictionary } from "./Dictionary";
import { en } from "./en";
import { lt } from "./lt";

export interface ITranslations {
	// [key: string]: ITranslation;
	en: Dictionary;
	lt: Dictionary;
}

export const translations: ITranslations = {
	en: en,
	lt: lt,
};

export type ILang = keyof ITranslations;

export const defaultLang: ILang = "lt";

export const availableLangs: Array<ILang> = Object.keys(translations).map((translation) => translation as ILang);

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
