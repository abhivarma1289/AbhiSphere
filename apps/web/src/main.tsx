import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "./emotionCache";
import "./global.css"; // optional plain CSS file for small tweaks
import { AppThemeProvider } from "./theme/ThemeProvider";

const cache = createEmotionCache();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CacheProvider value={cache}>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </CacheProvider>
  </React.StrictMode>
);
import { getIdToken } from "./utils/auth";

// @ts-expect-error debug helper
window.getToken = async () => await getIdToken();

// @ts-expect-error debug helper
window.pingHealth = async () => {
  const t = await getIdToken();
  if (!t) return "Not logged in";
  const r = await fetch("http://localhost:8080/health", {
    headers: { Authorization: `Bearer ${t}` },
  });
  return { status: r.status, body: await r.json() };
};

