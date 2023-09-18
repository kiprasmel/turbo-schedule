import React, { FC } from "react";
import { Router, Switch, Route } from "react-router-dom";

import "./App.css";

import CurrentLangContextProvider from "./components/currentLangContext/CurrentLangContextProvider";

/** pages */
import Landing from "./components/landing/Landing";
import { StudentSchedulePage } from "./components/studentSchedule/StudentSchedule";
import { Availability } from "./pages/availability/Availability";

/** misc */
import { history } from "./utils/history";

import { logCoolStuff } from "./utils/logCoolStuff";

logCoolStuff();

const App: FC = () => (
	<>
		<CurrentLangContextProvider>
			<div className="App">
				<div>
					<Router history={history}>
						<Switch>
							<Route exact path="/" component={Landing} />

							<Route exact path="/avail" component={Availability} />

							<Route path="/:participant" component={StudentSchedulePage} />

							{/* <Route exact path="/:studentName/:dayIndex" component={StudentSchedulePage} />
							<Route exact path="/:studentName/:dayIndex/:timeIndex" component={StudentSchedulePage} />
							<Route exact path="/:studentName/:dayIndex/\*" component={StudentSchedulePage} />
							<Route exact path="/:studentName/:dayIndex/:timeIndex/\*" component={StudentSchedulePage} /> */}
						</Switch>
					</Router>
				</div>
			</div>
		</CurrentLangContextProvider>
	</>
);

export default App;
