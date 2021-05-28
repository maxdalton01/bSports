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

                        { this.state.allEvents.map(post=> <ul class ="posts"> Sport: {post.sport}, Location: {post.location},
                        Attendees: {post.attendees} <button class = 'rsvpButton'> RSVP</button> </ul>)}
                    </div>

                </div>

            </div>

</body>


        )
    }
}

export default HomePage;