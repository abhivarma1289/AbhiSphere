import { useState } from "react";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { login } from "../../utils/auth";
import GoogleButton from "./GoogleButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      alert("Logged in!");
    } catch (e) {
      alert((e as Error).message);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 6 }}>
      <Typography variant="h5" gutterBottom>Login</Typography>
      <Stack spacing={2}>
        <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <TextField type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button variant="contained" onClick={handleLogin}>Login</Button>
        <GoogleButton />
      </Stack>
    </Container>
  );
}
