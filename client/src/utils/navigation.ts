import { history } from "./history"

export function navigateToSchool(id: string): void {
	history.push(`/${id}`)
}
