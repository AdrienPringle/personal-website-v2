import { CSSProperties, useState } from "react";
import { useRouter } from "next/router";

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
export type Pages = "/" | "resume" | "projects" | "contact";

const stateMap: {
	[p in Pages]: { [c in Content]: DropState };
} = {
	"/": {
		resume: stateMainLeft,
		projects: stateMainMiddle,
		contact: stateMainRight,
	},
	resume: {
		resume: statePageMiddle,
		projects: statePageLeft,
		contact: statePageRight,
	},
	projects: {
		resume: statePageLeft,
		projects: statePageMiddle,
		contact: statePageRight,
	},
	contact: {
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
	pointerEvents: "none",
	transition: "transform 0.2s",
};
const containerStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	transition: "transform 0.2s",
	position: "fixed",
	top: 0,
	left: 0,
	right: 0,
	zIndex: 5,
};

const pageToSubMap: { [p in Pages]: string } = {
	"/": "i make software",
	resume: "Resume",
	projects: "Projects",
	contact: "Contact",
};

interface HeaderProps {
	page: Pages;
}

const Header = ({ page }: HeaderProps) => {
	// const [page, setPage] = useState<Pages>("main_page");
	const [isAnimating, setIsAnimating] = useState(false);
	const router = useRouter();
	// const [pagenum, setpagenum] = useState(0);

	// const pages: Pages[] = [
	// 	"main_page",
	// 	"projects_page",
	// 	"resume_page",

	// 	"contact_page",
	// ];

	// const page = pages[pagenum];

	const transition = (newPage: Pages) => {
		router.push(newPage);
		setIsAnimating(true);
		setTimeout(() => setIsAnimating(false), 600);
	};

	const isMain = page === "/";

	const nameScale = isMain ? 1 : 0.3;
	const subScale = isMain ? 1 : 2.5;
	return (
		<div
			style={{
				...containerStyle,
				transform: `translateY(${isMain ? 10 : 0}em)`,
			}}
		>
			<div
				style={{
					...nameStyle,
					transform: `scale(${nameScale}, ${nameScale})`,
				}}
				onClick={() => transition("/")}
				className={isMain ? "" : "underline-hover"}
			>
				Adrien Pringle
			</div>
			<div
				style={{
					...subStyle,
					transform: `scale(${subScale}, ${subScale})`,
				}}
			>
				{pageToSubMap[page]}
			</div>
			{/* <button onClick={() => setpagenum((pagenum + 1) % 4)}>click</button> */}
			<div style={{ zIndex: 1 }}>
				<AnimatedDrop
					content="resume"
					isAnimating={isAnimating}
					{...stateMap[page].resume}
					onClick={() => transition("resume")}
				/>
				<AnimatedDrop
					content="projects"
					isAnimating={isAnimating}
					{...stateMap[page].projects}
					onClick={() => transition("projects")}
				/>
				<AnimatedDrop
					content="contact"
					isAnimating={isAnimating}
					{...stateMap[page].contact}
					onClick={() => transition("contact")}
				/>
			</div>
		</div>
	);
};

export default Header;
