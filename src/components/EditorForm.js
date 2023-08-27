import React from 'react';
import MyMDEditor from "./MDEditor";

function EditorForm({ hint, setHint}) {
    return (
        <div>
            <MyMDEditor hint={hint} setHint={setHint} />
        </div>
    );
}

export default EditorForm;
