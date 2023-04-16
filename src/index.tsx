import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import reset from "styled-reset";
import App from "./App";
import { theme } from "./theme";

const client = new QueryClient();

const GlobalStyle = createGlobalStyle`
    ${reset}

    * {
       box-sizing: border-box;
    }

    a {
        text-decoration:none;
        color:inherit;
    }
`;

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <RecoilRoot>
            <QueryClientProvider client={client}>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <App />
                </ThemeProvider>
            </QueryClientProvider>
        </RecoilRoot>
    </React.StrictMode>
);
