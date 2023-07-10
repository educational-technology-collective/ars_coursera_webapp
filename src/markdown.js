import React from "react";
import MDEditor from '@uiw/react-md-editor';

function MarkdownEditor({hint, setHint}) {

  return (
    <div className="container">
      <MDEditor
        value={hint}
        onChange={setHint}
      />
    </div>
  );
}

export default MarkdownEditor;
