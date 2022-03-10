import { Dictionary } from "./Dictionary";

const weekdays: Array<string> = [
	"Pirmadienis", //
	"Antradienis",
	"Trečiadienis",
	"Ketvirtadienis",
	"Penktadienis",
	"Šeštadienis",
	"Sekmadienis",
];

export const lt: Dictionary = {
	"intl-locale-string": "lt-LT",
	"Turbo Schedule": "Turbo Tvarkaraštis",
	Schedule: "Tvarkaraštis",
	Statistics: "Statistika",
	About: "Apie mus",
	Language: "Kalba",
	en: "Anglų (English)",
	lt: "Lietuvių (Lithuanian)",
	weekday: (index: number) => weekdays[index],
	"I am": "Aš esu",
	"Student not found": (name: string) => `Moksleivis "${name}" nerastas...`,
	"Go back and search for a different one": "Grįžk ir ieškok kito!",
	"Loading data": "Siurbiame duomenis...",
	"Interested in what's coming next?": "Įdomu, kas bus toliau?",
	"Enter email get notified": "Įvesk savo paštą ir gauk pranešimą, kai mes (aš, Kipras :D) padarom ką nors awesome!",
	"we promise to not spam!": "prižadame ne'spam'inti!",
	"you can cancel anytime": "galite bet kada atšaukti",
	"eg.": "pvz.",
	"Notify me about the updates!": "Pranešti man apie atnaujinimus!",
	"Email received successfully - thank You for trusting us:)":
		"El. paštas gautas sėkmingai - dėkojame už pasitikėjimą:)",
	Enter: "Enter",
	Week: "Savaitė",
	"Go back": "Grįžti",
	Lesson: "Pamoka",
	custom: (count) => `county count ${count}`,
	Close: "Uždaryti",
	Empty__lesson: "Laisva",
	Students: "Mokiniai",
	Teachers: "Mokytojai",
	Classes: "Klasės",
	Rooms: "Kabinetai",
	toCompactString: (items: string[]): string =>
		items.length > 1 ? `${items[0]} ir dar ${items.length - 1}` : items[0],

	"Made with love by (__html)": `Su <span aria-label="love">❤</span> sukūrė`,
	Availability: "Prieinamumas" /** TODO IMPROVE lol */,
	Common: "Bendras",
	"Common Availability": "Bendras prieinamumas" /** TODO IMPROVE lol */,
	"There're often situations when you have a group of people and want to find a common time to meet":
		"Dažnai būna situacijų, kai turitę žmonių grupę ir norite rasti bendrą laiką susitikimui",
	"is exactly the tool you need": "būtent tam ir skirtas",
	"red - bussy; blue - available": "raudona - užimta; mėlyna - laisva",
	"white - bussy; black - available": "balta - užimta; juoda - laisva",
	participants: (count) => `${count}`,
	/** this is a nightmare */
	// count % 10 === 1
	// 	? count % 100 !== 11
	// 		? `${count} dalyvis`
	// 		: count % 100 >= 10 && count % 100 <= 20
	// 			? // ? count % 10 === 1
	// 		  // ? `${count} dalyvis` :
	// 		  `${count} dalyvių`
	// 		: count % 10 >= 2 && count % 10 <= 9
	// 		? `${count} dalyviai`
	// 		: `${count} dalyvių`
	// 	: `${count} dalyviai`,
	"Click me!": "Paspausk mane!",
	"Enter the participant names": "Įveskite dalyvių vardus",
	"The UI/UX will be improved by the time the Beta phase is over":
		'Vartotojo sąsajos veikimo įpatumai patobulės pasibaigus "Beta" fazei',
	"Extra info": "Papildoma informacija",
	"Participant picker": "Dalyvių pasirinkimas",
	Everyone: "Visi",
	"Select a time interval": "Pasirinkite laiko intervalą",
	day: "diena",
	time: "laikas",
	"available (adj, mult)": "laisvi",
	"bussy (adj, mult)": "užimti",
	total: "iš viso",
	"(to) clear": "išvalyti",
	"See an example": "Pamatyti pavyzdį",
	"Recently viewed (adj, mult)": "Neseniai peržiūrėti",
	/**
	 *
	 */
	// "outdated-data-warning: Attention! For yet unclear reasons, turbo schedule fails to update (it fails to collect data from the original schedule).": `Dėmesio! Dėl kol kas neaiškių priežasčių, <i>turbo tvarkaraščio</i> atnaujinti nepavyksta (duomenų surinkimas iš originalaus tvarkaraščio "feilina").`,
	"outdated-data-warning: Attention! For yet unclear reasons, turbo schedule fails to update (it fails to collect data from the original schedule).": `Dėmesio! Dėl kol kas neaiškių priežasčių, Turbo Tvarkaraščio atnaujinti nepavyksta (duomenų surinkimas iš originalaus tvarkaraščio "feilina").`,

	"outdated-data-warning: Thus, it's important to know that the schedule you see here might be outdated.":
		"Todėl svarbu žinoti, jog čia matomas tvarkaraštis gali būti pasenęs.",

	// "outdated-data-warning: turbo schedule checks every minute if the original schedule has any updates. If has, it tries to collect the whole schedule. This is exactly the part that doesn't work properly right now.": `<i>turbo tvarkaraštis</i> kiekvieną minutę tikrina, ar originaliame tvarkaraštyje yra pakeitimų. Jeigu yra - bando iš naujo surinkti visą tvarkaraštį. Būtent surinkimas šiuo metu ir neveikia.`,
	"outdated-data-warning: Turbo Schedule checks every minute if the original schedule has any updates. If has, it tries to collect the whole schedule.":
		"Turbo Tvarkaraštis kiekvieną minutę tikrina, ar originalus tvarkaraštis pasikeitė. Jeigu pasikeitė - iš kart bando atsinaujinti surinkdamas duomenis. Dažniausiai tai trunka kelias minutes.",

	"outdated-data-warning: Additionally, Turbo Schedule collects data of the whole schedule every 24 hours.":
		"Taip pat, nors ir originalus tvarkaraštis nepasikeičia, Turbo Tvarkaraštis reguliariai surenka duomenis kas 24 valandas.",

	"outdated-data-warning: This collection of data is what doesn't work properly right now.":
		"Būtent atsinaujinimas / originalaus tvarkaraščio duomenų surinkimas šiuo metu ir neveikia.",

	"outdated-data-warning: I understand.": "Supratau.",

	"outdated-data-warning: Last time the data collection happened: ": "Paskutinį kartą duomenų surinkimas įvyko: ",
};
