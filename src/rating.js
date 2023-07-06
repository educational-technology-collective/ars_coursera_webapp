import React from "react";
import IconButton from '@mui/material/IconButton';
import MoodIcon from '@mui/icons-material/Mood';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import Slider from '@mui/material/Slider';
import Rating from '@mui/material/Rating';

function RatingComponent() {
    const [rating, setRating] = React.useState(0);
    const [sliderValue, setSliderValue] = React.useState(0);

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
    };

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };

    return (
        <div>
            <div>
                <IconButton color="primary" onClick={() => alert('Happy face clicked')}>
                    <MoodIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => alert('Sad face clicked')}>
                    <MoodBadIcon />
                </IconButton>
            </div>
            <div>
                <Slider value={sliderValue} onChange={handleSliderChange} aria-labelledby="input-slider" />
            </div>
            <div>
                <Rating name="simple-controlled" value={rating} onChange={handleRatingChange} />
            </div>
        </div>
    )
}

export default RatingComponent;
