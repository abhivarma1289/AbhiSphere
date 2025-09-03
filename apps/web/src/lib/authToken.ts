import { getAuth } from "firebase/auth";

/** Returns a fresh Firebase ID token (or null if not logged in). */
export async function getIdToken(): Promise<string | null> {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return null;
  try {
    return await user.getIdToken(true);
  } catch {
    return null;
  }
}
