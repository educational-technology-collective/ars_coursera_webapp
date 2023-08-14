import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MarkdownEditor from "./MarkdownEditor";

function EditorForm({ hint, setHint, handleSubmit }) {
    return (
        <div>
            <Typography variant="h4" component="h2" align='center'>Hint</Typography>
            <form onSubmit={handleSubmit}>
                <div>
                    <MarkdownEditor hint={hint} setHint={setHint} />
                </div>
                <div>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default EditorForm;
