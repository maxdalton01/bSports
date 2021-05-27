import React, {Component} from "react";
//import axios from 'axios';
import {Link} from 'react-router-dom';


class login extends Component {
    constructor(props){
	super(props);
	this.state = {username: '', password: ''};
	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleUsername = this.handleUsername.bind(this);
	this.handlePassword = this.handlePassword.bind(this);
    };
	
	handleUsername(event) {

	    this.setState({username: event.target.value});
	}
	
	handlePassword(event) {
		this.setState({password: event.target.value});
	}
	
	handleSubmit(event) {
		alert('A name was submitted: ' + this.state.username);
		alert('A password was submitted: ' + this.state.password);
		event.preventDefault();

	}

	render() {
        return (
            <form className="group" onSubmit={this.handleSubmit}>
                <h3 className="signUp">Welcome Back</h3>

                <div className="username">
                    <label>Username</label>
                    <input type="text" username={this.state.username} onChange={this.handleUsername} className="userEntry" placeholder="Username" />
                </div>

                <div className="password">
                    <label>Password</label>
                    <input type="password" password={this.state.password} onChange={this.handlePassword} className="passEntry" placeholder="Enter password" />
                </div>

                <button type="submit" value="Submit" className="button">Log in</button>
                <p className="alreadyReg">
                    New to bSports? &ensp;   
                    <Link to='/Profile'>
                        <a>Create an Account</a>
                    </Link>
                </p>
            </form>
        );
    }
}

export default login;
