import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { loginWithGoogle } from "../../utils/auth";

export default function GoogleButton() {
  return (
    <Button
      fullWidth
      variant="outlined"
      startIcon={<GoogleIcon />}
      onClick={async () => {
        try {
          await loginWithGoogle();
        } catch (e) {
          alert((e as Error).message);
        }
      }}
    >
      Continue with Google
    </Button>
  );
}
