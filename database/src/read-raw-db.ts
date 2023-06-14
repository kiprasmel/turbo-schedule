import fs from "fs-extra";

import { DbSchema } from "./config";

export function readRawDb(
	filepath: string,
	onEmpty: (opts: { filepath: string }) => void = (): void => {}
): DbSchema | null {
	const raw: string = fs.readFileSync(filepath, { encoding: "utf-8" }).trim();

	if (!raw) {
		onEmpty({ filepath });
		return null;
	}

	return JSON.parse(raw);
}
