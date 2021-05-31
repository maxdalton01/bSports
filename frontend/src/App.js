// client/src/App.js

import React from "react";
import ToolBar from './components/toolBar';
import HomePage from "./components/homePage";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CreateAcc from "./components/CreateAcc";
import PostEvent from "./components/postEvent";
import FAQ from "./components/FAQ";
import Login from "./components/login";

sessionStorage.setItem('loggedinid', "");					//value is userid once logged in


  function PrivRoute({ component: Component, ...rest }) {		//if there is no session id redirect back to login page
	return (
	  <Route
		{...rest}
		render={props => (
		  sessionStorage.getItem('loggedinid') ?
			<Component {...props} />
				: <Redirect to = '/Login' />
		)}
	  />
	);
  }
  

function App() {
	return(
		<BrowserRouter>
			<ToolBar/>
			<Switch>
			    <PrivRoute path = "/FAQ" exact component = {FAQ} />
				<PrivRoute path = "/" exact component={HomePage} />
				<PrivRoute path = "/logout" exact/>
				<Route path = "/Profile" exact component = {CreateAcc}/>
				<PrivRoute path = "/Post" exact component={PostEvent} />
				<Route path = "/Login" exact component={Login}/>
			</Switch>
		</BrowserRouter>
	)

}

export default App;
