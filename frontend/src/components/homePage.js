import React, {useEffect, useState} from "react";
import '../Styles/homePage.css';
import axios from 'axios';
/*import {Link} from 'react-router-dom';*/


class HomePage extends React.Component
{
    state = { allEvents : []}

    componentDidMount() {
        axios.get(`http://localhost:3001/api/events/`)
            .then(response => {
                const allEvents = response.data;
                this.setState({ allEvents });
            })
    }

    render()
    {
        return (
<body className={'background'}>
            <div className={'filterBorder'} >
                <div>
                    <button className={'filterButton'}>
                        FILTER▽
                    </button>
                    <div style={{padding: '16px'}}>

                        { this.state.allEvents.reverse().map(post=> <ul class ="posts"> <h1 class ="postTitle"> {post.sport} {" "} @
                       {post.location}  </h1>
                           <h1 className={"date"}> 00/00/00 9:00</h1> <h1 style={{float: "top"}}> <ul className={"attendees"}> Attendees: {post.attendees} <ul>{'----------------'}<ul>
                            </ul><button className='rsvpButton'> RSVP</button>
                           </ul>
                           </ul> </h1> <hr/> <h3 className={"description"}> This is test of the description property testing1234567</h3>
                         </ul>)}

                    </div>

                </div>

            </div>

</body>


        )
    }
}

export default HomePage;