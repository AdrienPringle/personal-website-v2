import { CSSProperties, memo } from "react";

export interface DropProps {
	posx: number;
	posy: number;
	angle: number;
	offset: number;
	opacity: number;
	isActive: boolean;
	content: string;
	onClick: () => void;
	setIsHover: (isHover: boolean) => void;
}

const containerStyle: CSSProperties = {
	position: "absolute",
	top: "-4rem",
	left: "-4rem",
};
const tailStyle: CSSProperties = {
	position: "absolute",
	transformOrigin: "4rem 0rem",
};

const tailPathStyle: CSSProperties = {
	paintOrder: "stroke fill markers",
};

const budStyle: CSSProperties = {
	// backgroundColor: "#ff00ff",
	width: "8rem",
	height: "8rem",
	borderRadius: "50%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	position: "absolute",
	fontSize: "2rem",
	fontFamily: '"Josefin Sans", sans-serif',
	// zIndex: 1,
};

const Drop = ({
	posx,
	posy,
	angle,
	offset,
	opacity,
	isActive,
	content,
	onClick,
	setIsHover,
}: DropProps) => {
	return (
		<div
			className="drop-container"
			style={{
				position: "relative",
				pointerEvents: isActive ? "auto" : "none",
			}}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			onClick={onClick}
		>
			<div
				className="drop"
				style={{
					...containerStyle,
					transform: `translate( ${posx}em,  ${posy}em )`,
					filter: `opacity(${opacity}%)`,
				}}
			>
				<svg
					width="8em"
					viewBox="0 0 30 80"
					style={{
						...tailStyle,
						transform: `translatey(4em) rotate(${angle}rad)`,
					}}
					className="spin"
					id="tail"
				>
					<linearGradient
						id={`Gradient-${content}`}
						x1="0"
						x2="0"
						y1="0"
						y2="1"
					>
						<stop offset="0%" />
						<stop offset={`${offset}%`} />
					</linearGradient>
					<path
						xmlns="http://www.w3.org/2000/svg"
						d="m13.993 80 2.0141-1.29e-4c0.82825-60.298 13.993-80 13.993-80h-30s13.639 19.586 13.993 80z"
						style={{ ...tailPathStyle, fill: `url(#Gradient-${content})` }}
					/>
				</svg>
				<div className="bud" style={budStyle}>
					<div>{content}</div>
				</div>
			</div>
		</div>
	);
};

export default memo(Drop);
