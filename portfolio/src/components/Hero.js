import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const Hero = () => {
  return (
    <Box
      className="text-center p-10"
      sx={{
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        color: 'white',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        Preet Talati
      </Typography>
      <Typography variant="h5" component="p" gutterBottom>
        Results-driven Software Developer
      </Typography>
      <Button variant="contained" color="secondary" href="mailto:talatipreet@gmail.com">
        Contact Me
      </Button>
    </Box>
  );
};

export default Hero;