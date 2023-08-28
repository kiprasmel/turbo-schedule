import { useEffect, useState } from "react"
import { Location } from "history"

import { history } from "../utils/history"
import { useLocalStorage } from "./useLocalStorage"

export type UseSelectedSchoolOpts = {
	ifNoneThenUseLastSelected?: boolean;
}

export const useSelectedSchool = ({
	ifNoneThenUseLastSelected = true,
}: UseSelectedSchoolOpts = {}): string | null => {
	const [school, setSchool] = useState(parseSelectedSchoolFromURL())
	const [lastSelectedSchool, setLastSelectedSchool] = useLocalStorage<string>("turbo-schedule.last-selected-school", "");

	useEffect(() => {
		if (school) {
			setLastSelectedSchool(school)
		}

		history.listen((location, _action) => {
			const newSchool = parseSelectedSchoolFromURL(location)
			// console.log({school, newSchool, location});

			if (school !== newSchool) {
				setSchool(newSchool)
			}

			if (school) {
				setLastSelectedSchool(school)
			}
		})
	}, [school, setLastSelectedSchool])

	if (!school && ifNoneThenUseLastSelected) {
		return lastSelectedSchool
	}

	return school
}

export const parseSelectedSchoolFromURL = (location: Location = history.location): string | null => {
	const paths: string[] = location.pathname.split("/").slice(1)
	if (paths.length === 0) {
		return null
	}

	return paths[0]
}
