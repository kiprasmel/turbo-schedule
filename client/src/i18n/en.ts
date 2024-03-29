import { Dictionary } from "./Dictionary";

const weekdays: Array<string> = [
	"Monday", //
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

export const en: Dictionary = {
	"intl-locale-string": "en-US",
	"Turbo Schedule": "Turbo Schedule",
	Schedule: "Schedule",
	Statistics: "Statistics",
	About: "About",
	Language: "Language",
	en: "English (Anglų)",
	lt: "Lithuanian (Lietuvių)",
	weekday: (index: number) => weekdays[index],
	"I am": "I am",
	"Student not found": (name: string) => `Student "${name}" not found...`,
	"Go back and search for a different one": "Go back search for a different one",
	"Loading data": "Loading data",
	"Interested in what's coming next?": "Interested in what's coming next?",
	"Enter email get notified": "Enter your email and get a notification once we (I, Kipras :D) do something awesome!",
	"we promise to not spam!": "we promise to not spam!",
	"you can cancel anytime": "you can cancel anytime",
	"eg.": "eg.",
	"Notify me about the updates!": "Notify me about the updates!",
	"Email received successfully - thank You for trusting us:)":
		"Email received successfully - thank You for trusting us:)",
	Enter: "Enter",
	Week: "Week",
	"Go back": "Go back",
	Lesson: "Lesson",
	custom: (count: number, count2: number | undefined) => `Sup nerd ${count}, how're you doing, ${count2}`,
	Close: "Close",
	Empty__lesson: "Empty",
	Students: "Students",
	Teachers: "Teachers",
	Classes: "Classes",
	Rooms: "Rooms",
	toCompactString: (items: string[]): string =>
		items.length > 1 ? `${items[0]} and ${items.length - 1} more` : items[0],
	"Made with love by (__html)": `Made with <span aria-label="love">❤</span> by`,
	Availability: "Availability",
	Common: "Common",
	"Common Availability": "Common availability",
	"There're often situations when you have a group of people and want to find a common time to meet":
		"There're often situations when you have a group of people and want to find a common time to meet",
	"is exactly the tool you need": "is exactly the tool you need",
	"red - bussy; blue - available": "red - bussy; blue - available",
	"white - bussy; black - available": "white - bussy; black - available",
	participants: (count) => (count === 1 ? `${count} participant` : `${count} participants`),
	"Click me!": "Click me!",
	"Enter the participant names": "Enter the participant names",
	"The UI/UX will be improved by the time the Beta phase is over":
		"The UI/UX will be improved by the time the Beta phase is over",
	"Extra info": "Extra info",
	"Participant picker": "Participant picker",
	Everyone: "Everyone",
	"Select a time interval": "Select a time interval",
	day: "day",
	time: "time",
	"available (adj, mult)": "available",
	"bussy (adj, mult)": "bussy",
	total: "total",
	"(to) clear": "clear",
	"See an example": "See an example",
	"Recently viewed (adj, mult)": "Recently viewed",
	/**
	 *
	 */
	"outdated-data-warning: Attention! For yet unclear reasons, turbo schedule fails to update (it fails to collect data from the original schedule).":
		"Attention! For yet unclear reasons, Turbo Schedule fails to update (it fails to collect data from the original schedule).",

	"outdated-data-warning: Thus, it's important to know that the schedule you see here might be outdated.":
		"Thus, it's important to know that the schedule you see here might be outdated.",

	"outdated-data-warning: Turbo Schedule checks every minute if the original schedule has any updates. If has, it tries to collect the whole schedule.":
		"Turbo Schedule checks every minute if the original schedule has any updates. If has, it tries to collect the whole schedule. This usually takes a few minutes.",

	"outdated-data-warning: Additionally, Turbo Schedule collects data of the whole schedule every 24 hours.":
		"Additionally, Turbo Schedule collects data of the whole schedule every 24 hours.",

	"outdated-data-warning: This collection of data is what doesn't work properly right now.":
		"This collection of data is what doesn't work properly right now.",

	"outdated-data-warning: I understand.": "I understand.",

	"outdated-data-warning: Last time the data collection happened: ": "Last time the data collection happened: ",
};
