import React, { CSSProperties, memo } from "react";

import data, { JobData } from "./data";

const timelineContainerStyle: CSSProperties = {
	display: "grid",
	gridTemplateColumns: "1fr 0.08rem 3fr",
	width: "100%",
	marginTop: "8rem",
};
const dateStyle: CSSProperties = {
	gridColumn: 1,
	whiteSpace: "pre-line",
	textAlign: "right",

	fontFamily: '"Josefin Sans", sans-serif',
	color: "#b0b0b0",

	margin: "2rem 3rem 4rem 0",
};

const detailsStyle: CSSProperties = {
	gridColumn: 3,

	padding: "1.2rem 2.4rem 1.2rem 2.4rem",

	margin: "2rem 0 4rem 3rem",
	border: "0.08rem solid black",
	borderRadius: "0.5rem",

	position: "relative",

	boxSizing: "border-box",
	overflow: "hidden",

	background: `linear-gradient(90deg, #58a4b0ff 0rem ,#58a4b0ff 0.5rem, #ffffff 0.5rem, #ffffff 100%)`,
};

const redDetail: CSSProperties = {
	background: `linear-gradient(90deg, #f56476ff 0rem ,#f56476ff 0.5rem, #ffffff 0.5rem, #ffffff 100%)`,
};

const titleStyle: CSSProperties = {
	fontSize: "1.5rem",
	fontWeight: "bold",
	marginTop: "0.5rem",
	marginBottom: "0.5rem",
};

const contentStyle: CSSProperties = {
	fontSize: "1.2rem",
	marginTop: "1.2rem",
	marginBottom: "0.5rem",
};

const dividerStyle: CSSProperties = {
	gridColumn: 2,
	gridRow: "1/ span 999",
	width: "0.08rem",
	height: "100%",
	backgroundColor: "black",
};

const Resume = () => {
	return (
		<div style={timelineContainerStyle}>
			<div style={dividerStyle}></div>
			{data.map(({ date, title, content }, i) => {
				return (
					<React.Fragment key={`resume-item-${i}`}>
						<div style={dateStyle} className={"resume-date"}>
							{date}
						</div>
						<div style={{ ...detailsStyle, ...(i === 0 && redDetail) }}>
							<div style={titleStyle}>{title}</div>
							{content && <div style={contentStyle}>{content}</div>}
						</div>
					</React.Fragment>
				);
			})}
		</div>
	);
};

export default memo(Resume);
