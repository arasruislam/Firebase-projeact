import React, { createContext, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "./../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null);
    
    /* Create/register user */
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    /* Sign in user */
    const singIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

  const authInfo = {
    user,
    createUser,
    singIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
