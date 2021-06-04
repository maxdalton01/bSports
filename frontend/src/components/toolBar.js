import React, { useEffect, useState } from "react";
import '../Styles/toolBar.css';
import {Link} from 'react-router-dom';
import logo from "./uclalogo.png";
//used react router to link everything
let dropdown = <nav className={'container'}>
<Link to='/login'>
    <a  className={'toolBarButtons'} href="">My Profile</a>
</Link>
<Link to='/logout'>
    <a  className={'toolBarButtons'} >Log Out</a>
</Link>
</nav> 

function ToolBar ()
{
    return (
        <div className={'test'}>
        <div className={'outsideButtonsContainer'} style={{background: '#2D68C4'}}>
            <Link to='/post'>
                <a className={'outsideButtons'} >POST✓</a>
            </Link>
            <Link to='/'>
                <a className={'outsideButtons'} > HOME </a>
            </Link>
            <Link to='/FAQ'>
                <a className={'outsideButtons'} > FAQ/CONTACT </a>
            </Link>
        <div className="logo">
            <img src={logo} className="logoImage"/>
        </div>
        
        <div className={'toolBar'}>
            <button className="dropDown">ACCOUNT▽</button>
            <nav className={'container'}>
                {/*change link later*/}
                <Link to='/user'>
                    <a  className={'toolBarButtons'} >My Profile</a>
                </Link>
                <Link to='/logout'>
                    <a  className={'toolBarButtons'} >Log Out</a>
                </Link>
            </nav>
        </div>
        </div>
        </div>

    )
}



export default ToolBar;