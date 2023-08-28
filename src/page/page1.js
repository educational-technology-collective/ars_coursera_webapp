import React, {useState, useEffect} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ToggleButtonGroup from '../components/ToggleButtonGroup';
import CodeDisplay from '../components/CodeDisplay';
import ChatGPTHint from '../components/ChatGPTHint';
import EditorForm from '../components/EditorForm';
import {submitStudentData, fetchCodeHint} from '../utils/api';
import Typography from '@mui/material/Typography';
import {useSurveyData} from "../SurveyDataContext";

function Page1() {
    // Fetch code hint from backend
    const [incorrectCodeArray, setIncorrectCodeArray] = useState([]);
    const [chatGPTHint, setChatGPTHint] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchCodeHint();
            if (data && data["source"] && data["chatGPT_hint"]) {
                setIncorrectCodeArray(data["source"]);
                setChatGPTHint(data["chatGPT_hint"]);
            }
        };

        fetchData();
    }, []);
    const correctCodeArray = [
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
    ];
    const correctCode = correctCodeArray.join("");
    const incorrectCode = incorrectCodeArray.join("");

    const {data, setData} = useSurveyData(); // Use the data if needed
    const [timeEntered, setTimeEntered] = useState(Date.now());
    const [showChatGPTHint, setShowChatGPTHint] = useState(false);
    const [hint, setHint] = useState("");

    useEffect(() => {
        setTimeEntered(Date.now());
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const timeExited = Date.now();
        const timeSpentCalculated = (timeExited - timeEntered) / 1000;

        setData({
            ...data,
            page: {
                ...data.page,
                chatGPTHint: chatGPTHint,
                correctCode,
                incorrectCode,
                studentHint: hint,
                studentRevisedHint: "",
                timeSpent: timeSpentCalculated,
                hintButtonClicks: -1
            }
        });

        submitStudentData(data)
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


    return (<Stack spacing={2}>
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
                    code={incorrectCode}
                    title={"Solution A (Incorrect)"}
                />
            </Grid>
            <Grid item xs={6}>
                <CodeDisplay
                    code={correctCode}
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

        <EditorForm hint={hint} setHint={setHint}/>

        <Grid container justifyContent="space-between">
            <Grid item>
                <ToggleButtonGroup
                    showChatGPTHint={showChatGPTHint}
                    setShowChatGPTHint={setShowChatGPTHint}
                />
            </Grid>
            <Grid item>
                <Button onClick={handleSubmit} variant="contained"
                        color="primary">
                    Submit
                </Button>
            </Grid>
        </Grid>

        <ChatGPTHint showChatGPTHint={showChatGPTHint} ChatGPTHint={chatGPTHint}/>
    </Stack>);
}

export default Page1;
