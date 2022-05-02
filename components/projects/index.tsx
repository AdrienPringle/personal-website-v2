import { CSSProperties, memo } from "react";

import Card from "./card";

import data from "./data";

const cardContainerStyle: CSSProperties = {
	display: "grid",
	gridTemplateColumns: "repeat(auto-fit, 18rem)",
	justifyContent: "center",
	justifyItems: "center",
};

const Projects = () => {
	return (
		<div style={cardContainerStyle}>
			{data.map((project, i) => (
				<Card key={`project-card-${i}`} data={project} />
			))}
		</div>
	);
};

export default memo(Projects);
