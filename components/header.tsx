import { CSSProperties, useState } from "react";
import { Motion, spring } from "react-motion";

import AnimatedDrop, { AnimatedDropProps } from "./animatedDrop";

type DropState = Omit<
	AnimatedDropProps,
	"content" | "key" | "onClick" | "isAnimating"
>;

const stateMainLeft: DropState = {
	tailPosx: 0,
	tailPosy: 0,
	posx: -16,
	posy: 10,
	offset: 80,
	isActive: true,
};
const stateMainMiddle: DropState = {
	tailPosx: 0,
	tailPosy: 0,
	posx: 0,
	posy: 20,
	offset: 80,
	isActive: true,
};
const stateMainRight: DropState = {
	tailPosx: 0,
	tailPosy: 0,
	posx: 16,
	posy: 10,
	offset: 80,
	isActive: true,
};
const statePageLeft: DropState = {
	tailPosx: 0,
	tailPosy: -4,
	posx: -32,
	posy: -2,
	offset: 80,
	isActive: true,
};
const statePageMiddle: DropState = {
	tailPosx: 0,
	tailPosy: -4,
	posx: 0,
	posy: -16,
	offset: 0,
	isActive: false,
};
const statePageRight: DropState = {
	tailPosx: 0,
	tailPosy: -4,
	posx: 32,
	posy: -2,
	offset: 80,
	isActive: true,
};

type Content = "resume" | "projects" | "contact";
export type Pages =
	| "main_page"
	| "resume_page"
	| "projects_page"
	| "contact_page";

const stateMap: {
	[p in Pages]: { [c in Content]: DropState };
} = {
	main_page: {
		resume: stateMainLeft,
		projects: stateMainMiddle,
		contact: stateMainRight,
	},
	resume_page: {
		resume: statePageMiddle,
		projects: statePageLeft,
		contact: statePageRight,
	},
	projects_page: {
		resume: statePageLeft,
		projects: statePageMiddle,
		contact: statePageRight,
	},
	contact_page: {
		resume: statePageLeft,
		projects: statePageRight,
		contact: statePageMiddle,
	},
};

const nameStyle: CSSProperties = {
	fontSize: "6rem",
	fontFamily: '"Josefin Slab", sans-serif',
	zIndex: 2,
	transition: "transform 0.2s",
};
const subStyle: CSSProperties = {
	fontSize: "3rem",
	fontFamily: '"Josefin Slab", sans-serif',
	zIndex: 2,
	transition: "transform 0.2s",
};
const containerStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	transition: "transform 0.2s",
};

const pageToSubMap: { [p in Pages]: string } = {
	main_page: "i make software",
	resume_page: "Resume",
	projects_page: "Projects",
	contact_page: "Contact",
};

interface HeaderProps {
	page: Pages;
	setPage: (page: Pages) => void;
}

const Header = ({ page, setPage }: HeaderProps) => {
	// const [page, setPage] = useState<Pages>("main_page");
	const [isAnimating, setIsAnimating] = useState(false);
	// const [pagenum, setpagenum] = useState(0);

	// const pages: Pages[] = [
	// 	"main_page",
	// 	"projects_page",
	// 	"resume_page",

	// 	"contact_page",
	// ];

	// const page = pages[pagenum];

	const transition = (newPage: Pages) => {
		setPage(newPage);
		setIsAnimating(true);
		setTimeout(() => setIsAnimating(false), 600);
	};

	const isMain = page === "main_page";

	{
	}
	return (
		<div
			style={{
				...containerStyle,
				transform: `translateY(${isMain ? 10 : 0}em)`,
			}}
		>
			<div
				style={{ ...nameStyle, transform: `scale(${isMain ? 100 : 30}%)` }}
				onClick={() => setPage("main_page")}
				className={isMain ? "" : "underline-hover"}
			>
				Adrien Pringle
			</div>
			<div style={{ ...subStyle, transform: `scale(${isMain ? 100 : 250}%)` }}>
				{pageToSubMap[page]}
			</div>
			{/* <button onClick={() => setpagenum((pagenum + 1) % 4)}>click</button> */}
			<div style={{ zIndex: 1 }}>
				<AnimatedDrop
					content="resume"
					isAnimating={isAnimating}
					{...stateMap[page].resume}
					onClick={() => transition("resume_page")}
				/>
				<AnimatedDrop
					content="projects"
					isAnimating={isAnimating}
					{...stateMap[page].projects}
					onClick={() => transition("projects_page")}
				/>
				<AnimatedDrop
					content="contact"
					isAnimating={isAnimating}
					{...stateMap[page].contact}
					onClick={() => transition("contact_page")}
				/>
			</div>
		</div>
	);
};

export default Header;
