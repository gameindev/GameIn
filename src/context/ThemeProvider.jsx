import { createContext, useState, useEffect, useCallback, useContext } from "react";
import { darkTheme, lightTheme, GlobalStyles } from "../components/styles";
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
    const getInitialThemeMode = () => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            const systemDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
            return savedTheme || (systemDark ? 'dark' : 'light');
        }
        return 'light';
    };

    const [themeMode, setThemeMode] = useState(getInitialThemeMode);
    const theme = themeMode === 'dark' ? darkTheme : lightTheme;

    useEffect(() => {
        localStorage.setItem('theme', themeMode);
        document.documentElement.classList.toggle('dark', themeMode === 'dark');
    }, [themeMode]);

    const toggleTheme = useCallback(() => {
        setThemeMode(prev => (prev === 'light' ? 'dark' : 'light'));
    }, []);

    return (
        <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
            <StyledThemeProvider theme={theme}>
                <GlobalStyles />
                {children}
            </StyledThemeProvider>
        </ThemeContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
