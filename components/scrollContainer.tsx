import { relative } from "node:path/win32";
import { CSSProperties, memo } from "react";

interface Props {
	visible: boolean;
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
	marginBottom: "-1.4rem", //font 2 + padding 0.4
	backgroundColor: "#ffffff",
	border: "0.08rem solid black",
	borderRadius: "0.5rem",
	// boxSizing: "border-box",
	padding: "0.4rem",
	paddingBottom: 0,
	fontFamily: '"Josefin Sans", sans-serif',
	fontSize: "2rem",

	overflow: "hidden",

	position: "relative",
};

const buttonBackgroundStyle: CSSProperties = {
	position: "absolute",
	top: 0,
	left: 0,
	zIndex: 1,
	width: "20rem",
	height: "10rem",
};

const ScrollContainer: React.FC<Props> = ({
	visible,
	children,
	buttonText,
	onButtonClick,
}) => {
	return (
		<div className="scroll-container">
			{visible && (
				<div style={scrollMaskStyle}>
					{buttonText && (
						<button
							className="divider-button"
							style={buttonStyle}
							onClick={onButtonClick}
						>
							<div style={{ zIndex: 2, position: "relative" }}>
								{" "}
								{buttonText}
							</div>

							<div
								style={buttonBackgroundStyle}
								className="divider-button-background"
							></div>
						</button>
					)}
				</div>
			)}

			{children}
		</div>
	);
};

export default memo(ScrollContainer);
