import React, {useState} from 'react';
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


function Intro2() {

    const [hint, setHint] = useState('');
    const [showInstructions, setShowInstructions] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const handleSubmit = () => {
        if (hint.length > 10) {
            setShowInstructions(true);
        } else {
            setOpenDialog(true);
        }
    };

    return (
        <Stack spacing={2}>
            <Box p={3}>
                <Typography variant="h4" gutterBottom>
                    Assignment Reflection Instruction
                </Typography>
                <Typography paragraph>
                    Well done on submitting two of the four programming
                    assignments!
                    Before moving on to the next module, here is a reflection
                    assignment to revise some of the concepts learned so far.
                </Typography>
                <Typography paragraph>
                    In this assignment, you will identify the mistakes in an
                    incorrect solution to
                    <b> Question 2 from Assignment 2 </b>
                    and
                    <b> write a hint such that someone who wrote the incorrect solution can use it to identify their mistake and fix their code.
                    </b>
                </Typography>
                <Typography paragraph>
                    In this task, you will first write a hint on your own. Then, to help you improve your hint, you will be shown a hint written for the same incorrect code by ChatGPT, a popular AI chatbot that uses natural language processing to create humanlike conversational dialogue. Then, you will be prompted to rewrite your hint such that it improves upon your original hint and the ChatGPT hint. Note that the ChatGPT hint could be incorrect, incomplete, or both.
                </Typography>
                <Typography paragraph>
                    This activity will encourage you to think critically, learn from
            mistakes, and help improve your problem-solving skills!
                </Typography>
                <Box border={1} borderColor="grey.300" borderRadius={4} p={2} mb={3}>
                <Typography paragraph>
                    Here are some tips for writing a hint for a student. A good
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
                <Typography paragraph>
                    <b> Let's go through a simple example </b>
                    to learn more about this exercise. Consider the first question
            of assignment two, which required you to write a function called
            ‘proportion_of_education’, which returns the proportion of
            children in the dataset who had a mother with the four types of
            levels of education. Below, you will see a correct and an
            incorrect solution to this question:
                </Typography>
            </Box>

            <Box p={3}>
                <p>image placeholder</p>
                {/*<img src={instructionImage} alt="Example Solution"*/}
                {/*     style={{width: '100%', marginBottom: '20px'}}/>*/}
                <Typography paragraph>
                    What do you think is a good hint for someone who wrote
                    Solution A?
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
                    <Typography paragraph>A good hint for Solution A would
                        be:</Typography>
                    <Typography paragraph style={{color: 'green'}}>
                        Check the use of the filter df["C5R"]==1. Why is
                    this filter needed to calculate the total number of
                    all children in the dataset?
                    </Typography>
                    <Typography paragraph>A bad hint would be:</Typography>
                    <Typography paragraph style={{color: 'red'}}>
                        To fix your solution, remove the filter df["C5R"]==1
                    for the computation of a1.
                    </Typography>
                    <Link to="/group2">
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


export default Intro2;