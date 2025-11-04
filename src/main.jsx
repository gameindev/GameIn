import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './shared/styles/index.js'
import App from './app/App.jsx'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ThemeProvider } from 'styled-components'
import { Notifications } from "@mantine/notifications";
import { theme } from './shared/styles/theme/customTheme.js'
import { GlobalStyles } from './shared/styles/theme/globalTheme.js'
import StoreProvider from './app/providers/StoreProvider.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './app/store/index.js'

createRoot(document.getElementById('root')).render(
    <>
        <ColorSchemeScript />
        <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_CLIENT_ID}>
            <MantineProvider
                theme={theme}
                defaultColorScheme="dark"
                withGlobalStyles
                withNormalizeCSS
            >
                <Notifications />
                <ThemeProvider theme={theme}>
                    <GlobalStyles />
                    <StoreProvider>
                        <PersistGate loading={null} persistor={persistor}>
                            <App />
                        </PersistGate>
                    </StoreProvider>
                </ThemeProvider>
            </MantineProvider>
        </GoogleOAuthProvider>
    </>,
)
