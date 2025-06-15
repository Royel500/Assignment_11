import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {  GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createUserWithEmailAndPassword,  } from 'firebase/auth';
import { auth } from '../Firebase/FireBase';

const google = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user , setUser] = useState(null);

  //  Create User
const createUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// -----Google-----------

const googleMama = () =>{
  setLoading(true);
  return signInWithPopup(auth,google);
}

  // Login
  const logIn = (email, password) => {

    return signInWithEmailAndPassword( auth,email, password);
  };

// -------SignOut--------

const logOut = () =>{
  setLoading(true);
  return signOut(auth);
};

// --------user -----------

 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, currentUser => {
    setUser(currentUser);
    setLoading(false);

    if (currentUser) {
      const userInfo = {
        email: currentUser.email,
        displayName: currentUser.displayName || "Anonymous",
        photoURL: currentUser.photoURL || ""
      };
      localStorage.setItem("user", JSON.stringify(userInfo));
    } else {
      localStorage.removeItem("user");
    }
  });
  return () => unsubscribe();
}, []);


// --------shear---------
  const authInfo = {
    loading,
        user,
    createUser,
    logIn,
    googleMama,
    logOut,

  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
