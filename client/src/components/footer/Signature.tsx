/**
 * Taken from `custom-voting-app`!
 */

import React from "react";

import "./Signature.scss";

const Signature = () => {
	return (
		<>
			<footer className="footer">
				Copyright &copy; 2019-{new Date().getFullYear()} open-sourcer'is
				<a href="https://kipras.org/" target="_blank">
					<span className="name">
						Kipras Melnikovas
						<span role="img" aria-label="pin">
							📌
						</span>
					</span>
				</a>
			</footer>
		</>
	);
};

export default Signature;
