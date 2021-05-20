// client/src/App.js

import React from "react";
import ToolBar from './Components/toolBar';
import homePage from "./Components/homePage";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
	return(
		<BrowserRouter>
			<ToolBar/>
			<Switch>
			    <Route path = "/FAQ" exact />
				<Route path = "/" exact component={homePage} />
				<Route path = "/logout" exact/>
				<Route path = "/Profile" exact/>
				<Route path = "/Post" exact />
			</Switch>
		</BrowserRouter>
	)
}

export default App;
