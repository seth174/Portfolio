// src/App.tsx
import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Switch } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import Button from '@mui/material/Button';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import DrawerAppBar from './components/NavBar';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>

      <Router>
        <CssBaseline />
        <DrawerAppBar checked={isDarkMode} setChecked={setIsDarkMode} />
        <div style={{ marginTop: '70px' }}>
          <Button variant="contained" color="primary" onClick={toggleTheme}>
            Toggle Theme
          </Button>
          <Button variant="contained" color="secondary">
            Secondary Button
          </Button>
        </div>
        <div>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/about" Component={About} />
            <Route path="/contact" Component={Contact} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
