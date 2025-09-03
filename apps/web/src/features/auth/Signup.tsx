import { useState } from "react";
import { TextField, Button, Stack, Typography, Alert } from "@mui/material";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      setError(err?.message ?? "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Stack spacing={2} sx={{ maxWidth: 420, mx: "auto", mt: 8 }}>
      <Typography variant="h4" fontWeight={700}>Sign up</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Stack component="form" onSubmit={handleSignup} spacing={2}>
        <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} type="email" required />
        <TextField label="Password" value={pass} onChange={e => setPass(e.target.value)} type="password" required />
        <Button type="submit" variant="contained" disabled={loading}>Create account</Button>
      </Stack>
      <Typography variant="body2">
        Already have an account? <Link to="/login">Login</Link>
      </Typography>
    </Stack>
  );
}
