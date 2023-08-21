import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MDEditor from "./MDEditor";

function EditorForm({ hint, setHint, handleSubmit }) {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <MDEditor hint={hint} setHint={setHint} />
                </div>
            </form>
        </div>
    );
}

export default EditorForm;
