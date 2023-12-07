import React, { useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useLocation } from "react-router-dom";

function Recommendation() {
  const location = useLocation();
  const new_recommendation = location.state;

  useEffect(() => {
    console.log(new_recommendation);
  }, []); 

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
          Your Personalized Recommendation
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ fontSize: '1.25rem', mt: 2, mb: 4 }}
        >
          {new_recommendation.recommendation}
        </Typography>
      </Paper>
    </Box>
  );
}

export default Recommendation;