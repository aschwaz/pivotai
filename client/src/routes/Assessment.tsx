import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, TextField, Button, CssBaseline } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

interface Question {
  id: string;
  content: string;
  pillar: string;
  difficulty: string;
}

function Assessment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const allQuestions = location.state?.questions.choices[0].message.content || '';
    const parseQuestions = (questionsText: string): Question[] => {
      const lines = questionsText.split('\n');
      const questions: Question[] = [];
      for (const line of lines) {
        const matches = line.match(/^(\d+)\.\s\(([^,]+),\s([^)]+)\)\s(.*)/);
        if (matches && matches.length === 5) {
          const [_, id, difficulty, pillar, content] = matches;
          questions.push({
            id,
            content,
            pillar,
            difficulty,
          });
        }
      }
      return questions;
    };

    setQuestions(parseQuestions(allQuestions));
  }, [location.state]);

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
          Question {currentQuestion.id}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          align="center"
          sx={{ fontWeight: 'bold' }}
        >
          {currentQuestion.difficulty}, {currentQuestion.pillar}
        </Typography>
        <Box sx={{ height: 24 }} />
        <Typography
          variant="body1"
          align="center"
          sx={{ fontWeight: 400, fontSize: '1rem', marginBottom: 2 }}
        >
          {currentQuestion.content}
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
