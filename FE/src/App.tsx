// src/App.tsx
import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import DrawerAppBar from './components/NavBar';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>

      <Router>
        <CssBaseline />
        <DrawerAppBar checked={isDarkMode} setChecked={setIsDarkMode} />
        <div>
          <Box component="main" sx={{ flexGrow: 1, mt: '64px' }}>
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/home" Component={Home} />
              <Route path="/projects" Component={Projects} />
              <Route path="/blog" Component={Blog} />
              <Route path="*" Component={NotFound} />
            </Routes>
          </Box>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
