import React, {Component, useState} from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function Logout (props) {
    let history = useHistory();
    sessionStorage.setItem('loggedinid', "");
    sessionStorage.setItem('username','');
    history.push('/');
    return null;
}

export default Logout