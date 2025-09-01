import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "./emotionCache";
import "./global.css"; // optional plain CSS file for small tweaks

const cache = createEmotionCache();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CacheProvider value={cache}>
      <App />
    </CacheProvider>
  </React.StrictMode>
);
