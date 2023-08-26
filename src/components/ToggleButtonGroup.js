import React from 'react';
import Button from '@mui/material/Button';

function ToggleButtonGroup({ showChatGPTHint, setShowChatGPTHint }) {
    return (
        <div>
            <Button
                onClick={() => setShowChatGPTHint(!showChatGPTHint)}
                variant="contained"
                style={{ backgroundColor: showChatGPTHint ? 'grey' : '#00cc66', color: 'white' }}
            >
                {showChatGPTHint ? 'Hide ChatGPT Hint' : 'Show ChatGPT Hint'}
            </Button>
        </div>
    );
}

export default ToggleButtonGroup;
