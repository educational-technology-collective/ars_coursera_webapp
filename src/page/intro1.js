import React, {useState} from 'react';
import {Link} from 'react-router-dom';

function Intro1() {

    const [hint, setHint] = useState('');      // For storing user input (hint).
    const [showInstructions, setShowInstructions] = useState(false); // To control displaying the rest of the instructions.

    const handleSubmit = () => {
        if (hint.length > 10) {   // Setting a threshold of 10 characters. Adjust accordingly.
            setShowInstructions(true);
        } else {
            alert('Please provide a more detailed hint.'); // Warning message if hint is too short.
        }
    };

    return (
        <div>
            <p>Well done on submitting two of the four programming assignments!
                Before moving on to the next module, here is a reflection
                assignment to revise some of the concepts learned so far.
            </p>
            <p>
                In this assignment, you will identify the mistakes in an
                incorrect solution to
                <b> Question 2 from Assignment 2 </b>
                and
                <b> write a hint such that someone who wrote the incorrect
                    solution can use it to identify their mistake and fix their
                    code.</b>
            </p>
            <p>
                This activity will encourage you to think critically, learn from
                mistakes, and help improve your problem-solving skills!
            </p>
            <p>
                Here are some tips for writing a hint for a student. A good
                hint:
                <ul>Provides information to help the student achieve the correct
                    response without giving away the complete solution.</ul>
                <ul>Provides information about how and where the incorrect code
                    does or does not meet the assignment goals, e.g., how the
                    code reflects a misunderstanding related to the dataset or
                    the problem statement.
                </ul>
            </p>
            <p>
                <b>Let's go through a simple example </b>
                to learn more about this exercise. Consider the first question
                of assignment two, which required you to write a function called
                ‘proportion_of_education’, which returns the proportion of
                children in the dataset who had a mother with the four types of
                levels of education. Below, you will see a correct and an
                incorrect solution to this question:
            </p>
            <p>image placeholder</p>
            <img src="../asset/instruction_code.png" alt="Example Solution"/>
            <p>What do you think is a good hint for someone who wrote Solution
                A? </p>
            <textarea
                value={hint}
                onChange={(e) => setHint(e.target.value)}
                placeholder="Write your hint here..."
                rows="4"
                style={{width: '100%'}}
            />
            <br/>
            <button onClick={handleSubmit}>Submit</button>

            {showInstructions && (
                <div>
                    {/* Add the rest of your instructions here */}
                    <p>
                        A good hint for Solution A would be:</p>
                    <p style={{ color: 'green' }}>
                        Check the use of the filter df["C5R"]==1. Why is
                        this filter needed to calculate the total number of
                        all children in the dataset?
                    </p>
                    <p>
                        A bad hint would be:
                    </p>
                    <p style={{ color: 'red' }}>
                        To fix your solution, remove the filter df["C5R"]==1
                        for the computation of a1.
                    </p>
                    <Link to="/group1"><button>Next</button></Link>
                </div>
            )}

        </div>
    );
}

export default Intro1;