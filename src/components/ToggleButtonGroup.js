import React from 'react';
import Button from '@mui/material/Button';

function ToggleButtonGroup({ showIntro, setShowIntro, showChatGPTHint, setShowChatGPTHint }) {
    return (
        <div>
            <Button onClick={() => setShowIntro(!showIntro)}>
                Toggle Introduction
            </Button>
            <Button onClick={() => setShowChatGPTHint(!showChatGPTHint)}>
                Toggle ChatGPT Hint / Mistake List
            </Button>
        </div>
    );
}

export default ToggleButtonGroup;
