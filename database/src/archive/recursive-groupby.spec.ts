#!/usr/bin/env ts-node-dev

import assert from "assert";

import { recursiveGroupBy } from "recursive-groupby";

import { ParticipantInSnapshotItem } from "./participants-in-snapshots-raw";

export function recursiveGroupByTest() {
	const data: ParticipantInSnapshotItem[] = [
		{
			snapshot: "2019-xxx-yyy",
			snapshotYear: 2019,
			schoolYear: "2019-2020",
			label: "student",
			text: "john doe 12a"
		},
		{
			snapshot: "2019-aaa-bbb",
			snapshotYear: 2019,
			schoolYear: "2019-2020",
			label: "student",
			text: "john doe 12a"
		},
		{
			snapshot: "2019-xxx-yyy",
			snapshotYear: 2019,
			schoolYear: "2019-2020",
			label: "teacher",
			text: "chad mathone"
		},
		{
			snapshot: "2020-xxx-yyy",
			snapshotYear: 2020,
			schoolYear: "2019-2020",
			label: "student",
			text: "john doe 12a"
		}
	];

	const result = recursiveGroupBy(
		data,
		[
			"snapshotYear",
			"label",
			"text",
		],
		(leafs) => leafs.map(l => l.snapshot)
	)

	const expected = {
		"2019": {
			"student": {
				"john doe 12a": [
					"2019-xxx-yyy",
					"2019-aaa-bbb",
					// "2020-xxx-yyy", // nope, wrong snapshotYear
				]
			},
			"teacher": {
				"chad mathone": [
					"2019-xxx-yyy",
				]
			}
		},
		"2020": {
			"student": {
				"john doe 12a": [
					"2020-xxx-yyy",
				]
			},
		}
	}

	console.log(JSON.stringify({ result, expected }, null, 2));

	assert.deepStrictEqual(result, expected);
}

if (!module.parent) {
	recursiveGroupByTest();
}
