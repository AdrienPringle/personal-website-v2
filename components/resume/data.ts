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
		date: "Winter\n'22",
		title: "Company",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
	},
];

export default data;
