import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "./../firebase/firebase.config";

/* Context api */
export const AuthContext = createContext(null);

/* Firebase Auth and Provider */
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* Create/register user */
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  /* Sign in user */
  const singIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  /* Google Sign in */
  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  /* user state set */
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe;
    };
  }, []);

  /* Sign Out */
  const logOut = () => {
    return signOut(auth);
  };

  const authInfo = {
    user,
    loading,
    createUser,
    singIn,
    googleSignIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
