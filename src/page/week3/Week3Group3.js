import React, {useEffect, useState} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';
import CodeDisplay from '../../components/CodeDisplay';
import AttentionDialog from '../../components/AttentionDialog';
import MyMDEditor from '../../components/MyMDEditor';
import {
    submitStudentData,
    fetchCodeHint,
    checkIfStudentCodeIsCorrect,
    fetchStudentCorrectCode
} from '../../utils/api';
import Typography from '@mui/material/Typography';
import {useSurveyData} from "../../SurveyDataContext";

function Week3Group3() {
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
    const [hint, setHint] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [warningCount, setWarningCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const studentId = data["studentId"];
            console.log("studentId: ", studentId);

            // First check if the student code is correct, if it is, call the backend to fetch the correct code
            const ifStudentCodeIsCorrect = await checkIfStudentCodeIsCorrect(studentId, "assignment3");
            if (ifStudentCodeIsCorrect) {
                setIfCorrectCode(true);
                const correctCode = await fetchStudentCorrectCode(studentId, "cell-8c3d74335c0d489a", "assignment3");
                console.log("correctCode: ", correctCode);
                if (correctCode) {
                    setCorrectCodeArray(correctCode);
                }
            } else {
                setCorrectCodeArray(
                    [
                        "def chickenpox_by_sex():\n",
                        "    ### BEGIN SOLUTION\n",
                        "    def answer_chickenpox_by_sex():\n",
                        "        import pandas as pd\n",
                        "        import numpy as np\n",
                        "\n",
                        "        df=pd.read_csv(\"assets/NISPUF17.csv\")\n",
                        "\n",
                        "        male=len(df.where((df[\"SEX\"]==1) & (df[\"HAD_CPOX\"]==1) & (df[\"P_NUMVRC\"]>0))[[\"SEX\",\"HAD_CPOX\",\"P_NUMVRC\"]].dropna())/len(df.where((df[\"SEX\"]==1) & (df[\"HAD_CPOX\"]==2) & (df[\"P_NUMVRC\"]>0))[[\"SEX\",\"HAD_CPOX\",\"P_NUMVRC\"]].dropna())\n",
                        "        female=len(df.where((df[\"SEX\"]==2) & (df[\"HAD_CPOX\"]==1) & (df[\"P_NUMVRC\"]>0))[[\"SEX\",\"HAD_CPOX\",\"P_NUMVRC\"]].dropna())/len(df.where((df[\"SEX\"]==2) & (df[\"HAD_CPOX\"]==2) & (df[\"P_NUMVRC\"]>0))[[\"SEX\",\"HAD_CPOX\",\"P_NUMVRC\"]].dropna())\n",
                        "        \n",
                        "        return {\"male\": male, \"female\": female}\n",
                        "\n",
                        "    return answer_chickenpox_by_sex()\n",
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
                group: 3,
                mainActivityPage: {
                    ...data.mainActivityPage,
                    chatGPTHint: "",
                    correctCode,
                    incorrectCode,
                    studentHint: hint,
                    studentRevisedHint: "",
                    timeSpent: timeSpentCalculated,
                    warningCount: warningCount,
                    chatGPTHintButtonClicks: 0
                }
            });

            navigate("/survey");
        } else {
            setOpenDialog(true);
            setWarningCount(warningCount + 1);
        }
    };

    // useEffect(() => {
    //     if (data && data.mainActivityPage && data.mainActivityPage.studentHint) {  // Check that the studentHint is set
    //         submitStudentData(data)
    //             .then(response => {
    //                 console.log("Feedback submitted successfully!")
    //                 console.log("data: ", data)
    //                 console.log(response);
    //                 navigate("/thankyou");
    //             })
    //             .catch(error => {
    //                 console.log("Error submitting feedback!");
    //                 console.log("data: ", data)
    //                 console.log(error);
    //                 navigate("/thankyou");
    //             });
    //     }
    // }, [data]);

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

            <Typography paragraph style={{fontSize: 18}}>
                <b>What hint would you provide to a student who wrote Solution A
                    to help them fix their code?</b>
            </Typography>

            <Typography paragraph style={{fontSize: 18}}>
                Remember, the goal is to help them understand their mistake and
                lead them to the correct solution rather than solving their
                problem completely.
            </Typography>

            <MyMDEditor hint={hint} setHint={setHint}/>

            <Grid container justifyContent="space-between">
                <Grid item>
                    <Button onClick={handleSubmit} variant="contained"
                            color="primary">
                        Submit
                    </Button>
                </Grid>
            </Grid>

            <AttentionDialog openDialog={openDialog}
                             setOpenDialog={setOpenDialog}/>
        </Stack>
    );
}

export default Week3Group3;
