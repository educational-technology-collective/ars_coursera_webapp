import React from 'react';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled from 'styled-components';
import Button from '@mui/material/Button';
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
  height: 500px;
`;

function App() {
  const correctCode =     "def student_grades():\n" +
    "    import re\n" +
    "    with open (\"assets/grades.txt\", \"r\") as file:\n" +
    "        grades = file.read()\n" +
    "\n" +
    "    ### FIX CODE BELOW\n" +
    "    pattern = \"\"\"(\\w+)\"\"\"\n" +
    "    matches = re.findall(pattern,grades)\n" +
    "    ### FIX CODE ABOVE\n" +
    "        \n" +
    "        \n" +
    "    ### BEGIN SOLUTION\n" +
    "    pattern = re.compile(r'\\w+\\s\\w+(?=: B)')\n" +
    "    matches = re.findall(pattern,grades)\n" +
    "\n" +
    "    # Alternative answers: \n" +
    "    # pattern = \"\"\"(?P<test>\\w+\\s+\\w+): B\"\"\"\n" +
    "    \n" +
    "    ### END SOLUTION   \n" +
    "\n" +
    "    return matches  \n" +
    "    \n";

  const incorrectCode =     "def logs():\n" +
    "    import re\n" +
    "    with open(\"assets/logdata.txt\", \"r\") as file:\n" +
    "        logdata = file.read()\n" +
    "    \n" +
    "        \n" +
    "    ### FIX CODE BELOW    \n" +
    "    pattern = \"(?P<host>[0-9]+[.][0-9]+[.][0-9]+[.][0-9]+)\n" +
    "    (-) (?P<name>[a-z]+[0-9]*)\n" +
    "    (?P<time>[[0-9]*/[A-Z]+[a-z]*/[0-9]*:[0-9]+:[0-9]*:[0-9]* -[0-9]*])\n" +
    "    (?P<request>\\\"[A-Z]* (.+?) (.+?)) \"\n" +
    "\n" +
    "    logs = []\n" +
    "    ### FIX CODE ABOVE\n" +
    "\n" +
    "    for i in re.finditer(pattern, logdata):\n" +
    "        logs.append(i.groupdict())\n" +
    "\n" +
    "    # YOUR CODE HERE\n" +
    "\n" +
    "    return logs\n" +
    "\n" +
    "logs()";

  const [hint, setHint] = React.useState("Change the '-' operator to '+' in the function body to correct the code.");

  const [rating, setRating] = React.useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://your-api-url.com/endpoint', {
      hint,
      rating
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <div>
      <CodeContainer>
        <CodeBlock>
          <SyntaxHighlighter language="python" style={solarizedlight}>
            {correctCode}
          </SyntaxHighlighter>
        </CodeBlock>
        <CodeBlock>
          <SyntaxHighlighter language="python" style={solarizedlight}>
            {incorrectCode}
          </SyntaxHighlighter>
        </CodeBlock>
      </CodeContainer>
      <form onSubmit={handleSubmit}>
        <MarkdownEditor hint={hint} setHint={setHint} />
        <RatingComponent rating={rating} setRating={setRating} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default App;
