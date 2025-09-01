import { useState } from "react";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { signup } from "../../utils/auth";
import GoogleButton from "./GoogleButton";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await signup(email, password);
      alert("Signed up!");
    } catch (e) {
      alert((e as Error).message);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 6 }}>
      <Typography variant="h5" gutterBottom>Sign Up</Typography>
      <Stack spacing={2}>
        <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <TextField type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button variant="contained" onClick={handleSignup}>Sign Up</Button>
        <GoogleButton />
      </Stack>
    </Container>
  );
}
