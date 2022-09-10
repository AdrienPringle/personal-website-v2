import { CSSProperties, memo } from "react";
import Image from "next/image";

import data from "./data";

const contactsContainerStyle: CSSProperties = {
	width: "100%",
	display: "flex",
	justifyContent: "center",
	alignItems: "top",
};
const contactsTableStyle: CSSProperties = {
	display: "grid",
	// gridColumn: "4rem 1fr",
	gridTemplateColumns: "7rem 1fr",
	justifyContent: "center",
	alignItems: "center",

	marginBottom: "1rem",
};
const imageContainerStyle: CSSProperties = {
	gridColumn: 1,
	margin: "1rem 2rem 1rem 2rem",
};
const textContainerStyle: CSSProperties = {
	gridColumn: 2,
	fontSize: "1.5rem",
};

const Contact = () => {
	return (
		<div>
			<div style={contactsContainerStyle}>
				<div style={contactsTableStyle} className="contacts-table">
					{data.map(({ image, text, url }) => {
						const IconSvg = image;
						return (
							<>
								<div style={imageContainerStyle}>
									<IconSvg />
								</div>
								{url ? (
									<a href={url} style={textContainerStyle}>
										{text}
									</a>
								) : (
									<div style={textContainerStyle}>{text}</div>
								)}
							</>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default memo(Contact);
