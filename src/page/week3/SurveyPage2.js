import React, {useEffect, useState} from 'react';
import {
    Button,
    Stack,
    Typography,
    Box,
    Table,
    TextareaAutosize,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Radio
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {submitStudentData} from "../../utils/api";
import {useSurveyData} from "../../SurveyDataContext";

function SurveyPage2() {
    const navigate = useNavigate();
    const {data, setData} = useSurveyData();

    const [answers, setAnswers] = useState({
        q1: '',
        q2: '',
        q3: '',
        feedback: ''
    });

    const questions = [
        'I would like to engage in this activity in future courses.',
        'I found this activity helpful for practicing data-manipulation problem-solving skills.',
        'I found this activity helpful for practicing debugging skills related to data manipulation.',
        'This exercise encouraged me to think critically about the accuracy and appropriateness of responses provided by ChatGPT.'
    ];

    const choices = ["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly Agree"];

    const handleInputChange = (questionIndex, choice) => {
        setAnswers(prev => ({
            ...prev,
            ['q' + (questionIndex + 1)]: choice
        }));
    };

    const handleSubmit = () => {
        setData({
                ...data,
                survey: answers
            });
        console.log(answers);
    };

    useEffect(() => {
        if (data && data.survey) {  // Check that the studentHint is set
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
                    Feedback on the Reflection Activities
                </Typography>
                <Typography paragraph style={{ fontSize: 18 }}>
                    We are constantly working towards improving students' learning experience in this Data Manipulation course. Your feedback on these reflection assignments would be incredibly valuable in understanding its impact and how it can be refined for future iterations.
                </Typography>
                <Typography paragraph style={{ fontSize: 18 }}>
                    <b>For each of the following statements, please indicate your level of agreement:</b>
                </Typography>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            {choices.map((choice, index) => (
                                <TableCell key={index} align="center">{choice}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {questions.map((question, qIndex) => (
                            <TableRow key={qIndex}>
                                <TableCell>{question}</TableCell>
                                {choices.map((choice, cIndex) => (
                                    <TableCell key={cIndex} align="center">
                                        <Radio
                                            checked={answers['q' + (qIndex + 1)] === choice}
                                            onChange={() => handleInputChange(qIndex, choice)}
                                        />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Typography paragraph style={{ fontSize: 18, marginTop: '20px' }}>
                    Do you have any other thoughts about these reflection assignments that you would like to share?
                </Typography>
                <TextareaAutosize
                    minRows={5}
                    style={{ width: '100%', padding: '12px', fontSize: '16px' }}
                    name="feedback"
                    value={answers.feedback}
                    onChange={(e) => setAnswers(prev => ({ ...prev, feedback: e.target.value }))}
                />

                <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
                    Submit
                </Button>
            </Box>
        </Stack>
    );
}

export default SurveyPage2;
