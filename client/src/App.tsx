import React, { FC } from "react";
import { Router, Switch, Route } from "react-router-dom";

import "./App.scss";

import CurrentLangContextProvider from "./components/currentLangContext/CurrentLangContextProvider";

/** pages */
import Header from "./components/header/Header";
import Landing from "./components/landing/Landing";
import StudentSchedule from "./components/studentSchedule/StudentSchedule";
import Footer from "./components/footer/Footer";

/** misc */
import { history } from "./utils/history";

import { logCoolStuff } from "./utils/logCoolStuff";

logCoolStuff();

const App: FC = () => {
	return (
		<>
			<CurrentLangContextProvider>
				<div className="App">
					{/* wrap before footer */}
					<div style={{ minHeight: "100vh" }}>
						<Header />
						<Router history={history}>
							<Switch>
								<Route exact path="/" component={Landing} />
								<Route exact path="/:studentName" component={StudentSchedule} />

								{/* BACKWARDS-COMPATIBILITY -- REMOVE LATER */}
								<Route exact path="/student/:studentName" component={StudentSchedule} />
							</Switch>
						</Router>
					</div>

					<Footer />
				</div>
			</CurrentLangContextProvider>
		</>

		// <div className="App">
		// 	<Landing />

		// 	{/* <header className="App-header">
		// 		<img src={logo} className="App-logo" alt="logo" />
		// 		<p>
		// 			Edit <code>src/App.tsx</code> and save to reload.
		// 		</p>
		// 		<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
		// 			Learn React
		// 		</a>
		// 	</header> */}
		// </div>
	);
};

export default App;