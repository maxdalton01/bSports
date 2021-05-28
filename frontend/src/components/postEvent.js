import React, {useState} from "react";
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import "./postEvent.css";
import { useHistory } from 'react-router-dom';

function PostEvent (props) {
    const [sport, setSport] = useState('soccer');
    const [location, setLocation] = useState('hitch');
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState('');

    let history = useHistory(); // component used for redirecting

    
    let handleSubmit = (event) => {
        event.preventDefault();

        const post = {
            sport: sport,
            location: location,
            date: date,
            description: description
        };

        axios.post(`http://localhost:3001/api/events/`, post)
          .then(res => {
              console.log(res);
              history.push('/'); // this is equivalent to saying "redirect to homepage"
          })

    }

    return (
        <body>
            <form onSubmit={handleSubmit}>
                <h3>Post a Pickup Game</h3> 
                <label >
                    Description:
                    <br />
                    <textarea type="text" value={description} onChange={(evt) => setDescription(evt.target.value)} 
                        className="textField" placeholder="Describe event here"
                    />
                </label>
                <br />
                <label >
                    Sport:
                    <select sport={sport} onChange={(evt) => setSport(evt.target.value)} className="dropDowns">
                        <option  selected disabled>Pick a sport</option>
                        <option value="soccer">Soccer</option>
                        <option value="basketball">Basketball</option>
                        <option value="baseball">Baseball</option>
                        <option value="football">Football</option>
                        <option value="volleyball">Volleyball</option>
                        <option value="tennis">Tennis</option>
                    </select>
                </label>
                <br />
                <label>
                    Location:
                    <select location={location} onChange={(evt) => setLocation(evt.target.value)} className="dropDowns">
                        <option selected disabled>Pick a location</option>
                        <option value="hitch">Hitch Courts</option>
                        <option value="imfields">IM Fields</option>
                        <option value="drake">Drake Stadium</option>
                        <option value="sunsetrec">Sunset Rec</option>
                        <option value="wooden">John Wooden Center</option>
                    </select>   
                </label>
                <br />
                    <div>
                        <DateTimePicker date={date} onChange={setDate} disableCalendar={true} disableClock={true}
                            clearIcon={null} yearPlaceholder={"yyyy"} monthPlaceholder={"mm"} minutePlaceholder={"mm"}
                            hourPlaceholder={"hh"} dayPlaceholder={"dd"}
                        />
                    </div>
                <br />
                <input type="submit" value="Submit" className="submitter"/>
            </form>
        </body>
    );
}

export default PostEvent;