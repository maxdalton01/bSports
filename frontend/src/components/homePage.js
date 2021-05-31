import React from "react";
import '../Styles/homePage.css';
import axios from 'axios';
import date from 'date-and-time';

/*import {Link} from 'react-router-dom';*/


class HomePage extends React.Component {
    state = {allEvents: []};





    componentDidMount() {
        axios.get(`http://localhost:3001/api/events/`)
            .then(response => {
                const allEvents = response.data;
                this.setState({allEvents});
            })
    }
        handleRSVP = async(RSVP)=>
        {
            try {

                const url = `http://localhost:3001/api/events/` + RSVP.currentTarget.id;
                await axios.put(url)
                    .then(response => {
                        console.log("worked!")
                    })
                await axios.get (`http://localhost:3001/api/events/`)
                    .then(response => {
                        const allEvents = response.data;
                        this.setState({allEvents});
                    })
            }
            catch(err)
            {
                console.error(err);
            }
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
                           <h1 className={"date"}> {date.format(new Date(post.date), 'ddd hh:mm A, MMM DD YYYY')}</h1> <h1 style={{float: "top"}}> <ul className={"attendees"}> Attendees: {post.attendees} <ul>{'----------------'}<ul>
                            </ul><button id = {post._id} className='rsvpButton' onClick={this.handleRSVP}> RSVP</button>
                           </ul>
                           </ul> </h1> <hr/> <h3 className={"description"}> {post.description} </h3>
                         </ul>)}

                    </div>

                </div>

            </div>

</body>


        )
    }
}

export default HomePage;