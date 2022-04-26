import { CSSProperties, useState } from "react";

const containerStyle: CSSProperties = {
	position: "absolute",
	top: "-2.5em",
	left: "-2.5em",
};
const tailStyle: CSSProperties = {
	position: "absolute",
	transformOrigin: "2.5em 0em",
};

const tailPathStyle: CSSProperties = {
	fill: "url(#Gradient)",
	paintOrder: "stroke fill markers",
};

const budStyle: CSSProperties = {
	backgroundColor: "#ff00ff",
	width: "5em",
	height: "5em",
	borderRadius: "50%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	position: "absolute",
};

const Drop = () => {
	const [pos, setPos] = useState({ x: 0, y: 0 });
	const [angle, setAngle] = useState(0);
	const [offset, setOffset] = useState(100);

	return (
		<div
			className="drop"
			style={{
				...containerStyle,
				transform: `translate( ${pos.x}px,  ${pos.y}px )`,
			}}
		>
			<svg
				width="5em"
				viewBox="0 0 30 80"
				style={{
					...tailStyle,
					transform: `translatey(2.5em) rotate(${angle}rad)`,
				}}
				className="spin"
				id="tail"
			>
				<linearGradient id="Gradient" x1="0" x2="0" y1="0" y2="1">
					<stop offset="0%" stopColor="#ff00ffff" />
					<stop offset={`${offset}%`} stopColor="#ff00ff00" id="stop" />
				</linearGradient>
				<path
					xmlns="http://www.w3.org/2000/svg"
					d="m13.993 80 2.0141-1.29e-4c0.82825-60.298 13.993-80 13.993-80h-30s13.639 19.586 13.993 80z"
					style={tailPathStyle}
				/>
			</svg>
			<div style={budStyle}>
				<div>text here</div>
			</div>
		</div>
	);
};

export default Drop;
