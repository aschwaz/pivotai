import React from 'react';
import { Box, Paper, TextField, Button, Typography, CssBaseline } from '@mui/material';
import 'fontsource-inter/latin.css';  // Importing Inter font

function LandingPage() {
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
          top: 30, // Adjust as needed
          left: 50, // Adjust as needed
          fontFamily: 'Inter, sans-serif',
          fontSize: '1.75rem',
          color: 'black',
          m: 2, // Add margin for spacing
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
            lineHeight: '0.3', // Add this line to ensure single line display
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
          sx={{
            '.MuiFilledInput-root': {
              bgcolor: 'background.paper',
              '&:hover': {
                bgcolor: 'background.paper',
              },
              '&.Mui-focused': {
                bgcolor: 'background.paper',
              },
            },
          }}
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
        >
          Get Started
        </Button>
      </Paper>
    </Box>
  );
}

export default LandingPage;
