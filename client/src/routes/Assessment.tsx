import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, TextField, Button, CssBaseline } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

interface Question {
  id: string;
  content: string;
}

function Assessment() {
  const navigate = useNavigate();
  const location = useLocation<{ state: { questions: { choices: { message: { content: string } }[] } } }>();
  const allQuestions = location.state.questions.choices[0].message.content;

  const parseQuestions = (questionsText: string): Question[] => {
    const lines = questionsText.split('\n');
    const questions: Question[] = [];
    let currentQuestion: Question | null = null;

    for (const line of lines) {
      if (line.match(/^\d+\./)) {
        // New question detected
        if (currentQuestion) {
          questions.push(currentQuestion);
        }
        const content = line.replace(/^\d+\./, '').trim();
        currentQuestion = {
          id: `question-${questions.length}`,
          content,
        };
      } else if (currentQuestion) {
        // Append to the current question
        currentQuestion.content += `\n${line}`;
      }
    }

    if (currentQuestion) {
      questions.push(currentQuestion);
    }

    return questions;
  };

  const [questions, setQuestions] = useState<Question[]>(parseQuestions(allQuestions));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answer, setAnswer] = useState<string>('');

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setAnswer(''); // Reset the answer field when moving to the next question
    } else {
      navigate('/results'); // Navigate to the results page after the last question
    }
  };

  if (questions.length === 0 || currentQuestionIndex >= questions.length) {
    return null; // Or return a loading indicator or appropriate UI
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
          variant="h6"
          component="h2"
          align="center"
          sx={{ fontWeight: 500, mt: 1, mb: 2 }}
        >
          Question {currentQuestionIndex + 1}
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ fontWeight: 400, fontSize: '1rem', mt: 1, mb: 4 }}
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
