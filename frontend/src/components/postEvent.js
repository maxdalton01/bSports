import React, {Component} from "react";
import axios from 'axios';
// import "./postEvent.css";

class PostEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sport: 'soccer',
            location: 'hitch'
        };
        
        this.handleSportChange = this.handleSportChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSportChange(event) {
        this.setState({sport: event.target.value});
    }

    handleLocationChange(event) {
        this.setState({location: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        alert("Sport submitted: " + this.state.sport);
        alert("Location submitted: " + this.state.location);

        const post = {
            sport: this.state.sport,
            location: this.state.location
        };

        axios.post(`http://localhost:3001/api/events/`, post)
          .then(res => {
              console.log(res);
          })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label >
                    Sport:
                    <select location={this.state.sport} onChange={this.handleSportChange}>
                        <option value="soccer">Soccer</option>
                        <option value="basketball">Basketball</option>
                        <option value="baseball">Baseball</option>
                        <option value="football">Football</option>
                        <option value="volleyball">Volleyball</option>
                        <option value="tennis">Tennis</option>
                    </select>
                </label>
                
                <label>
                    Location:
                    <select location={this.state.location} onChange={this.handleLocationChange}>
                        <option value="hitch">Hitch Courts</option>
                        <option value="imfields">IM Fields</option>
                        <option value="drake">Drake Stadium</option>
                        <option value="sunsertrec">Sunset Rec</option>
                        <option value="wooden">John Wooden Center</option>
                    </select>
                    <input type="submit" value="Submit" />
                </label>
                
            </form>
        );
    }
}

export default PostEvent;