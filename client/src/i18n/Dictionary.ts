export interface Dictionary {
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
}
