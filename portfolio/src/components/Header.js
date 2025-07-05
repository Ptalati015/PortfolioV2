import React from 'react';
import { AppBar, Toolbar, Typography, Switch } from '@mui/material';

const Header = ({ handleThemeChange, darkMode }) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Preet Talati
        </Typography>
        <Switch checked={darkMode} onChange={handleThemeChange} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;