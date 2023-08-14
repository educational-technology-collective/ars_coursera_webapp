import React from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {solarizedlight} from 'react-syntax-highlighter/dist/esm/styles/prism';
import Typography from '@mui/material/Typography';

function CodeDisplay({code}) {
    return (
        <div>
            <div>
                <Typography variant="h4" component="h2" align='center'>Correct Solution</Typography>
                <SyntaxHighlighter language="python" style={solarizedlight}>
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}

export default CodeDisplay;
