import { useState } from "react";
import { TextField, Button, Stack, Typography, Alert } from "@mui/material";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      setError(err?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      setError(err?.message ?? "Google login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Stack spacing={2} sx={{ maxWidth: 420, mx: "auto", mt: 8 }}>
      <Typography variant="h4" fontWeight={700}>Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Stack component="form" onSubmit={handleEmailLogin} spacing={2}>
        <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} type="email" required />
        <TextField label="Password" value={pass} onChange={e => setPass(e.target.value)} type="password" required />
        <Button type="submit" variant="contained" disabled={loading}>Login</Button>
      </Stack>

      <Button variant="outlined" onClick={handleGoogle} disabled={loading}>
        Continue with Google
      </Button>

      <Typography variant="body2">
        Don’t have an account? <Link to="/signup">Sign up</Link>
      </Typography>
    </Stack>
  );
}
