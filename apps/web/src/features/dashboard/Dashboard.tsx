import { Button, Typography } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";

export default function Dashboard() {
  const auth = getAuth();

  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h4">Welcome to your Dashboard 🚀</Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => signOut(auth)}
        style={{ marginTop: 16 }}
      >
        Logout
      </Button>
    </div>
  );
}
