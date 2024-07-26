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
                // containedPrimary: {
                //     backgroundColor: '#1976d2', // Updated primary color
                //     color: '#fff',
                //     '&:hover': {
                //         backgroundColor: '#1565c0', // Updated hover color
                //     },
                // },
                // containedSecondary: {
                //     backgroundColor: '#f57c00', // Updated secondary color
                //     color: '#fff',
                //     border: 'none',
                //     '&:hover': {
                //         backgroundColor: '#ef6c00', // Updated hover color
                //     },
                // },
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
            main: '#00246B', // Light blue primary color for dark mode
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
