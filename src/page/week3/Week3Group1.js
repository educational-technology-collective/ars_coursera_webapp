import React, {useState, useEffect} from 'react';
import {
    Button,
    Stack,
    Grid,
    Box,
    Typography
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import CodeDisplay from '../../components/CodeDisplay';
import AttentionDialog from '../../components/AttentionDialog';
import MyMDEditor from '../../components/MyMDEditor';
import ChatGPTHint from '../../components/ChatGPTHint';
import {
    submitStudentData,
    fetchCodeHint,
    checkIfStudentCodeIsCorrect,
    fetchStudentCorrectCode
} from '../../utils/api';
import {useSurveyData} from "../../SurveyDataContext";

function Week3Group1() {
    const navigate = useNavigate();

    const [correctCodeArray, setCorrectCodeArray] = useState([
        "Please wait for this code to appear. \n",
        "In the meantime, go through the instructions for this task. \n",
        "Thanks for being patient!"
    ]);
    const [incorrectCodeArray, setIncorrectCodeArray] = useState([
        "Please wait for this code to appear. \n",
        "In the meantime, go through the instructions for this task. \n",
        "Thanks for being patient!"
    ]);
    const [chatGPTHint, setChatGPTHint] = useState("");
    const [ifCorrectCode, setIfCorrectCode] = useState(false);
    const {data = {mainActivityPage: {}}, setData} = useSurveyData(); // Use the data if needed
    const [timeEntered, setTimeEntered] = useState(Date.now());
    const [showChatGPTHint, setShowChatGPTHint] = useState(false);
    const [hint, setHint] = useState("");
    const [warningCount, setWarningCount] = useState(0);
    const [hintButtonClicks, setHintButtonClicks] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const studentId = data["studentId"];
            console.log("studentId: ", studentId);

            // First check if the student code is correct, if it is, call the backend to fetch the correct code
            const ifStudentCodeIsCorrect = await checkIfStudentCodeIsCorrect(studentId, "assignment3");
            if (ifStudentCodeIsCorrect) {
                setIfCorrectCode(true);
                const correctCode = await fetchStudentCorrectCode(studentId, "cell-a0a9e6fe67698002", "assignment3");
                console.log("correctCode: ", correctCode);
                if (correctCode) {
                    setCorrectCodeArray(correctCode);
                }
            } else {
                setCorrectCodeArray(
                    [
                        "def fine_per_plates():\n",
                        "    import xlrd\n",
                        "    import pandas as pd\n",
                        "    import numpy as np\n",
                        "    import re\n",
                        "\n",
                        "    # Filter all warnings. If you would like to see the warnings, please comment the two lines below.\n",
                        "    import warnings\n",
                        "    warnings.filterwarnings('ignore')\n",
                        "    \n",
                        "    df = load_ticket_data()\n",
                        "    ### BEGIN SOLUTION\n",
                        "    plate = {}\n",
                        "    new_df = df[df['State'] == 'MI']\n",
                        "    license_plate = new_df['Plate']\n",
                        "\n",
                        "    plates_dict = {}\n",
                        "    license_one = license_plate.str.count(r'^[a-zA-Z]{3}[0-9]{4}$').sum()\n",
                        "    plates_dict['ABC1234'] = license_one\n",
                        "    \n",
                        "    license_two = license_plate.str.count(r'^[a-zA-Z]{3}[0-9]{3}$').sum()\n",
                        "    plates_dict['ABC123'] = license_two\n",
                        "\n",
                        "    license_three = license_plate.str.count(r'^[0-9]{3}[a-zA-Z]{3}$').sum()\n",
                        "    plates_dict['123ABC'] = license_three\n",
                        "\n",
                        "    plates_dict['vanity'] = len(license_plate) - (license_one + license_two + license_three)\n",
                        "    return plates_dict\n",
                        "    ### END SOLUTION"
                    ]
                );
            }

            const codeHint = await fetchCodeHint(studentId, "assignment3");
            if (codeHint) {
                setIncorrectCodeArray(codeHint["source"]);
                setChatGPTHint(codeHint["chatGPT_hint"]);
            }
        };

        fetchData();  // This invokes the async function
    }, []);

    useEffect(() => {
        setTimeEntered(Date.now());
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (hint.length > 50) {
            const timeExited = Date.now();
            const timeSpentCalculated = (timeExited - timeEntered) / 1000;
            const correctCode = correctCodeArray.join("");
            const incorrectCode = incorrectCodeArray.join("");

            setData({
                ...data,
                group: 1,
                mainActivityPage: {
                    ...data.mainActivityPage,
                    chatGPTHint: chatGPTHint,
                    correctCode,
                    incorrectCode,
                    studentHint: hint,
                    studentRevisedHint: "",
                    timeSpent: timeSpentCalculated,
                    warningCount: warningCount,
                    chatGPTHintButtonClicks: hintButtonClicks
                }
            });
        } else {
            setOpenDialog(true);
            setWarningCount(warningCount + 1);
        }
    };

    useEffect(() => {
        if (data && data.mainActivityPage && data.mainActivityPage.studentHint) {  // Check that the studentHint is set
            submitStudentData(data)
                .then(response => {
                    console.log("Feedback submitted successfully!")
                    console.log("data: ", data)
                    console.log(response);
                    navigate("/thankyou");
                })
                .catch(error => {
                    console.log("Error submitting feedback!");
                    console.log("data: ", data)
                    console.log(error);
                    navigate("/thankyou");
                });
        }
    }, [data]);

    return (
        <Stack spacing={2}>
            <Box p={3}>
                <Typography variant="h4" gutterBottom>
                    Assignment 3 Question 4 Reflection Activity
                </Typography>
                <Typography paragraph style={{fontSize: 18}}>
                    Let's proceed with the task now!
                </Typography>
                <Typography paragraph style={{fontSize: 18}}>
                    To remind you, Question 4 of Assignment 3 , which was based
                    on the data on parking tickets in Ann Arbor, was as follows:
                </Typography>

                <Typography paragraph
                            style={{fontStyle: 'italic', fontSize: 18}}>
                    Count for the number of Michigan vehicles with plates in the
                    following formats that have received a ticket:

                    <ul style={{listStyleType: 'disc', marginLeft: '10px'}}>
                        <li>ABC1234</li>
                        <li>ABC123</li>
                        <li>123ABC</li>
                        <li>Vanity Plates (i.e. anything other than the
                            aforementioned formats)
                        </li>
                    </ul>
                </Typography>

                <Typography paragraph
                            style={{fontStyle: 'italic', fontSize: 18}}>
                    Complete the
                    function <code> fine_per_plates() </code> returning a
                    dictionary. The dictinary should be formatted as follows:
                    <code> {JSON.stringify({
                        "ABC1234": 10,
                        "ABC123": 15,
                        "123ABC": 17,
                        "vanity": 3
                    })}</code>
                </Typography>

                <Typography paragraph
                            style={{fontStyle: 'italic', fontSize: 18}}>
                    What is the most common make of car which received tickets
                    from the state of NY? The answer should be a string.
                </Typography>

                <Typography paragraph style={{fontSize: 18}}>
                    <b>Please go through Solution A and identify the mistakes in
                        it.
                        {
                            ifCorrectCode
                                ? " You can compare with Solution B, which is the correct solution that you submitted. "
                                : " You can compare with Solution B, which is correct. "
                        }</b>
                    Assume that all the relevant libraries such as pandas and
                    NumPy are already imported, even if you don’t see that in
                    Solution A.
                </Typography>
            </Box>

            <Grid container spacing={2} bgcolor="#f5f5f5">
                <Grid item xs={6}>
                    <CodeDisplay
                        code={incorrectCodeArray.join("")}
                        title={"Solution A (Incorrect)"}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CodeDisplay
                        code={correctCodeArray.join("")}
                        title={"Solution B (Correct)"}
                    />
                </Grid>
            </Grid>

            <Typography paragraph>
                <b>What hint would you provide to a student who wrote Solution A
                    to help them fix their code?</b>
            </Typography>

            <Typography paragraph>
                Remember, the goal is to help them understand their mistake and
                lead them to the correct solution rather than solving their
                problem completely.
            </Typography>

            <MyMDEditor hint={hint} setHint={setHint}/>

            <Grid container justifyContent="space-between">
                <Grid item>
                    <Button
                        onClick={() => {
                            setShowChatGPTHint(!showChatGPTHint)
                            setHintButtonClicks(prevClicks => prevClicks + 1);
                        }
                        }
                        variant="contained"
                        style={{
                            backgroundColor: showChatGPTHint ? 'grey' : '#00cc66',
                            color: 'white'
                        }}
                    >
                        {showChatGPTHint ? 'Hide ChatGPT Hint' : 'Show ChatGPT Hint'}
                    </Button>
                </Grid>
                <Grid item>
                    <Button onClick={handleSubmit} variant="contained"
                            color="primary">
                        Submit
                    </Button>
                </Grid>
            </Grid>

            <ChatGPTHint showChatGPTHint={showChatGPTHint}
                         ChatGPTHint={chatGPTHint}/>

            <AttentionDialog openDialog={openDialog}
                             setOpenDialog={setOpenDialog}/>
        </Stack>
    );
}

export default Week3Group1;
