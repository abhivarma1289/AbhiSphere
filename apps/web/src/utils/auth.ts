import { auth } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export async function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signup(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function loginWithGoogle() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}

export async function logout() {
  return signOut(auth);
}

export async function getIdToken() {
  const user = auth.currentUser;
  return user ? user.getIdToken() : null;
}
