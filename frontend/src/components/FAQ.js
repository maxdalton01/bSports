import React from 'react';
import "./FAQ.css";
import field from "./field.png";
import axios from 'axios';

class FAQ extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allQuestions: [],
            question:"",
            response:"No response yet",
            like: 0,
            editClicked: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleQuestion = this.handleQuestion.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
    }

    // get all the questions when FAQ component called
    componentDidMount() {
        this.getAllQuestions();
    }

    // get all the questions from the back end, store in array
    getAllQuestions = () => {
        axios.get(`http://localhost:3001/api/FAQ/`)
            .then(response => {
                const Questions = response.data;
                this.setState({allQuestions: Questions});
            })
            .catch(() => {
                alert("Unable to retrieve questions.")
            })
    }

    // setting question to input value
    handleQuestion(event) {
        this.setState({question: event.target.value});
    }

    // setting questions to input value, not implemented yet
    handleResponse(event) {
        this.setState({response: event.target.value});
    }

    // when submit hit, send the question to the back end
    handleSubmit = (event) => {
        try {
            event.preventDefault();

            const quest = {
                question: this.state.question,
                response: this.state.response,
            }

            axios.post(`http://localhost:3001/api/FAQ/`, quest)
                .then(res => {
                    console.log(res);
                    // calls getAllQuestions to update question array
                    this.getAllQuestions();
                    this.handleClearing();
                    this.setState({question: ""});
                })

        }
        catch(err)
        {
            console.error(err);
        }
    }

    handleLike = (thisQuestion) => {
        try {
            const url = `http://localhost:3001/api/FAQ/` + thisQuestion.currentTarget.id;

            axios.put(url)
                .then(res => {
                    console.log(res);
                    this.getAllQuestions();
                })
        }
        catch(err) {
            console.error(err)
        }
    }

    // display all the questions
    displayQuestions = (allQuestions) => {
        // if there are no questions, return null
        if (!allQuestions.length) return null;

        // map through all the questions, creating a div for each one
        return allQuestions.map((post, index) => (
            <div key={index} className="question-box">
                <h3 className="question-title">{post.question}</h3>
                {//<p className="response">{post.response}</p>
            }
                { 
                // possible method for an edit button but should check by json id
                    !this.state.editClicked ? (
                        <p className="response">{post.response}</p>
                    ) : (
                        <div className="editResponse"><input type="text" className="form-control" value={this.state.value} onChange={this.handleResponse} placeholder="response" /></div>
                    )
                }
                <ul className="like-count">
                    {post.like} &ensp;
                    <button id = {post._id} className="likeButton" onClick={this.handleLike}>like</button>
                    {
                        !this.state.editClicked ? (
                            <button className="editButton" onClick={() => {this.setState({editClicked: !this.state.editClicked});}}>Edit Response</button>
                        ) : (
                            <button className="editButton" onClick={() => {this.setState({editClicked: !this.state.editClicked});}}>Save</button>
                        )
                    }
                </ul>
            </div>
        ))
    }

    // handles clearing the question input box text
    handleClearing = () => {
        // find the first 'input' type and clear input
        document.querySelector('input').value = "";
    }
    
    render() {
        return (
            <div className="header">  
                <div className="topImage">
                    <img src={field} />
                </div>
                <h1>Frequently Asked Questions</h1>
                <li className="questions">
                        What is your name?
                        <div className="answers">
                            Ruben
                        </div>
                </li>
                <li className="questions">
                        What is hello world?
                        <div className="answers">
                            Everyone's first line of code involved the phrase "Hello World"
                        </div>
                </li>
                <li className="questions">
                        Hola, me llamo Ruben.
                        <div className="answers">
                            Hola Ruben
                        </div>
                </li>
                <li className="questions">
                        What kind of questions would people have?
                        <div className="answers">
                            What locations can I list my event at?
                        </div>
                </li>
                <form onSubmit={this.handleSubmit}>
                    <h3>Ask Your Own Question</h3>

                    <div className="submitQuestion">
                        <input type="text" value={this.state.value} onChange={this.handleQuestion} className="form-control" placeholder="Question" />
                    </div>

                    <button type="submit" value="Submit" className="submitButton">Submit</button>

                </form>

                <div className="questions-list">
                    {this.displayQuestions(this.state.allQuestions)}
                </div>
            </div>
        )
    }
    }

export default FAQ