export interface Dictionary {
	"intl-locale-string": string;

	"Turbo Schedule": string;
	Schedule: string;
	Statistics: string;
	About: string;
	Language: string;
	en: string;
	lt: string;
	weekday: (index: number) => string;
	"I am": string;
	"Student not found": (name: string) => string;
	"Go back and search for a different one": string;
	"Loading data": string;
	"Interested in what's coming next?": string;
	"Enter email get notified": string;
	"we promise to not spam!": string;
	"you can cancel anytime": string;
	"eg.": string;
	"Notify me about the updates!": string;
	"Email received successfully - thank You for trusting us:)": string;
	Enter: string;
	Week: string;
	"Go back": string;
	Lesson: string;
	custom: (count: number, count2?: number) => string;
	Close: string;
	Empty__lesson: string;
	Students: string;
	Teachers: string;
	Classes: string;
	Rooms: string;
	toCompactString: (items: string[]) => string;
	"Made with love by (__html)": string;
	Availability: string;
	Common: string;
	"There're often situations when you have a group of people and want to find a common time to meet": string;
	"Common Availability": string;
	"is exactly the tool you need": string;
	"red - bussy; blue - available": string;
	"white - bussy; black - available": string;
	participants: (count: number) => string;
	"Click me!": string;
	"Enter the participant names": string;
	"The UI/UX will be improved by the time the Beta phase is over": string;
	"Extra info": string;
	"Participant picker": string;
	Everyone: string;
	"Select a time interval": string;
	day: string;
	time: string;
	"available (adj, mult)": string;
	"bussy (adj, mult)": string;
	total: string;
	"(to) clear": string;
	"See an example": string;
	"Recently viewed (adj, mult)": string;
	/** */
	"outdated-data-warning: Attention! For yet unclear reasons, turbo schedule fails to update (it fails to collect data from the original schedule).": string;
	"outdated-data-warning: Thus, it's important to know that the schedule you see here might be outdated.": string;
	"outdated-data-warning: Turbo Schedule checks every minute if the original schedule has any updates. If has, it tries to collect the whole schedule.": string;
	"outdated-data-warning: Additionally, Turbo Schedule collects data of the whole schedule every 24 hours.": string;
	"outdated-data-warning: This collection of data is what doesn't work properly right now.": string;
	"outdated-data-warning: I understand.": string;
	"outdated-data-warning: Last time the data collection happened: ": string;
	// "outdated-data-warning: ": string;

	/** multi-school */
	"Choose your school": string;
	"Work in Progress": string;
	"Not available yet...": string;
	"Don't see your school?": string;
	"Message us!": string;
	"I want Turbo Schedule!": string;
	"i-want-turbo-schedule--mailto-subject": string;
	"i-want-turbo-schedule--mailto-body": string;

	/**
	 * school list
	 */
	// "school-full-name: kpg": string;
	"school-core-name: kpg": string;
	"school-type: kpg": string;
	// "school-full-name: kjpug": string;
	"school-core-name: kjpug": string;
	"school-type: kjpug": string;
	// "school-full-name: kdp": string;
	"school-core-name: kdp": string;
	"school-type: kdp": string;
	//
}
