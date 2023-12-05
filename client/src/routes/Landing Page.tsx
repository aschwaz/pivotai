import React from 'react';
import { Box, Paper, TextField, Button, Typography, CssBaseline } from '@mui/material';

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
          maxWidth: 'sm', // Adjust the maxWidth for smaller screens if needed
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
            fontSize: '2rem', // Reduced font size to fit in one line
            maxWidth: '100%', // Ensure the text doesn't exceed the width of its container
          }}
        >
          Transition into Product
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
          minRows={2}
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
