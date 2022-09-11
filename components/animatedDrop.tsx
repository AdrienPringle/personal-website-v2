import { CSSProperties, useState } from "react";
import { Motion, spring } from "react-motion";

import Drop from "./drop";

export interface AnimatedDropProps {
	posx: number;
	posy: number;
	tailPosx: number;
	tailPosy: number;
	offset: number;
	isActive: boolean;
	isAnimating: boolean;
	content: string;
	link: string;
}

function getAngle(
	posx: number,
	posy: number,
	tailPosx: number,
	tailPosy: number
) {
	return Math.atan2(-tailPosx + posx, tailPosy - posy);
}
function multiplyPos(pos: number, tailPos: number, isHover: boolean) {
	return isHover ? pos + (pos - tailPos) * 0.05 : pos;
}

const AnimatedDrop = ({
	posx,
	posy,
	tailPosx,
	tailPosy,
	offset,
	isActive,
	isAnimating,
	content,
	link,
}: AnimatedDropProps) => {
	// const [posx, setPosx] = useState(0);
	// const [posy, setPosy] = useState(0);

	// const [tailPosx, setTailPosx] = useState(-10);
	// const [tailPosy, setTailPosy] = useState(-10);

	//axes and signs are swapped to rotate by 90º anticlockwise

	const [isHover, setIsHover] = useState(false);

	return (
		<Motion
			defaultStyle={{
				posx,
				posy,
				tailPosx,
				tailPosy,
				offset,
				opacity: isActive ? 100 : 0,
			}}
			style={{
				posx: spring(multiplyPos(posx, tailPosx, isHover), {
					damping: isHover && !isAnimating ? 7 : 17,
					stiffness: isHover && !isAnimating ? 400 : 170,
				}),
				posy: spring(multiplyPos(posy, tailPosy, isHover), {
					damping: isHover && !isAnimating ? 7 : 17,
					stiffness: isHover && !isAnimating ? 400 : 170,
				}),
				tailPosx: spring(tailPosx, {
					damping: 20,
					stiffness: 400,
				}),
				tailPosy: spring(tailPosy, {
					damping: 20,
					stiffness: 400,
				}),
				offset: spring(offset),
				opacity: spring(isActive ? 100 : 0),
			}}
		>
			{(value) => (
				<Drop
					offset={value.offset}
					angle={getAngle(
						value.posx,
						value.posy,
						value.tailPosx,
						value.tailPosy
					)}
					posx={value.posx}
					posy={value.posy}
					opacity={value.opacity}
					content={content}
					isActive={isActive}
					link={link}
					setIsHover={setIsHover}
				/>
			)}
		</Motion>
	);
};

export default AnimatedDrop;
