import React, {Component, useState} from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function Logout (props) {
    let history = useHistory();
    sessionStorage.setItem('loggedinid', "");           //clear the stored ID and name saved by browser
    sessionStorage.setItem('username','');
    history.push('/');                                   //go back to homepage which redirects to login since logged out
    return null;
}

export default Logout