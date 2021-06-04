import React, {useState} from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';


function Login (props) {
    // states hold the username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // This helps redirect after logging in
    let history = useHistory();

    // Submits a username and password to back end in format of json object
    let handleSubmit = (event) => {
        event.preventDefault();

        const user = {
            username: username,
            password: password
        };

        axios.post('http://localhost:3001/api/login', user)
        .then(res => {
            // we store the userID and the username to be used for frontend apps
            sessionStorage.setItem('loggedinid',res.data)
            sessionStorage.setItem('username', user.username)
            // redirect to home after log in
            history.push('/')
        }) 
        .catch(err => {
            alert("Wrong username or wrong password")
        });
    }

    return (
        <body>
            <form className="group" onSubmit={handleSubmit}>
                <h3 className="signUp">Welcome Back</h3>

                <div className="username">
                    <label>Username</label>
                    <input type="text" username={username} onChange={(evt) => setUsername(evt.target.value)} className="userEntry" placeholder="Username" />
                </div>

                <div className="password">
                    <label>Password</label>
                    <input type="password" password={password} onChange={(evt) => setPassword(evt.target.value)} className="passEntry" placeholder="Enter password" />
                </div>

                <button type="submit" value="Submit" className="button">Log in</button>
                <p className="alreadyReg">
                    New to bSports? &ensp;   
                    <Link to='/register'>
                        <a>Create an Account</a>
                    </Link>
                </p>
            </form>
        </body>
    );
}
export default Login;
