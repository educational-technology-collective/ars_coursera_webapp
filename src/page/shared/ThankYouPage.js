import React from 'react';
import {
    Typography,
    Box,
} from '@mui/material';

function ThankYouPage() {
    return (
        <Box p={3} display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="80vh">
            <Typography variant="h4" gutterBottom>
                Thank You for Your Participation!
            </Typography>

            <Typography paragraph style={{ fontSize: 18, textAlign: 'center' }}>
                Your responses have been successfully recorded. We appreciate the time you took to complete the survey.
            </Typography>

            <Typography paragraph style={{ fontSize: 18, textAlign: 'center' }}>
                Your feedback is valuable and helps us in continuous improvement. We hope you have a great day!
            </Typography>

        </Box>
    );
}

export default ThankYouPage;
