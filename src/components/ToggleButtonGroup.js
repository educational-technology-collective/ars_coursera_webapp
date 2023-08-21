import React from 'react';
import Button from '@mui/material/Button';

function ToggleButtonGroup({ showChatGPTHint, setShowChatGPTHint }) {
    return (
        <div>
            <Button onClick={() => setShowChatGPTHint(!showChatGPTHint)}>
                Toggle ChatGPT Hint / Mistake List
            </Button>
        </div>
    );
}

export default ToggleButtonGroup;
