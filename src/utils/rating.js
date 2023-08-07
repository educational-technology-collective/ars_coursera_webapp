import React from "react";
import IconButton from '@mui/material/IconButton';
import MoodIcon from '@mui/icons-material/Mood';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function RatingComponent() {
    const [ifSatisfied, setIfSatisfied] = React.useState(false); // [1
    const [rating, setRating] = React.useState(0);

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };

    return (
        <Grid container spacing={2}>
            <Grid item>
                <IconButton color="primary" onClick={() => setIfSatisfied(true)}>
                    <MoodIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => setIfSatisfied(false)}>
                    <MoodBadIcon />
                </IconButton>
            </Grid>
            <Grid item>
                <Box marginTop={1.1}>
                <Rating name="simple-controlled" value={rating} onChange={handleRatingChange} />
                </Box>
            </Grid>
        </Grid>
    )
}

export default RatingComponent;
