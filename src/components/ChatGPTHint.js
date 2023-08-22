import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import ChatIcon from '@mui/icons-material/Chat';

function ChatGPTHint({ showChatGPTHint }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '20px 0' }}>
            {showChatGPTHint && (
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Avatar>
                        <ChatIcon />
                    </Avatar>
                    <Paper elevation={3} style={{ marginLeft: 10, padding: '10px 20px', borderRadius: 20, position: 'relative', backgroundColor: '#e1f5fe' }}>
                        <Typography style={{ fontWeight: 'bold' }}>
                            ChatGPT:
                        </Typography>
                        <Typography style={{ marginTop: 5 }}>
                            This is where ChatGPT's hint will appear.
                        </Typography>
                    </Paper>
                </div>
            )}
        </div>
    );
}

export default ChatGPTHint;
