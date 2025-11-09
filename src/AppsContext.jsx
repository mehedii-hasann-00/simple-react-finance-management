// src/AppsContext.jsx
import { createContext, useState, useEffect } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import { auth } from "./firebase/firebase.init";

export const AppsContext = createContext();

const googleProvider = new GoogleAuthProvider();

export function AppsProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // listen for auth state
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoadingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  // SIGN UP with email/password, then update displayName + photo
  const createUser = async (name, photoURL, email, password) => {
    setLoadingAuth(true);
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    // Update Firebase profile with name + photo
    await updateProfile(cred.user, {
      displayName: name,
      photoURL: photoURL,
    });

    // Make sure context user also has these values
    setUser({
      ...cred.user,
      displayName: name,
      photoURL: photoURL,
    });

    setLoadingAuth(false);
    return cred.user;
  };

  // LOGIN with email/password
  const loginUser = async (email, password) => {
    setLoadingAuth(true);
    const cred = await signInWithEmailAndPassword(auth, email, password);
    setUser(cred.user);
    setLoadingAuth(false);
    return cred.user;
  };

  // LOGIN with Google
  const googleLogin = async () => {
    setLoadingAuth(true);
    const cred = await signInWithPopup(auth, googleProvider);
    setUser(cred.user);
    setLoadingAuth(false);
    return cred.user;
  };

  // LOGOUT
  const logoutUser = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AppsContext.Provider
      value={{
        user,
        setUser,
        loadingAuth,
        createUser,     // signup
        loginUser,      // email login
        googleLogin,    // google login
        logoutUser,     // logout
      }}
    >
      {children}
    </AppsContext.Provider>
  );
}
