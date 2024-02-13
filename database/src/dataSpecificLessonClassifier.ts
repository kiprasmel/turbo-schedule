#!/usr/bin/env ts-node-dev

import { Lesson } from "@turbo-schedule/common";

import { readRawDb } from "./read-raw-db"
import { databaseSnapshotNameToFullFilepath } from "./paths";

/**
 * https://developer.mozilla.org/en-US/docs/Web/CSS/named-color
 */
export const classifiedLessonConfigs = {
	math: {
		color: "blue",
		abbrev: {
			lt: "M",
			en: "M",
		},
	},
	IT: {
		color: "lightblue",
		abbrev: {
			lt: "IT",
			en: "IT",
		},
	},
	physics: {
		color: "gray",
		abbrev: {
			lt: "Fi",
			en: "Phy",
		},
	},
	biology: {
		color: "aquamarine",
		abbrev: {
			lt: "Bio",
			en: "Bio",
		},
	},
	chemistry: {
		color: "orange",
		abbrev: {
			lt: "Chem",
			en: "Chem",
		},
	},
	electronics: {
		color: "goldenrod",
		abbrev: {
			lt: "Elek",
			en: "Elec",
		},
	},
	economics: {
		color: "green", // lime
		abbrev: {
			lt: "Ekon",
			en: "Econ",
		},
	},
	robotics: {
		color: "lightsteelblue",
		abbrev: {
			lt: "Robot",
			en: "Robot"
		}
	},
	geography: {
		color: "forestgreen",
		abbrev: {
			lt: "Geo",
			en: "Geo",
		},
	},
	history: {
		color: "chocolate", // peru saddlebrown sienna
		abbrev: {
			lt: "Ist",
			en: "Hist",
		},
	},
	philosophy: {
		color: "rebeccapurple", // midnightblue skyblue
		abbrev: {
			lt: "Filos",
			en: "Phil",
		}
	},
	PE: {
		color: "navy",
		abbrev: {
			lt: "FU", // KK
			en: "PE",
		},
	},
	lithuanian: {
		color: "",
		abbrev: {
			lt: "LT",
			en: "LT",
		},
	},
	english: {
		color: "",
		abbrev: {
			lt: "Angl", // EN
			en: "EN",
		},
	},
	german: {
		color: "",
		abbrev: {
			lt: "Vok",
			en: "Ger",
		},
	},
	russian: {
		color: "",
		abbrev: {
			lt: "Rusų", // RU
			en: "RU",
		},
	},
	french: {
		color: "",
		abbrev: {
			lt: "Pranc",
			en: "FR",
		},
	},
	spanish: {
		color: "",
		abbrev: {
			lt: "Ispan",
			en: "ES",
		},
	},
	art: {
		color: "",
		abbrev: {
			lt: "Dail",
			en: "Art",
		},
	},
	dance: {
		color: "",
		abbrev: {
			lt: "Šok", // Šokis
			en: "Dance",
		},
	},
	music: {
		color: "",
		abbrev: {
			lt: "Muzik",
			en: "Music",
		},
	},
	ceramics: {
		color: "",
		abbrev: {
			lt: "Keram",
			en: "Ceram",
		},
	},
	crafts: {
		color: "",
		abbrev: {
			lt: "Techn", // Darb
			en: "Craft",
		},
	},
	religion: {
		color: "",
		abbrev: {
			lt: "Tikyb",
			en: "Relig",
		},
	},
	citizenship: {
		color: "",
		abbrev: {
			lt: "Piliet",
			en: "Citiz",
		},
	},
	class_meeting: {
		color: "",
		abbrev: {
			lt: "Kl. val",
			en: "Class meet",
		},
	},
	life_skills: {
		color: "",
		abbrev: {
			lt: "Gyv įg",
			en: "Life skills",
		},
	},
	business_and_management: {
		color: "",
		abbrev: {
			lt: "Versl",
			en: "Biz",
		},
	},
	construction_and_woodwork: {
		color: "",
		abbrev: {
			lt: "Statyba",
			en: "Construction",
		},
	},

	/**
	foo: {
		color: "",
		abbrev: {
			lt: "",
			en: "",
		},
	},
	 */
}


export type LessonClassificationKind = typeof candidateMatchers[number][0]

export const candidateMatchers = [
	// id     ...matchers
	["math", "matematik", "nestandartiniai uždaviniai"], // TODO split up into sub-groups
	["IT", "informacin", "informatik"],
	["physics", "fizik"],
	["biology", "biologij", "gamta ir žmogus"], // TODO sub-groups
	["chemistry", "chemij"],
	["electronics", "elektronika"],
	["economics", "ekonomik"],
	["robotics", "robotika"],
	["geography", "geografij"],
	["history", "istorij"],
	["philosophy", "filosofij"],
	["PE", "fizinis ugdymas", "kūno k"],
	["lithuanian", "lietuvi"],
	["english", "anglų"],
	["german", "vokiečių"],
	["russian", "rusų"],
	["french", "prancūzų"],
	["spanish", "ispanų"],
	["art", "dailė"],
	["dance", "šokis"],
	["music", "muzik"],
	["ceramics", "keramika"],
	["crafts", "technologij"], // TODO avoid collission w/ IT. maybe order matters?
	["religion", "tikyba"],
	["citizenship", "pilietiškum"],
	["class_meeting", "klasės valandėlė"],
	["life_skills", "gyvenimo įgūdžiai"],
	["business_and_management", "verslas ir vadyba"],
	["construction_and_woodwork", "statyba ir medžio apdirbimas"],
] as const

/**
 * TODO MULTI_SCHOOL
 */
export const classifyLesson = (lesson: Lesson) => {
	if (lesson.isEmpty) {
		return "empty"
	}

	const candidates = []

	for (const [id, ...matchers] of candidateMatchers) {
		for (const matcher of matchers) {
			if (lesson.name.includes(matcher)) {
				candidates.push(id)
				break
			}
		}
	}

	// TODO
	return candidates.length
}

export const dataSpecificLessonClassifier = (lessons: Lesson[]) => {
	const unclassifiedLessons = new Set<Lesson["name"]>()
	// const classifiedLessons = []

	for (const lesson of lessons) {
		const classified = classifyLesson(lesson)
		if (classified) {
			// classifiedLessons.push(classified)
		} else {
			if (!unclassifiedLessons.has(lesson.name)) {
				unclassifiedLessons.add(lesson.name)
			}
		}
	}

	if (unclassifiedLessons.size) {
		const stdout = "\n" + Array.from(unclassifiedLessons.keys()).join("\n") + "\n"
		console.log(stdout)

		const msg = `${unclassifiedLessons.size} unclassified lessons.`
		throw new Error(msg)
	}

	// return classifiedLessons
}

if (!module.parent) {
	const dbSnapshot = "latest.json"
	const dbFilepath = databaseSnapshotNameToFullFilepath(dbSnapshot)

	const db = readRawDb(dbFilepath)

	if (!db) {
		throw new Error(`could not read database ${dbSnapshot} (${dbFilepath})`)
	}

	dataSpecificLessonClassifier(db.lessons)
}
