import {
  Button, Container, CssBaseline, Typography,
  createTheme, ThemeProvider, Box, Stack, Alert, CircularProgress
} from "@mui/material";
import { useEffect, useState } from "react";
import { getHealth } from "./lib/health";
import type { Health } from "./lib/health";

const theme = createTheme({
  palette: { mode: "light", primary: { main: "#1976d2" } },
});

export default function App() {
  const [status, setStatus] = useState<"idle"|"loading"|"ok"|"error">("idle");
  const [data, setData] = useState<Health | null>(null);
  const [err, setErr] = useState<string>("");

  useEffect(() => {
    setStatus("loading");
    getHealth()
      .then((d) => { setData(d); setStatus("ok"); })
      .catch((e) => { setErr(String(e)); setStatus("error"); });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", py: 8 }}>
        <Container maxWidth="sm">
          <Typography variant="h4" fontWeight={600} gutterBottom>
            AbhiSphere — Web (MUI only)
          </Typography>

          {status === "loading" && (
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <CircularProgress size={20} /> <Typography>Checking API…</Typography>
            </Stack>
          )}
          {status === "ok" && <Alert severity="success" sx={{ mb: 2 }}>
            API OK: {JSON.stringify(data)}
          </Alert>}
          {status === "error" && <Alert severity="error" sx={{ mb: 2 }}>
            API error: {err}
          </Alert>}

          <Stack direction="row" spacing={2}>
            <Button variant="contained">MUI Contained</Button>
            <Button variant="outlined">MUI Outlined</Button>
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
