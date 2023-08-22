import React from 'react';
import Button from '@mui/material/Button';

function ToggleButtonGroup({ showChatGPTHint, setShowChatGPTHint }) {
    return (
        <div>
            <Button onClick={() => setShowChatGPTHint(!showChatGPTHint)}>
                Show ChatGPT Hint
            </Button>
        </div>
    );
}

export default ToggleButtonGroup;
