import axios from "axios";
import React, {useState} from "react";
import "./CreateAcc.css"
import { useHistory } from 'react-router-dom';

function CreateAcc (props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let history = useHistory();

    let handleSubmit = (event) => {
        event.preventDefault();

        const user = {
            username: username,
            password: password
        };

        axios.post('http://localhost:3001/api/register/', user)
         .then(res => {
             //alert(res.data)
             if (!res.data) {
                 alert("Username already taken or not a valid username")
             }
             else {
                 sessionStorage.setItem('loggedinid',res.data.userid)
                 sessionStorage.setItem('username',res.data.username)
//                 alert("Successful register and logging now")
//                 alert(sessionStorage.getItem('loggedinid'))
                 history.push('/')
             }
         }) 
    }

    return (
        <body>
            <form className="group" onSubmit={handleSubmit}>
                <h3 className="signUp">Sign Up</h3>

                <div className="username">
                    <label>Username</label>
                    <input type="text" username={username} onChange={(evt) => setUsername(evt.target.value)} className="userEntry" placeholder="Username" />
                </div>

                <div className="password">
                    <label>Password</label>
                    <input type="password" password={password} onChange={(evt) => setPassword(evt.target.value)} className="passEntry" placeholder="Enter password" />
                </div>

                <button type="submit" value="Submit" className="button">Sign Up</button>
            </form>
        </body>
    );

}
export default CreateAcc;
