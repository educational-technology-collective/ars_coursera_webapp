import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {
    Button,
    Stack,
    Typography,
    Box,
    Grid,
    TextareaAutosize,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import { useSurveyData } from "../SurveyDataContext";


function Intro3() {

    const [hint, setHint] = useState('');
    const [showInstructions, setShowInstructions] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const [startTime, setStartTime] = useState(null);
    const [warningCount, setWarningCount] = useState(0);
    const { data, setData } = useSurveyData();

    useEffect(() => {
        // set start time when the component mounts
        setStartTime(Date.now());
        // cleanup function to stop timer when component unmounts
        return () => setStartTime(null);
    }, []);

    const handleSubmit = () => {
        if (hint.length > 10) {
            setShowInstructions(true);
            // Stop the timer and record the time spent
            const timeSpent = Date.now() - startTime;
            // Update the survey data
            setData({
                ...data,
                intro: {
                    ...data.intro,
                    timeSpent,
                    warningCount,
                    hint,
                }
            });
        } else {
            setOpenDialog(true);
            setWarningCount(warningCount + 1);
        }
    };

    return (
        <Stack spacing={2}>
            <Box p={3}>
                <Typography variant="h4" gutterBottom>
                    Assignment Reflection Instruction
                </Typography>
                <Typography paragraph style={{ fontSize: 18 }}>
                    Well done on submitting two of the four programming
                    assignments!
                    Before moving on to the next module, here is a reflection
                    assignment to revise some of the concepts learned so far.
                </Typography>
                <Typography paragraph style={{ fontSize: 18 }}>
                    In this assignment, you will identify the mistakes in an
                    incorrect solution to
                    <b> Question 2 from Assignment 2 </b>
                    and
                    <b> write a hint such that someone who wrote the incorrect solution can use it to identify their mistake and fix their code.
                    </b>
                </Typography>
                <Typography paragraph style={{ fontSize: 18 }}>
                    This activity will encourage you to think critically, learn from
            mistakes, and help improve your problem-solving skills!
                </Typography>
                <Box border={1} borderColor="grey.300" borderRadius={4} p={2} mb={3}>
                <Typography paragraph style={{ fontSize: 18 }}>
                    Here are some
                    <b> tips for writing a hint </b>
                    for a student. A good
            hint:
                    <ul style={{ listStyleType: 'disc', marginLeft: '10px' }}>
                        <li>Provides information to help the student achieve the correct
                            response without giving away the complete solution.</li>
                    <li>Provides information about how and where the incorrect code
                does or does not meet the assignment goals, e.g., how the
                code reflects a misunderstanding related to the dataset or
                        the problem statement.</li>
            </ul>
                </Typography>
            </Box>
                <Typography paragraph style={{ fontSize: 18 }}>
                    <b> Let's go through a simple example </b>
                    to learn more about this exercise. Consider the first question
            of assignment two, which required you to write a function called
            <code> ‘proportion_of_education’</code>, which returns the proportion of
            children in the dataset who had a mother with the four types of
            levels of education. Below, you will see a correct and an
            incorrect solution to this question:
                </Typography>
                <img src="https://raw.githubusercontent.com/maizehsu/FigureBed/main/asset/2023/08/22/20230822095525.png" alt="Example Solution"
                    style={{width: '100%'}}/>
            </Box>

            <Box p={3}>
                <Typography paragraph style={{ fontSize: 18 }}>
                    <b> What do you think is a good hint for someone who wrote
                        Solution A? </b>
                </Typography>
                <TextareaAutosize
                    value={hint}
                    onChange={(e) => setHint(e.target.value)}
                    placeholder="Write your hint here..."
                    rows="4"
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '20px'
                    }}
                />
                <Button onClick={handleSubmit} variant="contained"
                        color="primary">
                    Submit
                </Button>
            </Box>

            {showInstructions && (
                <Box p={3}>
                    <Typography paragraph style={{ fontSize: 18 }}>A good hint for Solution A would
                        be:</Typography>
                    <Typography paragraph style={{color: 'green', fontSize: 18 }}>
                        Check the use of the filter df["C5R"]==1. Why is
                    this filter needed to calculate the total number of
                    all children in the dataset?
                    </Typography>
                    <Typography paragraph style={{ fontSize: 18 }}>A bad hint would be:</Typography>
                    <Typography paragraph style={{color: 'red', fontSize: 18 }}>
                        To fix your solution, remove the filter df["C5R"]==1
                    for the computation of a1.
                    </Typography>
                    <Link to="/group3">
                        <Button variant="contained" color="primary">
                            Next
                        </Button>
                    </Link>
                </Box>
            )}

            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            >
                <DialogTitle>{"Attention!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please provide a more detailed hint.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Okay
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
)
    ;
}


export default Intro3;