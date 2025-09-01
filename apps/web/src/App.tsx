import { CssBaseline, Container, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";

export default function App() {
  const [tab, setTab] = useState(0);

  return (
    <>
      <CssBaseline />
      <Container sx={{ py: 4 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
        {tab === 0 && <Login />}
        {tab === 1 && <Signup />}
      </Container>
    </>
  );
}
