// src/theme.ts
import { createTheme, ThemeOptions } from '@mui/material/styles';

const commonSettings: ThemeOptions = {
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    padding: '10px 20px',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                },
            },
        },
    },
};

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#2F3C7E', // Updated primary color
        },
        secondary: {
            main: '#FBEAEB', // Updated secondary color
        },
        background: {
            default: '#11111', // Light gray background
            paper: '#fff',
        },
    },
    ...commonSettings,
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#FFF', // Light blue primary color for dark mode
        },
        secondary: {
            main: '#CADCFC', // Light orange secondary color for dark mode
        },
        background: {
            default: '#121212',
            paper: '#1d1d1d',
        },
    },
    ...commonSettings,
});

export { lightTheme, darkTheme };
