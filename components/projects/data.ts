import { StaticImageData } from "next/image";
import { resourceUsage } from "process";
import { Z_BEST_COMPRESSION } from "zlib";

import threeD from "./images/3d.png";
import biconIcon from "./images/bisonicon.png";
import copydoc from "./images/copydoc.jpg";
import everyBorder from "./images/every-border.png";
import gravity from "./images/gravity.png";
import guitar from "./images/guitar.jpg";
import pokecord from "./images/pokecord.png";
import recursion from "./images/recursion.jpg";
import streaminar from "./images/streaminar.jpg";
import tilegame from "./images/tilegame.jpg";
import unfabled from "./images/unfabled.jpg";
import hungryhungryfrogge from "./images/hungryhungryfrogge.png";
import warpduels from "./images/warpduels.jpg";
import ytnav from "./images/ytnav.jpg";
import pixelPyrotechnics from "./images/pixel-pyrotechnics.jpg";

export interface ProjectData {
	title: string;
	img: StaticImageData;
	description: string;
	links: { text: string; url: string }[];
}

const data: ProjectData[] = [
	{
		title: "Pixel Pyrotechnics",
		img: pixelPyrotechnics,
		description: "Voxel puzzles to blow your mind!",
		links: [
			{
				text: "itch.io",
				url: "https://chip2222.itch.io/pixel-pyrotechnics",
			},
			{
				text: "GitHub",
				url: "https://github.com/AdrienPringle/Pixel-Pyrotechnics",
			},
		],
	},
	{
		title: "Unfabled",
		img: unfabled,
		description:
			"Play as a a mad wizard whose horse has been stolen from its stable! Standing between you and your horse is a treacherous forest filled with beasts and guards attempting to stop you in your path!",
		links: [
			{
				text: "itch.io",
				url: "https://kwiper01.itch.io/unfabled",
			},
			{
				text: "GitHub",
				url: "https://github.com/Kwiper/Unfabled",
			},
		],
	},
	{
		title: "Hungry Hungry Frogge",
		img: hungryhungryfrogge,
		description:
			"Hungre Hungre Frogge is a game about feeding blobs to frogs. Frogs can't push blobs, so you must build walls to herd the food to their mouths. Made in 48 hours for Hack the North 2021.",
		links: [
			{
				text: "Devpost",
				url: "https://devpost.com/software/hungre-hungre-frogge",
			},
			{
				text: "GitHub",
				url: "https://github.com/AdrienPringle/HTN-team-brain-damage",
			},
		],
	},
	{
		title: "Country Border Distance Visualiser",
		img: everyBorder,
		description:
			"Find the distance from other countries by border crossing count.",
		links: [
			{
				text: "Website",
				url: "https://every-border.web.app/",
			},
			{
				text: "GitHub",
				url: "https://github.com/AdrienPringle/Border-Distance-Visualiser",
			},
		],
	},
	{
		title: "Recursive Reactions",
		img: recursion,

		description: "Do you ever wish you could react to reactions",
		links: [
			{
				text: "Website",
				url: "https://recursive.apringle.dev/",
			},
			{
				text: "GitHub",
				url: "https://github.com/AdrienPringle/recursive-reacts",
			},
		],
	},
	{
		title: "Low Effort Youtube Navigation",
		img: ytnav,

		description:
			"A Chrome extension for intuitive keyboard navigation, and an even more intuitive Nunchuk control schemme.",
		links: [
			{
				text: "Website",
				url: "https://apringle.dev/projects/ytnav.html",
			},
		],
	},
	{
		title: "Streaminar",
		img: streaminar,

		description:
			"A chrome extension to create notes that are syncronized with videos.",
		links: [
			{
				text: "Devpost",
				url: "https://devpost.com/software/time-sensitive-video-notes",
			},
		],
	},
	{
		title: "Bison Blog Notifications",
		img: biconIcon,

		description:
			"Automated email notifications for the awesome Banff bison blog, which more people should read.",
		links: [
			{
				text: "Website",
				url: "https://bison-blog.apringle.dev",
			},
		],
	},
	{
		title: "Fake Pokécord",
		img: pokecord,

		description: "A prank Discord bot that imitates Pokécord.",
		links: [
			{
				text: "GitHub",
				url: "https://github.com/AdrienPringle/fake-pokecord#readme",
			},
		],
	},
	{
		title: "Guitar String Detector",
		img: guitar,

		description: "An ongoing attempt to detect strings from chords.",
		links: [
			{
				text: "GitHub",
				url: "https://github.com/AdrienPringle/guitar-string-detector#readme",
			},
		],
	},
	{
		title: "Tile Board Game",
		img: tilegame,

		description:
			"A quick prototype of a 2 player Conway's Game of Life inspired game.",
		links: [
			{
				text: "Website",
				url: "https://apringle.dev/projects/board.html",
			},
		],
	},
	{
		title: "Gravity Model",
		img: gravity,

		description: "A step by step simulation of multiple gravitational bodies.",
		links: [
			{
				text: "Website",
				url: "https://apringle.dev/projects/gravity model.html",
			},
		],
	},
	{
		title: "3D Renderer",
		img: threeD,

		description: "A rudimentary 3D renderer made without libraries.",
		links: [
			{
				text: "Website",
				url: "https://apringle.dev/projects/3Drender.html",
			},
		],
	},
	{
		title: "Warp Duels",
		img: warpduels,

		description:
			"A quick paced local 1v1 arcade battles with lasers and spaceships.",
		links: [
			{
				text: "itch.io",
				url: "https://chip2222.itch.io/warp-duels",
			},
		],
	},
];

export default data;
