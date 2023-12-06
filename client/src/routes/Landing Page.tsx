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

  const handleGetStarted = async () => {
    try {
      const response = await fetch('/api/generate_plan', { // Changed the API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });

      if (response.ok) {
        const data = await response.json();
        navigate('/plan');
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
          maxWidth: 480,
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
            fontSize: '2.4rem',
            lineHeight: '0.3',
          }}
        >
          Transition Into Product
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ fontWeight: 400, fontSize: '1.25rem', mt: 1, mb: 4 }}
        >
          With a personalized, actionable plan
        </Typography>
        <TextField
          fullWidth
          variant="filled"
          label="What do you currently do for work? Be as descriptive as possible!"
          margin="normal"
          multiline
          minRows={1}
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
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
      </Paper>
    </Box>
  );
}

export default LandingPage;
