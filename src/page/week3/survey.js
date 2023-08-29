import React, { useState } from 'react';
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

function SurveyPage() {
    const [answers, setAnswers] = useState({
        q1: '',
        q2: '',
        q3: '',
        feedback: ''
    });

    const questions = [
        'I found this activity helpful for practicing data-manipulation problem-solving skills.',
        'I found this activity helpful for practicing debugging skills related to data manipulation.',
        'I would like to engage in this activity in future courses.'
    ];

    const choices = ["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly Agree"];

    const handleInputChange = (questionIndex, choice) => {
        setAnswers(prev => ({
            ...prev,
            ['q' + (questionIndex + 1)]: choice
        }));
    };

    const handleSubmit = () => {
        // Process answers...
        console.log(answers);
    };

    return (
        <Stack spacing={2}>
            <Box p={3}>
                <Typography variant="h4" gutterBottom>
                    Survey
                </Typography>
                <Typography paragraph style={{ fontSize: 18 }}>
                    For each of the following statements, please indicate your level of agreement:
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

export default SurveyPage;
