import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Header handleThemeChange={handleThemeChange} darkMode={darkMode} />
      <main>
        <Hero />
        {/* <About />
        <Experience />
        <Skills />
        <Projects />
        <Education /> */}
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;