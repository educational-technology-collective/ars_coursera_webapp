import React from 'react';
import axios from 'axios';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {solarizedlight} from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import MarkdownEditor from "./markdown";
import RatingComponent from "./rating"

const CodeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

const CodeBlock = styled.div`
  width: 45%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
  height: 350px;
`;

function App() {
    const correctCode = "def student_grades():\n" + "    import re\n" + "    with open (\"assets/grades.txt\", \"r\") as file:\n" + "        grades = file.read()\n" + "\n" + "    ### BEGIN SOLUTION\n" + "    pattern = re.compile(r'\\w+\\s\\w+(?=: B)')\n" + "    matches = re.findall(pattern,grades)\n" + "\n" + "    # Alternative answers: \n" + "    # pattern = \"\"\"(?P<test>\\w+\\s+\\w+): B\"\"\"\n" + "    \n" + "    ### END SOLUTION   \n" + "\n" + "    return matches  \n" + "    \n";

    const incorrectCode = "def logs():\n" + "    import re\n" + "    with open(\"assets/logdata.txt\", \"r\") as file:\n" + "        logdata = file.read()\n" + "    \n" + "    ### FIX CODE BELOW    \n" + "    pattern = \"(?P<host>[0-9]+[.][0-9]+[.][0-9]+[.][0-9]+)\n" + "    (-) (?P<name>[a-z]+[0-9]*)\n" + "    (?P<time>[[0-9]*/[A-Z]+[a-z]*/[0-9]*:[0-9]+:[0-9]*:[0-9]* -[0-9]*])\n" + "    (?P<request>\\\"[A-Z]* (.+?) (.+?)) \"\n" + "\n" + "    logs = []\n" + "    ### FIX CODE ABOVE\n" + "\n" + "    for i in re.finditer(pattern, logdata):\n" + "        logs.append(i.groupdict())\n" + "\n" + "    # YOUR CODE HERE\n" + "\n" + "    return logs\n" + "\n" + "logs()";

    const [hint, setHint] = React.useState("Change the '-' operator to '+' in the function body to correct the code.");

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

        axios.post('http://your-api-url.com/endpoint', {
            hint, rating
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <Stack spacing={2}>
            <Item>
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <DialogTitle>Welcome to the Code Review Page!</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Here you can compare correct solutions to incorrect
                            ones, write hints to improve the incorrect code and
                            rate
                            the level of difficulty of the problem. Start by
                            analyzing the code blocks, then proceed to write a
                            helpful hint and finally rate the difficulty before
                            submitting.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Item>
            <Item>
                <Stack spacing={1}>
                    <Item>
                        <Typography variant="h4" component="h2" align='center'>
                            Solution | Student Code
                        </Typography>
                    </Item>
                    <Item>
                        <CodeContainer>
                            <CodeBlock>
                                <SyntaxHighlighter language="python"
                                                   style={solarizedlight}>
                                    {correctCode}
                                </SyntaxHighlighter>
                            </CodeBlock>
                            <CodeBlock>
                                <SyntaxHighlighter language="python"
                                                   style={solarizedlight}>
                                    {incorrectCode}
                                </SyntaxHighlighter>
                            </CodeBlock>
                        </CodeContainer>
                    </Item>
                </Stack>
            </Item>
            <Item>
                <Stack spacing={1}>
                    <Item>
                        <Typography variant="h4" component="h2" align='center'>
                            Hint
                        </Typography>
                    </Item>
                    <Item>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={1.5}>
                                <Item>
                                    <MarkdownEditor hint={hint}
                                                    setHint={setHint}/>
                                </Item>
                                <Item>
                                    <RatingComponent rating={rating}
                                                     setRating={setRating}/>
                                </Item>
                                <Item>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Submit
                                    </Button>
                                </Item>
                            </Stack>
                        </form>
                    </Item>
                </Stack>
            </Item>
        </Stack>);
}

export default App;
