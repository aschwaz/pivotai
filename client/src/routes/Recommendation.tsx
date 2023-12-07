import React, { useEffect } from 'react';
import { Box, Paper, Typography, CssBaseline, Button } from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";

function Recommendation() {
  const location = useLocation();
  const new_recommendation = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    console.log(new_recommendation);
  }, []); 

  const handleRestart = () => {
    navigate('/');
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
        elevation={3}
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 800, // Adjust the width as needed
          mt: 4,
          borderRadius: '12px', // Add some border radius for a card-like appearance
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
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
            color: 'black', // Customize the title color
          }}
        >
          Your Personalized Recommendation
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ fontSize: '1.25rem', mt: 2, mb: 4 }}
        >
          {new_recommendation.recommendation}
        </Typography>
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
          onClick={handleRestart}
        >
          Restart
        </Button>
      </Paper>
    </Box>
  );
}

export default Recommendation;
