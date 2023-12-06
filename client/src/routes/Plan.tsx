import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';

function Plan() {
  const [planData, setPlanData] = useState<string[]>([]);

  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        const response = await fetch('/api/generate_plan');
        if (response.ok) {
          const data = await response.json();
          setPlanData([data.plan]);
        } else {
          console.error('API request failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPlanData();
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
          }}
        >
          Your Step-by-Step Plan
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ fontSize: '1.25rem', mt: 2, mb: 4 }}
        >
          {planData.map((step, index) => (
            <div key={index}>
              {step}
              <br />
            </div>
          ))}
        </Typography>
      </Paper>
    </Box>
  );
}

export default Plan;
