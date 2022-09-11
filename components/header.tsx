import { CSSProperties, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import AnimatedDrop, { AnimatedDropProps } from "./animatedDrop";

type DropState = Omit<
	AnimatedDropProps,
	"content" | "key" | "link" | "isAnimating"
>;

const stateMainLeft: DropState = {
	tailPosx: 0,
	tailPosy: 0,
	posx: -16,
	posy: 10,
	offset: 80,
	isActive: true,
};

const stateMainLeftMobile: DropState = {
	tailPosx: 0,
	tailPosy: -5,
	posx: -12,
	posy: 15,
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

const stateMainMiddleMobile: DropState = {
	tailPosx: 0,
	tailPosy: -5,
	posx: 0,
	posy: 25,
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

const stateMainRightMobile: DropState = {
	tailPosx: 0,
	tailPosy: -5,
	posx: 12,
	posy: 15,
	offset: 80,
	isActive: true,
};

const statePageLeft: DropState = {
	tailPosx: 0,
	tailPosy: -4,
	posx: -28,
	posy: -2,
	offset: 80,
	isActive: true,
};

const statePageLeftMobile: DropState = {
	tailPosx: -30,
	tailPosy: -4,
	posx: -15,
	posy: -3,
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

const statePageMiddleMobile: DropState = {
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
	posx: 28,
	posy: -2,
	offset: 80,
	isActive: true,
};

const statePageRightMobile: DropState = {
	tailPosx: 30,
	tailPosy: -4,
	posx: 15,
	posy: -3,
	offset: 80,
	isActive: true,
};

type Content = "resume" | "projects" | "contact";
export type Pages = "/" | "resume" | "projects" | "contact";

const stateMap: {
	[p in Pages]: { [c in Content]: [DropState, DropState] };
} = {
	"/": {
		resume: [stateMainLeft, stateMainLeftMobile],
		projects: [stateMainMiddle, stateMainMiddleMobile],
		contact: [stateMainRight, stateMainRightMobile],
	},
	resume: {
		resume: [statePageMiddle, statePageMiddleMobile],
		projects: [statePageLeft, statePageLeftMobile],
		contact: [statePageRight, statePageRightMobile],
	},
	projects: {
		resume: [statePageLeft, statePageLeftMobile],
		projects: [statePageMiddle, statePageMiddleMobile],
		contact: [statePageRight, statePageRightMobile],
	},
	contact: {
		resume: [statePageLeft, statePageLeftMobile],
		projects: [statePageRight, statePageRightMobile],
		contact: [statePageMiddle, statePageMiddleMobile],
	},
};

const nameStyle: CSSProperties = {
	fontSize: "6rem",
	fontFamily: '"Josefin Slab", sans-serif',
	zIndex: 2,
	transition: "transform 0.2s",
	color: "inherit",
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
	windowWidth: number;
}

const Header = ({ page, windowWidth }: HeaderProps) => {
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

	const isMobile = windowWidth < 480 ? 1 : 0;

	const nameScale = isMain ? 1 : 0.3;
	const subScale = isMain ? 1 : isMobile ? 2 : 2.5;

	const NameTag = isMain ? "div" : Link;

	return (
		<div
			style={{
				...containerStyle,
				transform: `translateY(${
					isMain ? (isMobile ? "calc(40vh - 15em)" : "10em") : "0em"
				})`,
			}}
		>
			<NameTag href={"/"}>
				<a
					className={isMain ? "" : "underline-hover"}
					style={{
						...nameStyle,
						transform: `scale(${nameScale}, ${nameScale})`,
					}}
				>
					Adrien Pringle
				</a>
			</NameTag>
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
					{...stateMap[page].resume[isMobile]}
					link="/resume"
				/>
				<AnimatedDrop
					content="contact"
					isAnimating={isAnimating}
					{...stateMap[page].contact[isMobile]}
					link="/contact"
				/>
				<AnimatedDrop
					content="projects"
					isAnimating={isAnimating}
					{...stateMap[page].projects[isMobile]}
					link="/projects"
				/>
			</div>
		</div>
	);
};

export default Header;
