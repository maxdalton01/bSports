import React from 'react'
import "./FAQ.css"
import field from "./field.png"


function FAQ() {
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
            <form>
                <h3>Ask Your Own Question</h3>

                <div className="submitQuestion">
                    <input type="text" className="form-control" placeholder="Question" />
                </div>

                <button type="submit" className="submitButton">Submit</button>

            </form>
        </div>
    )
}

export default FAQ