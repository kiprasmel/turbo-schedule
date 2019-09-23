/**
 * TODO - service?
 */

import fs from "fs";

export const saveFile = (content: any, savingPath: string, filename: string): void => {
	try {
		/** make dir */
		fs.mkdirSync(savingPath, { recursive: true });

		/** write file */
		const savingPathAndFile: string = savingPath + "/" + filename;

		fs.writeFileSync(savingPathAndFile, content);
	} catch (error) {
		console.error("\nError! Failed to save today's content", error);
	}
};

export const fileIsAlreadySaved = (savingPathAndFile: string): boolean => {
	const fileAlreadyExists: boolean = fs.existsSync(savingPathAndFile);

	return fileAlreadyExists;
};

export const getSavedFile = (savingPathAndFile: string): string => {
	if (!fs.existsSync(savingPathAndFile)) {
		throw new Error(
			"Error! `getSavedFile` -> `savingPathAndFile` does NOT exist! \nWas provided as" + savingPathAndFile
		);
	}

	const savedFile: string = fs.readFileSync(savingPathAndFile, { encoding: "utf-8" });

	return savedFile;
};
