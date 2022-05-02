export interface Data {
	title: string;
	imgUrl: string;
	description: string;
	links: { text: string; url: string }[];
}

const data: Data[] = [
	{
		title: "project 1",
		imgUrl: "/project1.png",
		description: "description",
		links: [
			{
				text: "Github",
				url: "https://example.com",
			},
			{
				text: "Website",
				url: "https://example.com",
			},
		],
	},
	{
		title: "project 2",
		imgUrl: "/project1.png",

		description: "description 2",
		links: [
			{
				text: "Github",
				url: "https://example.com",
			},
			{
				text: "Website",
				url: "https://example.com",
			},
		],
	},
	{
		title: "project 2",
		imgUrl: "/project1.png",

		description: "description 2",
		links: [
			{
				text: "Github",
				url: "https://example.com",
			},
			{
				text: "Website",
				url: "https://example.com",
			},
		],
	},
];

export default data;
