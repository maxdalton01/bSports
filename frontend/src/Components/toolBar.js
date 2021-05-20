import React from "react";
import '../Styles/toolBar.css';
import {Link} from 'react-router-dom';

function ToolBar ()
{
    return (
        <div className={'outsideButtonsContainer'} style={{background: 'black'}}>
            <Link to='/post'>
                <a className={'outsideButtons'} href="">POST✓</a>
            </Link>
            <Link to='/'>
                <a className={'outsideButtons'} href=""> HOME </a>
            </Link>
            <Link to='/FAQ'>
                <a className={'outsideButtons'} href=""> FAQ/CONTACT </a>
            </Link>
        <div className={'toolBar'}>
            <button className="dropDown">ACCOUNT▽</button>
            <nav className={'container'}>
                <Link to='/Profile'>
                    <a  className={'toolBarButtons'} href="">My Profile</a>
                </Link>
                <Link to='/logout'>
                    <a  className={'toolBarButtons'} href="">Log Out</a>
                </Link>
            </nav>

        </div>
        </div>

    )
}



export default ToolBar;