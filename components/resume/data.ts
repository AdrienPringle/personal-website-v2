export interface JobData {
	date: string;
	title: string;
	content?: string;
}

const data: JobData[] = [
	{
		date: "Future",
		title: "Maybe your company?",
	},
	{
		date: "2019-\nPresent",
		title: "University of Waterloo - B.A.Sc in Computer Engineering",
		content: "",
	},
	{
		date: "Winter\n'22",
		title: "Sony Interactive Entertainment - DevOps Software Developer",
		content:
			"I helped create a new internal tool to ease the process of releasing apps for the PlayStation 5. Specifically, I made decisions about and ultimately implemented the tech stack, and I wrote APIs that communicate between tools that manage app versions, builds, and releases.",
	},
	{
		date: "Summer\n'21",
		title: "Canadian Tire - UX Developer",
		content:
			"I fixed display issues in the item ordering page of Canadian Tire's e-commerce platform, and wrote a module to prevent flickering visuals from data races on asyncronous data fetches.",
	},
	{
		date: "Fall\n'20",
		title: "Newtopia - Full Stack Developer",
		content:
			"I made various improvements to Newtopia's healthy lifestyle mobile app, and wrote HTTP APIs to enable new health tracking features.",
	},
	{
		date: "Winter\n'20",
		title: "Bike Energy Lab - Database Developer",
		content:
			"I designed a database architecture to store customers' anthropometric data, and a visualisation tool to help match customers with appropriately sized bike parts.",
	},
];

export default data;
