import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import Head from "next/head";

import Header, { Pages } from "../components/header";
import Background from "../components/background";
import ScrollContainer from "../components/scrollContainer";

import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

const stateMap: {
	[state in Pages]: (x: number, y: number, isMobile: boolean) => boolean;
} = {
	"/": (x, y, isMobile) =>
		isMobile ? y < 0.15 || y > 0.8 : Math.abs(x - 0.5) - 0.4 * y > 0.15,
	resume: (x, y, isMobile) => (isMobile ? false : x < 0.17 || x > 0.83),
	projects: (x, y, isMobile) => (isMobile ? false : x < 0.17 || x > 0.83),
	contact: (x, y, isMobile) =>
		isMobile
			? y > 0.6
			: x < 0.17 || x > 0.83 || y + (x - 0.5) * (x - 0.5) > 0.75,
};

const buttonMap: {
	[state in Pages]?: { buttonText: string; url?: string };
} = {
	resume: {
		buttonText: "View PDF",
		url: "/Pringle_Adrien_Resume_22_External.pdf",
	},
};

const getPage = (pathname: string) => {
	const path = pathname.substring(1) || "/";
	return path in stateMap ? (path as Pages) : "/";
};

function MyApp({ Component, pageProps }: AppProps) {
	const [windowWidth, setWindowWidth] = useState(480);
	const [windowHeight, setWindowHeight] = useState(480);
	const router = useRouter();
	const page = getPage(router.pathname);

	useEffect(() => {
		function updateSize() {
			setWindowWidth(window.innerWidth);
			setWindowHeight(window.innerHeight);
		}
		window.addEventListener("resize", updateSize);
		updateSize();
		return () => window.removeEventListener("resize", updateSize);
	}, []);

	return (
		<div className={styles.container}>
			<Head>
				<title>Adrien Pringle</title>
				<meta
					property="og:image"
					content="https://avatars0.githubusercontent.com/u/30927609?s=400&amp;u=fab1151adc71c5449a54a67f019a71069ce84892&amp;v=4"
				/>
				<meta property="og:type" content="profile" />
				<meta property="og:title" content="Adrien Pringle" />
				<meta property="og:url" content="https://apringle.dev" />
				<meta
					property="og:description"
					content="Software Dev | Computer Engineering @ UWaterloo | cargo short connoisseur"
				/>
				<meta
					name="description"
					content="Software Dev | Computer Engineering @ UWaterloo | cargo short connoisseur"
				/>

				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link rel="icon" href="/favicon.ico" />
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="theme-color" content="#ffffff"></meta>

				<link rel="preconnect" href="https://fonts.googleapis.com"></link>
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="true"
				></link>
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Josefin+Sans&family=Josefin+Slab&display=swap"
					rel="stylesheet"
				></link>
			</Head>

			<main className={styles.main}>
				<ScrollContainer visible={page !== "/"} {...buttonMap[page]}>
					<Background<Pages>
						stateMap={stateMap}
						state={page}
						windowWidth={windowWidth}
						windowHeight={windowHeight}
					/>
					<Header page={page} windowWidth={windowWidth} />
					<Component {...pageProps} />
				</ScrollContainer>
			</main>
		</div>
	);
}

export default MyApp;
