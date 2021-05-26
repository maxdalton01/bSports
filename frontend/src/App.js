// client/src/App.js

import React from "react";
import ToolBar from './Components/toolBar';
import homePage from "./Components/homePage";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CreateAcc from "./Components/CreateAcc";
import FAQ from "./Components/FAQ";
function App() {
	return(
		<BrowserRouter>
			<ToolBar/>
			<Switch>
			    <Route path = "/FAQ" exact component = {FAQ}/>
				<Route path = "/" exact component={homePage} />
				<Route path = "/logout" exact/>
				<Route path = "/Profile" exact component = {CreateAcc}/>
				<Route path = "/Post" exact />
			</Switch>
		</BrowserRouter>
	)
}

export default App;
