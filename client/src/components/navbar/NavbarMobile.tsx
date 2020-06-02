/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

import React, { useEffect, useRef, useCallback, forwardRef } from "react";
// import { Link } from "react-router-dom";
import { css } from "emotion";
import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";
import { TweenMax } from "gsap";

import { useTranslation } from "i18n/useTranslation";
import { Divider } from "components/studentSchedule/Divider";
import { Link } from "react-router-dom";
import { NavbarLinks } from "./Navbar";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as More } from "../../assets/more.svg";
import { LangSelect } from "./LangSelect";

const menuMachine = createMachine({
	id: "menu",
	initial: "closed",
	states: {
		closed: {
			on: {
				OPEN: "opening",
			},
		},
		opening: {
			invoke: {
				src: "openMenu",
				onDone: { target: "open" },
			},
			on: {
				CLOSE: "closing",
			},
		},
		open: {
			on: {
				CLOSE: "closing",
			},
		},
		closing: {
			invoke: {
				src: "closeMenu",
				onDone: { target: "closed" },
			},
			on: {
				OPEN: "opening",
			},
		},
	},
});

/** TODO FIXME no scrolling behind the scenes */
// export const NavbarMobile: FC<{ SearchElement?: JSX.Element }> = ({ SearchElement }) => {
export const NavbarMobile = forwardRef<HTMLElement, { SearchElement?: JSX.Element }>(({ SearchElement }, ref) => {
	const t = useTranslation();

	const menuElementRef = useRef<HTMLElement>(null);

	/** make sure we're getting the latest ref etc. -- much like `useEffect`, but for a function/callback */
	const openMenu = useCallback(
		() =>
			new Promise((resolve) => {
				TweenMax.to(menuElementRef.current, 0.3, {
					y: 0,
					onComplete: resolve,
				});
			}),
		[menuElementRef]
	);

	/** make sure we're getting the latest ref etc. -- much like `useEffect`, but for a function/callback */
	const closeMenu = useCallback(
		() =>
			new Promise((resolve) => {
				TweenMax.to(menuElementRef.current, 0.3, {
					y: "-100%",
					onComplete: resolve,
				});
			}),
		[menuElementRef]
	);

	const [menuState, sendMenuState] = useMachine(menuMachine, {
		services: {
			openMenu,
			closeMenu,
		},
	});

	useEffect(() => {
		console.log("menuState", menuState);
	}, [menuState]);

	const isOpenOrOpening: boolean = menuState.matches("open") || menuState.matches("opening");
	const nextMenuEvent = isOpenOrOpening ? "CLOSE" : "OPEN";

	return (
		<nav ref={ref} className={css``}>
			<div
				className={css`
					position: ${isOpenOrOpening ? "fixed" : "relative"};
					z-index: 110;

					top: 0;
					left: 0;
					padding: 0 2rem;

					width: 100%;

					display: flex;
					flex-direction: row;

					align-items: center;
					justify-content: space-between;
				`}
			>
				<h1 className={css``}>
					<Link
						to="/"
						className={css`
							display: inline-block;
							/* padding-left: ${menuState.matches("open") || menuState.matches("opening") ? "5rem" : "0"}; */
						`}
					>
						<Logo />
					</Link>
				</h1>

				{SearchElement}

				<div className={css``}>
					<button
						type="button"
						onClick={(_e) => sendMenuState(nextMenuEvent)}
						className={css`
							/* position: absolute; */
							/* z-index: 110; */

							/* top: calc(2.25rem - var(--padding));
							right: calc(2.5rem - var(--padding)); */
							/* right: 0; */
						`}
					>
						<More className={css``} />
					</button>
				</div>
			</div>

			<nav
				ref={menuElementRef}
				className={css`
					position: fixed;
					top: 0;
					left: 0;
					transform: translateY(-100%);

					width: 100vw;
					height: 100vh;
					margin: 0;

					z-index: 100;

					/* --- */

					padding-top: 2em;
					background-color: hsl(240, 35%, 60%);

					display: flex;
					flex-direction: column;
				`}
			>
				<section
					className={css`
						margin-top: 3rem;
						flex: 1;
					`}
				>
					<ul
						className={css`
							/** all but first <li> */
							& > * + * {
								margin-top: 1rem;
							}

							/** all <a>  */
							& > * > * {
								background-color: hsl(240, 37%, 54%);
								color: hsl(240, 100%, 95%) !important;

								display: inline-block;
								width: 100%;
								padding: 1rem 0;
							}
						`}
					>
						<li
							className={css`
								text-align: center;
							`}
						>
							<LangSelect />
						</li>

						<Divider
							className={css`
								height: 3px;
								background-color: hsl(240, 37%, 54%);
							`}
						/>

						<NavbarLinks />
					</ul>

					<ul>
						<li
							className={css`
								& > * {
									display: inline-block;
									width: 100%;
									padding: 1rem auto;
								}
							`}
						/>
					</ul>
				</section>

				<footer
					className={css`
						margin-bottom: 2rem;
					`}
				>
					<span dangerouslySetInnerHTML={{ __html: t("Made with love by (__html)") }} />{" "}
					<a
						href="https://kipras.org"
						className={css`
							font-weight: 700;
						`}
					>
						<span
							className={css`
								background-color: hsl(240, 37%, 54%);
								color: hsl(240, 100%, 95%);

								padding: 0.5rem 1rem;

								border-radius: 2px;
							`}
						>
							Kipras
						</span>
					</a>
				</footer>
			</nav>
		</nav>
	);
});
