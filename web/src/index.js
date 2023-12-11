import App from "app/App";
import { StoreProvider } from "app/provider/StoreProvider";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./app/styles/index.scss";
import "@fontsource/source-sans-pro";
import "@fontsource/source-sans-pro/600.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <StoreProvider>
            <App />
        </StoreProvider>
    </BrowserRouter>
);
