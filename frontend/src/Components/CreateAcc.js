import React, {Component} from "react";
import "./CreateAcc.css"

class CreateAcc extends Component {
    constructor(props){
        super(props);
        this.state = {username: '', password: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.username);
        alert('A password was submitted: ' + this.state.password);
        event.preventDefault();
    }

    render() {
        return (
            <form className="group" onSubmit={this.handleSubmit}>
                <h3 className="signUp">Sign Up</h3>

                <div className="username">
                    <label>Username</label>
                    <input type="text" username={this.state.value} onChange={this.handleChange} className="userEntry" placeholder="Username" />
                </div>

                <div className="password">
                    <label>Password</label>
                    <input type="password" password={this.state.value} onChange={this.handleChange} className="passEntry" placeholder="Enter password" />
                </div>

                <button type="submit" className="button">Sign Up</button>
            </form>
        );
    }
}

export default CreateAcc;