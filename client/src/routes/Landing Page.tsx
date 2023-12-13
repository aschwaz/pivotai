import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  CssBaseline,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStartAssessment = async () => {
    setLoading(true);
    try {
      const response = await fetch('api/generate_questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });
  
      if (response.ok) {
        const new_questions = await response.json();
        console.log('Questions from API:', new_questions);
        navigate('/assessment', { state: { questions: new_questions } });
      } else {
        throw new Error('API request failed with status ' + response.status);
      }
    } catch (error) {
      console.error('Error in handleStartAssessment:', error);
      // Handle error, potentially set an error state and display a message to the user
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

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

