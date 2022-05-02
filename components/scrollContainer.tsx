import { relative } from "node:path/win32";
import { CSSProperties, memo } from "react";

interface Props {
	children?: React.ReactNode;
	buttonText?: string;
	onButtonClick?: () => void;
}

const scrollMaskStyle: CSSProperties = {
	width: "100%",
	height: "13rem",
	backgroundColor: "white",

	position: "sticky",
	top: 0,
	zIndex: 1,

	borderBottom: "0.08rem solid black",

	display: "flex",
	flexDirection: "column",
	justifyContent: "end",
	alignItems: "center",
};

const buttonStyle: CSSProperties = {
	// height: "3rem",
	marginBottom: "-1.4rem", //font 2 + padding 0.4
	backgroundColor: "#ffffff",
	border: "0.08rem solid black",
	borderRadius: "0.5rem",

	padding: "0.4rem",
	paddingBottom: 0,

	fontFamily: '"Josefin Sans", sans-serif',
	fontSize: "2rem",
};

const scrollContainerStyle: CSSProperties = {
	width: "100%",
	paddingLeft: "20%",
	paddingRight: "20%",
};

const ScrollContainer: React.FC<Props> = ({
	children,
	buttonText,
	onButtonClick,
}) => {
	return (
		<div style={scrollContainerStyle}>
			<div style={scrollMaskStyle}>
				{buttonText && (
					<button style={buttonStyle} onClick={onButtonClick}>
						{buttonText}
					</button>
				)}
			</div>

			{children}
		</div>
	);
};

export default memo(ScrollContainer);
