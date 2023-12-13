import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CssBaseline,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function Assessment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    // Assume location.state has the correct structure: { questions: { questions: ... } }
    const allQuestionsText = location.state?.questions?.questions?.choices?.[0]?.message?.content;

    if (allQuestionsText) {
      // Split the text by newlines to get individual questions
      const parsedQuestions = allQuestionsText.split('\n').filter((line) => line.trim() !== '');

      if (parsedQuestions.length > 0) {
        setQuestions(parsedQuestions);
      }
    }
  }, [location]);

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setAnswer('');
    } else {
      navigate('/results');
    }
  };

  if (questions.length === 0 || currentQuestionIndex >= questions.length) {
    return <Typography>No questions available.</Typography>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const questionParts = currentQuestion.split(') ');

  // Remove the "1.(" from the category
  const category = questionParts[0].replace(/^[0-9]+\.\s*\(/, '');

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
          component="div"
          align="center"
          sx={{ fontWeight: 'bold', marginBottom: 2 }}
        >
          Question {currentQuestionIndex + 1}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: 1 }}
        >
          {category}
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ fontWeight: 400, fontSize: '1rem', marginBottom: 2 }}
        >
          {questionParts[1]}
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
          sx={{ mt: 2, bgcolor: 'black', '&:hover': { bgcolor: 'grey.900' } }}
          onClick={handleNextQuestion}
        >
          Next Question
        </Button>
      </Paper>
    </Box>
  );
}

export default Assessment;
