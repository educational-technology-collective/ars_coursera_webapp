import React from 'react';
import {
    Typography,
    Box,
} from '@mui/material';

function ThankYouPage() {
    return (
        <Box p={3} display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="80vh">
            <Typography variant="h4" gutterBottom>
                You have reached the end of this assignment.
            </Typography>

        </Box>
    );
}

export default ThankYouPage;
