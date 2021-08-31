import React, { FC } from "react";
import { Router, Switch, Route } from "react-router-dom";

import "./App.scss";

import { SchedulePageDesktop } from "./components/studentSchedule/SchedulePageDesktop";
import CurrentLangContextProvider from "./components/currentLangContext/CurrentLangContextProvider";
import { CurrentYearCtxProvider } from "./pages/archive/currentYearContext";

/** pages */
import Landing from "./components/landing/Landing";
import StudentSchedule from "./components/studentSchedule/StudentSchedule";
import { Availability } from "./pages/availability/Availability";
import { Archive } from "./pages/archive/Archive";

/** misc */
import { history } from "./utils/history";

import { logCoolStuff } from "./utils/logCoolStuff";

logCoolStuff();

const App: FC = () => (
	<>
		<CurrentLangContextProvider>
			<CurrentYearCtxProvider>
				<div className="App">
					<div>
						<Router history={history}>
							<Switch>
								<Route exact path="/" component={Landing} />

								<Route exact path="/avail" component={Availability} />

								<Route exact path="/archive" component={Archive} />

								<Route exact path="/:studentName" component={StudentSchedule} />
								<Route exact path="/:studentName/:dayIndex" component={StudentSchedule} />
								<Route exact path="/:studentName/:dayIndex/:timeIndex" component={StudentSchedule} />
								<Route exact path="/:studentName/:dayIndex/\*" component={StudentSchedule} />
								<Route exact path="/:studentName/:dayIndex/:timeIndex/\*" component={StudentSchedule} />

								{/* BACKWARDS-COMPATIBILITY -- REMOVE LATER */}
								<Route exact path="/student/:studentName" component={StudentSchedule} />

								<Route exact path="/new/:participantHandle" component={SchedulePageDesktop} />
							</Switch>
						</Router>
					</div>
				</div>
			</CurrentYearCtxProvider>
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

export default App;
