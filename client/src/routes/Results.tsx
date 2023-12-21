import React from 'react';
import { Radar } from 'react-chartjs-2';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Paper, CssBaseline, Button } from '@mui/material';

interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
}

interface SkillData {
  labels: string[];
  datasets: Dataset[];
}

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const skillData = location.state?.skillData as SkillData;

  if (!skillData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const allScoresAreZero = skillData.datasets.every((dataset: Dataset) =>
    dataset.data.every((value: number) => value === 0)
  );

  if (allScoresAreZero) {
    return <Typography align="center" sx={{ fontFamily: 'Inter, sans-serif', color: 'text.primary' }}>No skills data available. All scores are zero.</Typography>;
  }

  const chartOptions = {
    scale: {
      ticks: {
        beginAtZero: true,
        max: 10,
        backdropColor: 'transparent',
        color: 'black',
        font: {
          size: 16 // Adjust the size as necessary
        }
      },
      pointLabels: {
        font: {
          size: 22 // Increased size of the pillar labels
        },
        color: 'black',
      },
      angleLines: {
        color: 'rgba(0, 0, 0, 0.1)' // Style the angle lines to match your theme
      },
      gridLines: {
        color: 'rgba(0, 0, 0, 0.1)' // Style the grid lines to match your theme
      }
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide the legend if not required
      },
    },
    layout: {
      padding: {
        top: 20 // Adjust the padding to move the title up
      }
    }
  };

  const handleRestart = () => {
    navigate("/"); // Navigate to the landing page route
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'flex-start',
        bgcolor: 'background.default',
        color: 'text.primary',
        pt: 3,
        position: 'relative',
      }}
    >
      <CssBaseline />
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '2.5rem',
          color: 'black',
          mt: 2, // Adjust top margin as needed
          mb: 2,
          alignSelf: 'center',
          fontWeight: 'bold', // Make the title bold
        }}
      >
        User Skill Graph
      </Typography>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 'lg',
          bgcolor: 'background.paper',
          mt: 2, // Reduced top margin to move the content up
        }}
      >
        <Box sx={{ height: '70vh', width: '95%', maxWidth: '1100px', my: 2 }}> {/* Adjust my for the spacing around the chart */}
          <Radar data={skillData} options={chartOptions} />
        </Box>
        <Button
          variant="contained"
          size="large"
          sx={{
            mt: -2, // Move the button up by giving it a negative top margin
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
};

export default Results;
