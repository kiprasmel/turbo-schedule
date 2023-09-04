#!/usr/bin/env ts-node-dev

import fs from "fs"

import { Lesson, Participant, ParticipantInLesson, ParticipantKindsInLesson, remapEntries } from "@turbo-schedule/common";

import { databaseFileName } from "../config";
import { databaseSnapshotNameToFullFilepath } from "../paths";
import { readRawDb } from "../read-raw-db";


export type StudentsXLessonsBellCurve = {
	[group in (typeof ParticipantKindsInLesson)[number]]: {
		[key in ParticipantInLesson["text"]]: Participant["text"][]
	}
}
export function lessonCountsToStudentCounts(lessonsPerStudentKind: LessonsPerStudentKind): StudentsXLessonsBellCurve {
	const studentKindToLessonCountToStudentsMap = Object.fromEntries(ParticipantKindsInLesson.map((x) => [x, new Map()] as const))

	for (const participantKind of ParticipantKindsInLesson) {
		const studentsToLessonCount = lessonsPerStudentKind[participantKind]

		/** lessonCountToStudents */
		const map = studentKindToLessonCountToStudentsMap[participantKind]

		for (const [student, lessonCount] of Object.entries(studentsToLessonCount)) {
			if (!map.has(lessonCount)) {
				map.set(lessonCount, [])
			}

			const studentsWithCount: string[] = map.get(lessonCount)
			studentsWithCount.push(student)
			map.set(lessonCount, studentsWithCount)
		}
	}

	/**
	 * convert from maps to regular objects
	*/
	const studentKindToLessonCountToStudents = remapEntries(
		studentKindToLessonCountToStudentsMap,
		([key, val]) => [key, Object.fromEntries(val.entries())]
	) as unknown as StudentsXLessonsBellCurve /** TODO TS */

	return studentKindToLessonCountToStudents
}

export type LessonsPerStudentKind = {
	[group in (typeof ParticipantKindsInLesson)[number]]: {
		[key in ParticipantInLesson["text"]]: number
	}
}

export function lessonsPerStudentKind(lessons: Lesson[]): LessonsPerStudentKind {
	const participantKindToLessonsCountMap = Object.fromEntries(ParticipantKindsInLesson.map((x) => [x, new Map()] as const))

	for (const lesson of lessons) {
		if (lesson.isEmpty) {
			continue
		}

		for (const participantKind of ParticipantKindsInLesson) {
			for (const participant of lesson[participantKind]) {
				const map = participantKindToLessonsCountMap[participantKind]
				if (!map.has(participant)) {
					map.set(participant, 0)
				}

				const count = map.get(participant)
				map.set(participant, count + 1)
			}
		}
	}

	/**
	 * convert from maps to regular objects
	 * also sort each kind of students by their lesson count
	 */
	const lessonsPerStudentKind = remapEntries(
		participantKindToLessonsCountMap,
		([key, val]) => [key, Object.fromEntries([...val.entries()].sort((A, B) => B[1] - A[1]))]
	) as unknown as LessonsPerStudentKind /** TODO TS */

	return lessonsPerStudentKind
}

if (!module.parent) {
	const rawDb = readRawDb(databaseSnapshotNameToFullFilepath(databaseFileName))

	if (!rawDb) {
		throw new Error(`could not read latest database`)
	}

	const lessonsPerStudKind = lessonsPerStudentKind(rawDb.lessons)
	fs.writeFileSync("lessons-per-student-kind.json", JSON.stringify(lessonsPerStudKind, null, 2))

	const studentsXlessonsBellCurve = lessonCountsToStudentCounts(lessonsPerStudKind)
	fs.writeFileSync("students-x-lessons-bell-curve.json", JSON.stringify(studentsXlessonsBellCurve, null, 2))

	const studentCountsInsteadOfNames = remapEntries(studentsXlessonsBellCurve, ([key1, val1]) => [key1, remapEntries(val1, ([key2, val2]) => [key2, val2.length as any])])
	fs.writeFileSync("students-x-lessons-bell-curve.simple.json", JSON.stringify(studentCountsInsteadOfNames, null, 2))

	const remappedForChart = remapEntries(studentCountsInsteadOfNames, ([key1, val1]) => [key1, Object.entries(val1).map(([nLessons, nStudents]) => ({x: nLessons, y: nStudents})) as any])
	fs.writeFileSync("students-x-lessons-bell-curve.simple.chart.json", JSON.stringify(remappedForChart, null, 2))
}
