import React from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {materialLight} from 'react-syntax-highlighter/dist/esm/styles/prism';
import Typography from '@mui/material/Typography';

function CodeDisplay({code, title}) {
    return (
        <div>
            <div>
                <Typography variant="h6" component="h6" align='center'>{title}</Typography>
                <SyntaxHighlighter language="python" style={materialLight} wrapLongLines={true}>
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}

export default CodeDisplay;
