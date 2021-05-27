// client/src/App.js

import React from "react";
import ToolBar from './components/toolBar';
import HomePage from "./components/homePage";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CreateAcc from "./components/CreateAcc";
import PostEvent from "./components/postEvent";
import FAQ from "./components/FAQ";
function App() {
	return(
		<BrowserRouter>
			<ToolBar/>
			<Switch>
			    <Route path = "/FAQ" exact component = {FAQ}/>
				<Route path = "/" exact component={HomePage} />
				<Route path = "/logout" exact/>
				<Route path = "/Profile" exact component = {CreateAcc}/>
				<Route path = "/Post" exact component={PostEvent} />
			</Switch>
		</BrowserRouter>
	)

}

export default App;
