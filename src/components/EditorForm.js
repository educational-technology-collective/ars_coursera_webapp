import React from 'react';
import MyMDEditor from "./MyMDEditor";

function EditorForm({ hint, setHint}) {
    return (
        <div>
            <MyMDEditor hint={hint} setHint={setHint} />
        </div>
    );
}

export default EditorForm;
