import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "./styles";
import { GlobalStyles, theme } from "./styles/theme";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { persistor, store } from "./stores/store.js";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ColorSchemeScript />
        <MantineProvider
            theme={theme}
            defaultColorScheme="auto"
            withGlobalStyles
            withNormalizeCSS
        >
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <App />
                    </PersistGate>
                </Provider>
            </ThemeProvider>
        </MantineProvider>
    </StrictMode>
);
