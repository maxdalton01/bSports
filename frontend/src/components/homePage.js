import React from "react";
import '../Styles/homePage.css';
/*import {Link} from 'react-router-dom';*/

function homePage()
{
    return (
        <div className={'filterBorder'}>
            <div>
                <button className={'filterButton'}>
                    FILTER▽
                </button>
            </div>
        </div>


    )
}

export default homePage;