import { CSSProperties, SVGProps, useEffect, useState, memo } from "react";

interface ShapeProps<t> {
	x: number;
	y: number;
	angle: number;
	scale: number;
	props?: SVGProps<t>;
}

const Square = ({ x, y, angle, scale, props }: ShapeProps<SVGRectElement>) => {
	return (
		<rect
			x="1"
			y="1"
			width="33"
			height="33"
			transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}
			style={{
				transformBox: "fill-box",
				transformOrigin: "center",
			}}
			{...props}
		/>
	);
};
const Circle = ({
	x,
	y,
	angle,
	scale,
	props,
}: ShapeProps<SVGCircleElement>) => {
	return (
		<circle
			cx="18.5"
			cy="18.5"
			r="17.5"
			transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}
			style={{
				transformBox: "fill-box",
				transformOrigin: "center",
			}}
			{...props}
		/>
	);
};
const Triangle = ({
	x,
	y,
	angle,
	scale,
	props,
}: ShapeProps<SVGPathElement>) => {
	return (
		<path
			d="M1.81347 33.5L20 2L38.1865 33.5H1.81347Z"
			transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}
			style={{
				transformBox: "fill-box",
				transformOrigin: "center",
			}}
			{...props}
		/>
	);
};

const Wave = ({ x, y, angle, scale, props }: ShapeProps<SVGPathElement>) => {
	return (
		<path
			d="M 1.08841,18.3618 C 21.2979,-3.67222 27.113,41.7173 46.1466,18.9547 M 1.91629,7.36179 C 22.1258,-14.6722 27.9409,30.7173 46.9745,7.95467"
			transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}
			style={{
				transformBox: "fill-box",
				transformOrigin: "center",
			}}
			{...props}
		/>
	);
};

const components = [memo(Square), memo(Circle), memo(Triangle), memo(Wave)];

interface Shape<State extends string> {
	x: number;
	y: number;
	angle: number;
	type: number;
	i: number;
	j: number;
	visibilityMap: { [state in State]: boolean };
	color: "red" | "blue" | "default";
}

interface BackgroundProps<State extends string> {
	stateMap: {
		[state in State]: (x: number, y: number, isMobile: boolean) => boolean;
	};
	state: State;
	windowWidth: number;
	windowHeight: number;
}

const Background = <State extends string>({
	stateMap,
	state,
	windowWidth,
	windowHeight,
}: BackgroundProps<State>) => {
	const [shapes, setShapes] = useState<Shape<State>[]>([]);
	const [svgScale, setScale] = useState(1);
	// const [svgWitdh, setWidth] = useState(0);
	// const [svgHeight, setHeight] = useState(0);

	const isMobile = windowWidth <= 480;

	useEffect(() => {
		// const width = document.body.clientWidth;
		// const height = window.innerHeight;
		// setWidth(width);
		// setHeight(height);

		const scale = isMobile ? windowWidth / 600 : windowWidth / 1680;
		setScale(scale);

		const distance = 130 * scale;
		const vertDist = 0.707 * distance;

		const numX = Math.ceil(windowWidth / distance) + 1;
		const numY = Math.ceil(windowHeight / vertDist) + 1;

		const initShapes: Shape<State>[] = [];

		const stateMapArr = Object.entries(stateMap) as [
			State,
			(x: number, y: number, isMobile: boolean) => boolean
		][];

		for (let i = 0; i < numY; i++) {
			for (let j = 0; j < numX; j++) {
				const x =
					(j + (i % 2) * 0.5) * distance +
					(Math.random() - 0.5) * distance * 0.25 -
					15;
				const y = i * vertDist + (Math.random() - 0.5) * vertDist * 0.25;
				const angle = Math.random() * 360;
				const type = Math.floor(Math.random() * 4);

				const visibilityMap = Object.fromEntries(
					stateMapArr.map(([key, func]) => [
						key,
						func((x + 15) / windowWidth, y / windowHeight, isMobile),
					])
				) as { [state in State]: boolean };

				const colorNum = Math.floor(Math.random() * 16);
				const color =
					colorNum === 0 ? "red" : colorNum === 1 ? "blue" : "default";

				initShapes.push({
					x,
					y,
					angle,
					type,
					i,
					j,
					visibilityMap,
					color,
				});
			}
		}

		setShapes(initShapes);
	}, [windowWidth, windowHeight]);

	const getPathsFromShape = (shape: Shape<State>) => {
		const Element = components[shape.type];

		const isVisible = shape.visibilityMap[state];
		const props = {
			fill: "white",
			// stroke: `#1F1F1F${shape.visibilityMap[state] ? "ff" : "00"}`,
			strokeWidth: "0.06rem",
			className: `
                shape
                shape-type-${shape.type}
                shape-color-${shape.color}
                ${isVisible ? "shape-visible" : "shape-invisible"}
            `,
		};

		return (
			<Element
				x={shape.x}
				y={shape.y}
				angle={shape.angle}
				scale={svgScale}
				props={props}
				key={`shape-${shape.i}-${shape.j}`}
			/>
		);
	};
	return (
		<svg
			width={windowWidth}
			height={windowHeight}
			viewBox={`0 0 ${windowWidth} ${windowHeight}`}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				position: "fixed",
				zIndex: -100,
				top: 0,
				left: 0,
			}}
		>
			{shapes.map(getPathsFromShape)}
		</svg>
	);
};

export default Background;
