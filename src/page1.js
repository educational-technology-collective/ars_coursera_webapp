import React from 'react';
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import ToggleButtonGroup from './components/ToggleButtonGroup';
import CodeDisplay from './components/CodeDisplay';
import ChatGPTHint from './components/ChatGPTHint';
import EditorForm from './components/EditorForm';
import {submitFeedback} from './utils/api';

function Page1() {
    const [showIntro, setShowIntro] = React.useState(true);
    const [showChatGPTHint, setShowChatGPTHint] = React.useState(false);
    const [showIncorrectCode, setShowIncorrectCode] = React.useState(true);

    const correctCode = "def student_grades():\n" + "    import re\n" + "    with open (\"assets/grades.txt\", \"r\") as file:\n" + "        grades = file.read()\n" + "\n" + "    ### BEGIN SOLUTION\n" + "    pattern = re.compile(r'\\w+\\s\\w+(?=: B)')\n" + "    matches = re.findall(pattern,grades)\n" + "\n" + "    # Alternative answers: \n" + "    # pattern = \"\"\"(?P<test>\\w+\\s+\\w+): B\"\"\"\n" + "    \n" + "    ### END SOLUTION   \n" + "\n" + "    return matches  \n" + "    \n";

    const incorrectCode = "def logs():\n" + "    import re\n" + "    with open(\"assets/logdata.txt\", \"r\") as file:\n" + "        logdata = file.read()\n" + "    \n" + "    ### FIX CODE BELOW    \n" + "    pattern = \"(?P<host>[0-9]+[.][0-9]+[.][0-9]+[.][0-9]+)\n" + "    (-) (?P<name>[a-z]+[0-9]*)\n" + "    (?P<time>[[0-9]*/[A-Z]+[a-z]*/[0-9]*:[0-9]+:[0-9]*:[0-9]* -[0-9]*])\n" + "    (?P<request>\\\"[A-Z]* (.+?) (.+?)) \"\n" + "\n" + "    logs = []\n" + "    ### FIX CODE ABOVE\n" + "\n" + "    for i in re.finditer(pattern, logdata):\n" + "        logs.append(i.groupdict())\n" + "\n" + "    # YOUR CODE HERE\n" + "\n" + "    return logs\n" + "\n" + "logs()";

    const [hint, setHint] = React.useState("To fix the regular expression pattern, consider the following:\n" + "- The host field should match an IP address, which consists of digits and periods. *Check if your pattern matches this requirement.*\n" + "- The hyphen in the log entry is represented by \"-\". *Make sure you are matching this character correctly.*\n" + "- The username field can contain lowercase letters and numbers. *Verify if your pattern covers this condition.*\n" + "- The time field follows a specific format, including the date, time, and time zone. *Ensure that your pattern captures this format accurately.*\n" + "- The request field starts with an uppercase HTTP method followed by a space. *Confirm if your pattern matches this pattern consistently.*\n" + "\n" + "Review the documentation for regular expressions and focus on the correct syntax and patterns for each field. Experiment with different components of the pattern and test them against the log entries to ensure accurate matching.\n");

    const [rating, setRating] = React.useState(0);

    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const firstVisit = localStorage.getItem('firstVisit');
        if (!firstVisit) {
            setOpen(true);
            localStorage.setItem('firstVisit', '1');
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        submitFeedback(hint, rating)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (<Stack spacing={2}>
        <ToggleButtonGroup
            showIntro={showIntro}
            setShowIntro={setShowIntro}
            showChatGPTHint={showChatGPTHint}
            setShowChatGPTHint={setShowChatGPTHint}
        />
        {showIntro && (<Item>
            <Dialog
                open={showIntro}
                onClose={() => setShowIntro(false)}
            >
                <DialogTitle>Welcome to the Code Review
                    Page!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Here you can compare correct solutions to
                        incorrect ones...
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setShowIntro(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Item>)}
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <CodeDisplay
                    code={correctCode}
                />
            </Grid>
            <Grid item xs={6}>
                <CodeDisplay
                    code={incorrectCode}
                />
            </Grid>
        </Grid>
        <ChatGPTHint showChatGPTHint={showChatGPTHint}/>
        <EditorForm hint={hint} setHint={setHint}
                    handleSubmit={handleSubmit}/>
    </Stack>);
}

export default Page1;
