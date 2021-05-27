import React from "react";
import '../Styles/toolBar.css';
import {Link} from 'react-router-dom';

function ToolBar ()
{
    return (
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
        <div className={'toolBar'}>
            <button className="dropDown">ACCOUNT▽</button>
            <nav className={'container'}>
                <Link to='/Profile'>
                    <a  className={'toolBarButtons'} >My Profile</a>
                </Link>
                <Link to='/logout'>
                    <a  className={'toolBarButtons'} >Log Out</a>
                </Link>
            </nav>

        </div>
        </div>

    )
}



export default ToolBar;