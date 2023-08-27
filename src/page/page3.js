import React, {useEffect, useState} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ToggleButtonGroup from '../components/ToggleButtonGroup';
import CodeDisplay from '../components/CodeDisplay';
import ChatGPTHint from '../components/ChatGPTHint';
import EditorForm from '../components/EditorForm';
import {submitFeedback} from '../utils/api';
import Typography from '@mui/material/Typography';
import {useSurveyData} from "../SurveyDataContext";

function Page3() {
    const {data, setData} = useSurveyData(); // Use the data if needed
    const [timeEntered, setTimeEntered] = useState(Date.now());

    const [showChatGPTHint, setShowChatGPTHint] = useState(false);
    const correctCode = "def student_grades():\n" + "    import re\n" + "    with open (\"assets/grades.txt\", \"r\") as file:\n" + "        grades = file.read()\n" + "\n" + "    ### BEGIN SOLUTION\n" + "    pattern = re.compile(r'\\w+\\s\\w+(?=: B)')\n" + "    matches = re.findall(pattern,grades)\n" + "\n" + "    # Alternative answers: \n" + "    # pattern = \"\"\"(?P<test>\\w+\\s+\\w+): B\"\"\"\n" + "    \n" + "    ### END SOLUTION   \n" + "\n" + "    return matches  \n" + "    \n";
    const incorrectCode = "def logs():\n" + "    import re\n" + "    with open(\"assets/logdata.txt\", \"r\") as file:\n" + "        logdata = file.read()\n" + "    \n" + "    ### FIX CODE BELOW    \n" + "    pattern = \"(?P<host>[0-9]+[.][0-9]+[.][0-9]+[.][0-9]+)\n" + "    (-) (?P<name>[a-z]+[0-9]*)\n" + "    (?P<time>[[0-9]*/[A-Z]+[a-z]*/[0-9]*:[0-9]+:[0-9]*:[0-9]* -[0-9]*])\n" + "    (?P<request>\\\"[A-Z]* (.+?) (.+?)) \"\n" + "\n" + "    logs = []\n" + "    ### FIX CODE ABOVE\n" + "\n" + "    for i in re.finditer(pattern, logdata):\n" + "        logs.append(i.groupdict())\n" + "\n" + "    # YOUR CODE HERE\n" + "\n" + "    return logs\n" + "\n" + "logs()";

    const [hint, setHint] = React.useState(/* ... (same as before) ... */);

    useEffect(() => {
        setTimeEntered(Date.now());
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();

        const timeExited = Date.now();
        const timeSpentCalculated = (timeExited - timeEntered) / 1000;

        const feedbackData = {
            chatGPTHint: hint,
            correctCode,
            incorrectCode,
            studentHint: hint,
            timeSpent: timeSpentCalculated,
        };

        // Using data from useSurveyData, if required
        setData(prevData => ({
            ...prevData,
            page: {
                ...prevData.page,
                feedbackData
            }
        }));

        submitFeedback(hint)
            .then(response => {
                console.log("Feedback submitted successfully!")
                console.log("data: ", data)
                console.log(response);
            })
            .catch(error => {
                console.log("Error submitting feedback!");
                console.log("data: ", data)
                console.log(error);
            });
    };

    return (
        <Stack spacing={2}>
            <Box p={3}>
                <Typography variant="h4" gutterBottom>
                    Assignment 2 Question 2 Reflection Activity
                </Typography>
                <Typography paragraph style={{fontSize: 18}}>
                    Let's proceed with the task now!
                </Typography>
                <Typography paragraph style={{fontSize: 18}}>
                    To remind you, Question 2
                    of Assignment 2, which was based on the 2017 data on
                    immunizations from the CDC, was as follows:
                </Typography>

                <Typography paragraph
                            style={{fontStyle: 'italic', fontSize: 18}}>
                    It would be interesting to see if there is any evidence of a
                    link between vaccine effectiveness and sex of the child.
                    Calculate the ratio of the number of children who contracted
                    chickenpox but were vaccinated against it (at least one
                    varicella dose) versus those who were vaccinated but did not
                    contract chicken pox. Return results by sex.
                </Typography>

                <Typography paragraph
                            style={{fontStyle: 'italic', fontSize: 18}}>
                    This function should return a dictionary in the form of (use
                    the correct
                    numbers):
                    <code> {JSON.stringify({"male": 0.2, "female": 0.4})}</code>
                </Typography>

                <Typography paragraph style={{fontSize: 18}}>
                    Please go through Solution A and identify the mistakes in
                    it. You can compare with Solution B, which is correct.
                    Assume that all the relevant libraries such as pandas and
                    NumPy are already imported, even if you don’t see that in
                    Solution A.
                </Typography>
            </Box>

            <Grid container spacing={2} bgcolor="#f5f5f5">
                <Grid item xs={6}>
                    <CodeDisplay
                        code={correctCode}
                        title={"Solution A (Incorrect)"}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CodeDisplay
                        code={incorrectCode}
                        title={"Solution B (Correct)"}
                    />
                </Grid>
            </Grid>

            <Typography paragraph style={{fontSize: 18}}>
                <b>What hint would you provide to a student who wrote Solution A
                    to help them fix their code?</b>
            </Typography>

            <Typography paragraph style={{fontSize: 18}}>
                Remember, the goal is to help them understand their mistake and
                lead them to the correct solution rather than solving their
                problem completely.
            </Typography>

            <EditorForm hint={hint} setHint={setHint}/>

            <Grid container justifyContent="space-between">
                <Grid item>
                    <Button onClick={handleSubmit} variant="contained"
                            color="primary">
                        Submit
                    </Button>
                </Grid>
            </Grid>

            <ChatGPTHint showChatGPTHint={showChatGPTHint}/>
        </Stack>
    );
}

export default Page3;
