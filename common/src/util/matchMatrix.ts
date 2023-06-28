import { chunk } from "lodash";

export type BoolItem = (boolean | (1 | 0));

export function matchMatrix(bools: boolean[], matrixTable: BoolItem[]): boolean {
	const columnHeight: number = bools.length;

	/**
	 * n rows * (n + 1) columns * 2 values
	 *
	 * +1 because last column is for the outcome
	 */
	const rowWidth = columnHeight + 1;
	const expectedMatrixTableSize = columnHeight * rowWidth * 2;

	const actualMatrixTableSize = matrixTable.length;

	if (expectedMatrixTableSize !== actualMatrixTableSize) {
		const msg = `matrix table wrong size! n=${columnHeight}, expected ${expectedMatrixTableSize}, got ${actualMatrixTableSize}.`;
		throw new Error(msg);
	}

	const rows: BoolItem[][] = chunk(matrixTable as boolean[] /** TODO TS */, rowWidth);

	for (const row of rows) {
		let success: boolean = true;

		let i;
		for (i = 0; i < row.length - 1 /** -1 because last item is result */; i++) {
			if (bools[i] !== row[i]) {
				success = false;
				break;
			}
		}

		if (success) {
			return !!row[i];
		}
	}

	throw new Error(`checked whole matrix table, did not find a match - impossible.`);
}
