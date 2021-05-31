import React, {useEffect, useState} from "react";
import '../Styles/homePage.css';
import axios from 'axios';



function FilterButton (props){
    const [sport, setSport] = useState('soccer');
    const [location, setLocation] = useState('hitch');

    let handleSubmit = async (event) => {
        event.preventDefault();

        const filter = {
            sport: sport,
            location: location
        };
        try {
            await axios.get(`http://localhost:3001/api/events/filter`, filter)
                .then(response => {
                    const allEvents = response.data;
                    this.props.data.setState({allEvents});
                })
        }
        catch(err) {
            console.error(err);
        }
    }
       return (
                  /* <button className={'filterButton'}>
                       FILTER▽
                   </button> */

           <form onSubmit={handleSubmit}>
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
               {" "}
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
               <input type="submit" value="Filter" className="submitter"/>
               </form>

       )
   }


export default FilterButton;