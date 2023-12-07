import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

function Assessment() {
  const { pillar } = useParams(); // Assuming `pillar` is always a string.
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');
  const [questions, setQuestions] = useState([]);

  // Parse `questionIndex` safely, ensuring that it's a valid number before using it.
  const questionIndex = parseInt(useParams().questionIndex || '', 10);
  const totalQuestions = questions.length;

  // Fetch questions whenever `pillar` changes.
  useEffect(() => {
    fetch(`/api/assessment_questions/${pillar}`)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.questions);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, [pillar]);

  // Redirect if `questionIndex` is out of bounds.
  useEffect(() => {
    if (isNaN(questionIndex) || questionIndex > totalQuestions || questionIndex <= 0) {
      navigate('/thank-you');
    }
  }, [questionIndex, navigate, totalQuestions]);

  // Function to handle navigating to the next question.
  const handleNextQuestion = () => {
    if (questionIndex < totalQuestions) {
      navigate(`/assessment/${pillar}/${questionIndex + 1}`);
    } else {
      // If it's the last question, navigate to a 'results' page or similar
      navigate('/results');
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
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 1000,
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
          }}
        >
          {pillar} Pillar Assessment
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ fontSize: '1.25rem', mt: 2, mb: 4 }}
        >
          Question {isNaN(questionIndex) ? '' : questionIndex}:
          <br />
          {questions[questionIndex - 1]}
        </Typography>
        <TextField
          fullWidth
          variant="filled"
          label="Your Answer"
          margin="normal"
          multiline
          minRows={2}
          maxRows={4}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{
            mt: 2,
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
          onClick={handleNextQuestion}
        >
          Next Question
        </Button>
      </Paper>
    </Box>
  );
}

export default Assessment;

