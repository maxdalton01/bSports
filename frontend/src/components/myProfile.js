import axios from 'axios'
import { useEffect, useState } from 'react';
import './myProfile.css'
function MyProfile (props) {
    const [user, changeUserInfo] = useState(sessionStorage.getItem('loggedinid'))
    useEffect (() => {
        axios.get('http://localhost:3001/api/user/' + sessionStorage.getItem('loggedinid'))     //calls route that returns name and rating
            .then(res => {
                changeUserInfo(res.data)
            })
            .catch(err => {
                alert("User not found shouldn't be here")
            });
    },[changeUserInfo])
    return (
        <body>
            <h1 className = 'info'>Name: {sessionStorage.getItem('username')}</h1>
            {/*<h1>Rating: {user.rating}</h1>*/}
        </body>
    ); 
}
export default MyProfile