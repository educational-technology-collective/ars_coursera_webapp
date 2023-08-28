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
    const incorrectCodeArray = [
        "def chickenpox_by_sex():\n",
        "    \"\"\"\n",
        "    Calculate the ratio of the number of children who contracted chickenpox but were vaccinated against it (at least one varicella dose) versus those who were vaccinated but \n",
        "    did not contract chicken pox. Return results by sex.\n",
        "    This function should return a dictionary in the form of (use the correct numbers):\n",
        "\n",
        "    {\"male\":0.2,\n",
        "    \"female\":0.4}\n",
        "    \n",
        "    HAD_CPOX : CHILD EVER HAD CHICKEN POX DISEASE\n",
        "        1 : \"yes\"\n",
        "        2 : No\n",
        "        77 : Don't Know\n",
        "        99 : Refused\n",
        "    SEX : SEX OF CHILD: IMPUTED\n",
        "        1 : Male\n",
        "        2 : Female \n",
        "    P_NUMVRC : NUMBER OF VARICELLA-CONTAINING SHOTS BY 36 MONTHS OF AGE DETERMINED FROM PROVIDER INFO\n",
        "    \n",
        "    target 0.00779 for female\n",
        "    \"\"\"\n",
        "    import pandas as pd\n",
        "    import numpy as np\n",
        "    #raise NotImplementedError()\n",
        "    csv_path = r\"assets/NISPUF17.csv\"\n",
        "    df = pd.read_csv(csv_path)\n",
        "    df.replace({77:np.nan, 99:np.nan}, inplace = True)\n",
        "    df.dropna(subset=[\"HAD_CPOX\", \"P_NUMVRC\"], inplace=True)\n",
        "    vacc_df = df.where((df[\"P_NUMVRC\"] != 0)).dropna(subset=[\"P_NUMVRC\"])\n",
        "    \n",
        "    # get female ratio\n",
        "    female_vacc_df = vacc_df.where((vacc_df[\"SEX\"] == 2)).dropna(subset=[\"SEX\"])\n",
        "    fem_ratio = (female_vacc_df[\"HAD_CPOX\"] == 1).value_counts(True)[True]\n",
        "    \n",
        "    # get male ratio\n",
        "    male_vacc_df = vacc_df.where((vacc_df[\"SEX\"] == 1)).dropna(subset=[\"SEX\"])\n",
        "    m_ratio = (male_vacc_df[\"HAD_CPOX\"] == 1).value_counts(True)[True]\n",
        "    \n",
        "    return {\"male\": m_ratio, \"female\":fem_ratio}"
    ];

    const correctCode = correctCodeArray.join("");
    const incorrectCode = incorrectCodeArray.join("");


    const {data, setData} = useSurveyData(); // Use the data if needed
    const [timeEntered, setTimeEntered] = useState(Date.now());

    const [showChatGPTHint, setShowChatGPTHint] = useState(false);
    const [hint, setHint] = useState(/* ... (same as before) ... */);

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
                chatGPTHint: hint,
                correctCode,
                incorrectCode,
                studentHint: hint,
                timeSpent: timeSpentCalculated,
            }
        });

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
