import { CSSProperties, memo } from "react";
import Image from "next/image";

import type { Data } from "./data";

interface CardProps {
	data: Data;
}

const containerStyle: CSSProperties = {
	border: "0.08rem solid #000000",
	borderRadius: "0.5rem",
	width: "16rem",
	height: "25rem",
	padding: "0 2rem 1rem 2rem",
	display: "flex",
	flexDirection: "column",
	marginTop: "6rem",
};

const imageContainerStyle: CSSProperties = {
	width: "8rem",
	height: "8rem",
	marginTop: "-4rem",
	marginBottom: "1rem",
	alignSelf: "center",
	border: "0.08rem solid #000000",
	borderRadius: "0.5rem",
	backgroundColor: "#ffffff",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

const imageSizeContainerStyle: CSSProperties = {
	width: "6rem",
	height: "6rem",
	position: "relative",
};

const titleStyle: CSSProperties = {
	fontWeight: "bold",
	marginBottom: "1rem",
};
const descriptionStyle: CSSProperties = {
	flexGrow: 1,
	overflow: "scroll",
	marginBottom: "1rem",
};
const linkContainerStyle: CSSProperties = {
	// marginTop: "auto",
};

const linkStyle: CSSProperties = {
	marginRight: "1rem",
};

const Card = ({ data }: CardProps) => {
	return (
		<div style={containerStyle}>
			<div style={imageContainerStyle}>
				<div style={imageSizeContainerStyle}>
					<Image layout="fill" src={data.imgUrl} alt={data.title} />
				</div>
			</div>

			<div style={titleStyle}>{data.title}</div>
			<div style={descriptionStyle}>{data.description}</div>
			<div style={linkContainerStyle}>
				{data.links.map((link, i) => (
					<a style={linkStyle} key={`card-link-${i}`} href={link.url}>
						{link.text}
					</a>
				))}
			</div>
		</div>
	);
};

export default memo(Card);
