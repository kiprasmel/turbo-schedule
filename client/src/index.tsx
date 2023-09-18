import React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import ReactDOM from "react-dom/client";

import "./index.css";
import "./styles/_reset.css";
import "./styles/_default.css";
import "./styles/_button.css";
import "./styles/_material-icons.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
