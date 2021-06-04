import React from 'react';
import "./FAQ.css";
import field from "./field.png";
import axios from 'axios';

class FAQ extends React.Component {
    // states will hold user input like the question and response
    // allQuestions holds the list of users who liked a question
    constructor(props) {
        super(props);
        this.state = {
            allQuestions: [],
            question:"",
            response:"No response yet",
            like: 0,
            editClicked: false,
            clickedCommentID:""
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
                    // calls handleClearing to empty input box
                    this.handleClearing();
                    this.setState({question: ""});
                })

        }
        catch(err)
        {
            console.error(err);
        }
    }

    // handles clearing the question input box text
    handleClearing = () => {
        // find the first 'input' type and clear input
        document.querySelector('input').value = "";
    }

    // updates the like count specific to the question/post's ID
    handleLike = async(thisQuestion) => {
        var likedList = [];
        const currentUser = sessionStorage.getItem('username');
        const url2 = `http://localhost:3001/api/FAQ/` + thisQuestion.currentTarget.id;
        const questionID = thisQuestion.currentTarget.id;
        // get the list of users who've liked a question
        await axios.get(url2)
            .then(res => {
                console.log(res.data);
                likedList = res.data.likeList;
            })
            .catch(() => {
                alert("Unable to retrieve liked list.")
            });
        // if no one has liked it, safe to let user like it
        if (likedList.length === 0 || likedList.includes[null])
        {
            try {
                const url = `http://localhost:3001/api/FAQ/` + questionID + `/` + currentUser;
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
        // check if the user's name is in the list, if not, update like
        else if (!likedList.includes(currentUser))
        {
            try {
                const url = `http://localhost:3001/api/FAQ/` + questionID + `/` + currentUser;
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
    }

    // stores the ID of the question/post in a state to be compared when mapping
    handleEditClicked(clickedId) {
        this.setState({editClicked: !this.state.editClicked, clickedCommentID: clickedId});
    } 

    // handles editing the response similarly to updating the like count
    handleResponseSubmit = () => {
        // if they don't want to edit or there is no response yet, just return and clear ID
        if (this.state.response === "" || this.state.response === "No response yet")
        {
            this.setState({editClicked: !this.state.editClicked, clickedCommentID: ""});
            return;
        }
        // update response by sending it to back end
        else
        {
            const responseEdit = {
                response: this.state.response
            }
    
            const url = `http://localhost:3001/api/FAQ/response/` + this.state.clickedCommentID;
            try {
                axios.put(url, responseEdit)
                    .then(res => {
                        console.log(res);
                        this.getAllQuestions();
                    })
            }
            catch(err) {
                console.error(err)
            }
            
            // reset the edit button clicked state, the comment ID, and the response input
            this.setState({editClicked: !this.state.editClicked, clickedCommentID: "", response: ""});
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
                { 
                // if the FAQ json object's ID matches the ID stored in state after hitting edit button
                    this.state.clickedCommentID === post._id ? (
                        // make an input box to type in the updated response
                        <div className="editResponse"><input type="text" className="form-control" value={this.state.value} onChange={this.handleResponse} placeholder={post.response} /></div>
                    ) : (
                        // if the ID doesn't match, a.k.a. for all other posts, just display their responses
                        <p className="response">{post.response}</p>
                    )
                    }
                <ul className="like-count">
                    {post.like} &ensp;
                    <button id = {post._id} className="likeButton" onClick={this.handleLike}>like</button>
                    {
                        // if the edit button hasn't been clicked, displayy the edit button
                        !this.state.editClicked ? (
                            <button className="editButton" onClick={() => {this.handleEditClicked(post._id)}}>Edit Response</button>
                        ) : (
                            // if the edit button has been clicked, find the post with the matching ID and display save button
                            this.state.clickedCommentID === post._id ? (
                                    <button className="editButton" onClick={() => {this.handleResponseSubmit()}}>Save</button>
                            ) : (
                                // for all other posts, leave the edit button there
                                <button className="editButton" onClick={() => {this.handleEditClicked(post._id)}}>Edit Response</button>
                            )
                        )
                    }
                </ul>
            </div>
        ))
    }

    
    
    render() {
        return (
            <div className="header">  
                <div className="topImage">
                    <img src={field} />
                </div>
                <h1>Frequently Asked Questions</h1>
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