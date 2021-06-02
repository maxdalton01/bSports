import React from "react";
import '../Styles/homePage.css';
import axios from 'axios';
import date from 'date-and-time';


/*import {Link} from 'react-router-dom';*/


class HomePage extends React.Component {
   /* state = {allEvents: [],
        sportsFilter: "soccer",
        locationFilter: "hitch"};*/
    constructor(props) {
        super(props);
        this.state = {allEvents: [], sportFilter:null, locationFilter: null, submitterValue: "Filter"
        , submitterBackground: '#2D68C4', submitterColor: "white"};

        this.handleSport = this.handleSport.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLocation = this.handleLocation.bind(this);
    }
    getAllEvents = async() =>
    {
        try {
            await axios.get(`http://localhost:3001/api/events/`)
                .then(response => {
                    const allEvents = response.data;
                    const now = new Date();
                    let eventDate;
                    for(let i = 0; i < allEvents.length;i++)
                    {
                        eventDate = new Date(allEvents[i].date);
                        if(eventDate < now)
                        {
                            const url = `http://localhost:3001/api/events/`+ allEvents[i]._id;
                            axios.delete(url);
                        }
                    }
                });
            await axios.get(`http://localhost:3001/api/events/`)
                .then(response => {
                    const allEvents = response.data;
                    console.log(allEvents)
                    this.setState({allEvents});
                })
        }
        catch(err)
        {
            console.error(err);
        }

    }
    componentDidMount() {
       /* axios.get(`http://localhost:3001/api/events/`)
            .then(response => {
                const allEvents = response.data;
                console.log(allEvents)
                this.setState({allEvents});
            }) */
        this.getAllEvents();
    }
        handleRSVP = async(RSVP)=>
        {
            try {
                const eventId = RSVP.currentTarget.id;
                const currentUser = sessionStorage.getItem('username');
                const filterInside = {
                  _id: eventId

                };
                const filter = {
                    filter: filterInside

                };
                let oneEvent;
                await axios.post(`http://localhost:3001/api/events/filter`, filter)
                    .then(response => {
                        oneEvent = response.data[0];
                        console.log(oneEvent)
                    });
                const attendeeList = oneEvent.listAttendees;
                const url = `http://localhost:3001/api/events/` + eventId + '/' + currentUser;

                if(!attendeeList.includes(currentUser) && oneEvent.wantedAttendees >= oneEvent.attendees)
                {
                    await axios.put(url)
                        .then(response => {
                            console.log("worked!")
                        })
                    /*await axios.get(`http://localhost:3001/api/events/`)
                        .then(response => {
                            const allEvents = response.data;
                            this.setState({allEvents: allEvents});
                        })*/
                    await this.getAllEvents();
                }
            }
            catch(err)
            {
                console.error(err);
            }
        }

        handleSport(event) {
            this.setState({sportFilter: event.target.value});
        }
        handleLocation(event) {
        this.setState({locationFilter: event.target.value});
    }

      handleSubmit = async (event) => {
        if(this.state.sportFilter == null || this.state.locationFilter == null)
        {
            return
        }

        try {
            event.preventDefault();
            const filterInside = {
                sport: this.state.sportFilter,
                location: this.state.locationFilter
            }
            const filter = {
                filter: filterInside

            };
            console.log("success3")
            await axios.post(`http://localhost:3001/api/events/filter`, filter)
                .then(response => {
                    const allEvents = response.data;
                    this.setState({allEvents: allEvents, sportFilter: null, locationFilter: null, submitterValue:"CLEAR FILTER ✖",
                        submitterBackground: '#D3D3D3', submitterColor: "black"});
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
                    <form onSubmit={this.handleSubmit}>
                        <label >
                            Sport:
                            <select value={this.state.value} onChange={this.handleSport} className="dropDowns">
                                <option  selected disabled>Pick a sport</option>
                                <option value="soccer">Soccer</option>
                                <option value="basketball">Basketball</option>
                                <option value="baseball">Baseball</option>
                                <option value="football">Football</option>
                                <option value="volleyball">Volleyball</option>
                                <option value="tennis">Tennis</option>
                            </select>
                        </label>
                        {" "}
                        <label>
                            Location:
                            <select value={this.state.value} onChange={this.handleLocation} className="dropDowns">
                                <option selected disabled>Pick a location</option>
                                <option value="hitch">Hitch Courts</option>
                                <option value="imfields">IM Fields</option>
                                <option value="drake">Drake Stadium</option>
                                <option value="sunsetrec">Sunset Rec</option>
                                <option value="wooden">John Wooden Center</option>
                            </select>
                        </label>
                        <input type="submit" value={this.state.submitterValue} style={{background: this.state.submitterBackground,
                        color: this.state.submitterColor}} className="submitter"/>
                    </form>

                    <div style={{padding: '16px'}}>

                        { this.state.allEvents.reverse().map(post=> <ul className="posts">
                            <div className="creatorTitle">Posted by u/{post.creator} </div>
                            <h1 className="postTitle"> {" "}{post.sport} {" "} @
                       {post.location}  </h1>
                           <h1 className={"date"}> {date.format(new Date(post.date), 'ddd hh:mm A, MMM DD YYYY')}</h1> <h1 style={{float: "top"}}>
                            <ul className={"attendees"}> Attendees: {post.attendees}/{post.wantedAttendees} <ul>{'----------------'}<ul>
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