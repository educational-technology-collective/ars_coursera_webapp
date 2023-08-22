import React, { useState } from "react";
import {
    Button,
    TextField,
    Box,
    Typography,
    Paper,
    Container
} from '@mui/material';

function hashEmail(email) {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = (hash << 5) - hash + email.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function EmailForm() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const hashedValue = hashEmail(email);
        const route = ['/intro1', '/intro2', '/intro3'][hashedValue % 3];
        window.location.href = route;
    };

    return (
        <Container component={Paper} maxWidth="sm" style={{ padding: '24px', marginTop: '50px' }}>
            <Typography variant="h4" gutterBottom>
                Email Input
            </Typography>
            <Box component="form" onSubmit={handleSubmit} spacing={2}>
                <TextField
                    fullWidth
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your-email@umich.edu"
                    label="University Email"
                    pattern="[a-zA-Z0-9._%+-]+@umich\.edu"
                    required
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ marginTop: '20px' }}
                >
                    Submit
                </Button>
            </Box>
        </Container>
    );
}

export default EmailForm;
