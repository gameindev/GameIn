import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router";
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import './styles'
import { GlobalStyles, theme } from './styles/theme';
import { ThemeProvider } from 'styled-components';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ColorSchemeScript />
    <MantineProvider theme={theme} defaultColorScheme="auto" withGlobalStyles withNormalizeCSS >
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </MantineProvider>
  </StrictMode>,
)
