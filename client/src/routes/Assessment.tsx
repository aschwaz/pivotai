import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, TextField, Button, CssBaseline } from '@mui/material';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000/'
});

interface Answer {
  text: string;
  pillar: string;
}

interface AssessmentState {
  questions: string[];
}

function Assessment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { questionIndex } = useParams();
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(parseInt(questionIndex || '0'));
  const [answer, setAnswer] = useState<string>('');
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    const state = location.state as AssessmentState;
    if (state && state.questions) {
      setQuestions(state.questions.filter((question) => question.trim() !== '')); // Filter out empty strings
    } else {
      navigate('/');
    }
  }, [location, navigate]);

  useEffect(() => {
    if (questions.length && questionIndex) {
      setCurrentQuestionIndex(parseInt(questionIndex));
    }
  }, [questions, questionIndex]);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const handleNextQuestion = async () => {
    if (answer.trim() === '') {
      alert('Please provide an answer before continuing.');
      return;
    }

    const newAnswers = [...answers, { text: answer, pillar: questions[currentQuestionIndex].split(': ')[0].trim() }];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      navigate(`/assessment/${nextIndex}`, { state: { questions } });
      setAnswer('');
    } else {
      try {
        // Send the answers to your Flask API using axiosInstance
        const response = await axiosInstance.post('/api/process-answers', { answers: newAnswers });
        navigate('/results', { state: { skillData: response.data } });
      } catch (error) {
        console.error('Error submitting answers:', error);
        alert('There was a problem submitting your answers. Please try again.');
      }
    }
  };

  // Total question count (use questions.length)
  const totalQuestions = questions.length;

  // If we have no questions or are at an invalid question index, redirect or show a message
  if (!questions.length || currentQuestionIndex >= questions.length) {
    return <Typography>No questions available or invalid question index.</Typography>;
  }

  const currentQuestionParts = questions[currentQuestionIndex].split(': ');
  const questionNumber = currentQuestionIndex ;
  const pillarDifficulty = currentQuestionParts[0].trim();
  const questionText = currentQuestionParts.slice(1).join(': ').replace(/^\d+\.\s/, ''); // Remove question number

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
      <CssBaseline />
      <Paper
        elevation={0}
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '650px',
          mt: 4,
        }}
      >
        <Typography variant="h4" component="div" align="center" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Question {questionNumber} of {totalQuestions}
        </Typography>
        <Typography variant="subtitle1" align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: 1 }}>
          {pillarDifficulty}
        </Typography>
        <Typography variant="body1" align="center" sx={{ fontWeight: 400, fontSize: '1.5rem', marginBottom: 2 }}>
          {questionText}
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
          onChange={handleAnswerChange}
        />
        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{ mt: 2, bgcolor: 'black', '&:hover': { bgcolor: 'grey.900' } }}
          onClick={handleNextQuestion}
        >
          {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'Submit Answers'}
        </Button>
      </Paper>
    </Box>
  );
}

export default Assessment;
