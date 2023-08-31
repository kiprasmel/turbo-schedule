import React, { FC } from "react";
import { Router, Switch, Route } from "react-router-dom";

import "./App.css";

import CurrentLangContextProvider from "./components/currentLangContext/CurrentLangContextProvider";

/** pages */
import { Landing } from "./pages/landing/Landing";
import SchoolLanding from "./components/school-landing/SchoolLanding";
import { StudentSchedulePage } from "./components/studentSchedule/StudentSchedule";
import { Availability } from "./pages/availability/Availability";
import { Statistics } from "./pages/statistics/Statistics";

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

							<Route exact path="/:school/" component={SchoolLanding} />
							<Route exact path="/:school/avail" component={Availability} />
							<Route exact path="/:school/stats" component={Statistics} />
							<Route path="/:school/:participant" component={StudentSchedulePage} />
						</Switch>
					</Router>
				</div>
			</div>
		</CurrentLangContextProvider>
	</>
);

export default App;
