import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  CssBaseline,
} from '@mui/material';
import 'fontsource-inter/latin.css'; // Importing Inter font
import { Link, useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState<string>('');

  const handleStartAssessment = async () => {
    let response;
    console.log("trying")
    try {
      response = await fetch('api/generate_questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });
  
      if (response.ok) {
        const new_questions = await response.json();
        console.log("whats happening")
        console.log(new_questions);
        navigate('/assessment', { state: new_questions });
      } else {
        console.error('API request failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

// MOVE TO ASSESSMENT PAGE
  const handleGetStarted = async () => {
    // Check that user has inputted some text into the input field.
    // If not, render a warning that the form field is empty.
    // If so, submit the form using a Fetch API call to `/api/generate_recommendation`.
    try {
      const response = await fetch('/api/generate_recommendation', { // Changed the API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });

      if (response.ok) {
        const new_recommendation = await response.json();
        // console.log("We got some juicy data!");
        // console.log(new_recommendation)
        // console.log("Whoooooo!")
        navigate('/recommendation', { state: new_recommendation });
      } else {
        console.error('API request failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        p: 3,
        position: 'relative',
      }}
    >
      <CssBaseline />
      <Typography
        sx={{
          position: 'absolute',
          top: 30,
          left: 50,
          fontFamily: 'Inter, sans-serif',
          fontSize: '1.75rem',
          color: 'black',
          m: 2,
        }}
      >
        Roadmap.ai
      </Typography>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 650,
          mt: 4,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{
            fontWeight: 700,
            fontSize: '2.5rem',
            lineHeight: '0.3',
          }}
        >
          Assess Your Product Intuition
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ fontWeight: 400, fontSize: '1.4rem', mt: 1, mb: 4 }}
        >
          See your strengths and use them to break into industry
        </Typography>
        <TextField
          fullWidth
          variant="filled"
          label="What are you skilled in now? And what type of products do you want to build?"
          margin="normal"
          multiline
          minRows={2}
          maxRows={4}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{
            mt: 2,
            bgcolor: 'black',
            '&:hover': {
              bgcolor: 'grey.900',
            },
          }}
          onClick={handleStartAssessment}
        >
          Get Started
        </Button>
      </Paper>
    </Box>
  );
}

export default LandingPage;
