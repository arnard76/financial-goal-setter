import React, { useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateEmail as updateEmailFirebase,
  updatePassword as updatePasswordFirebase,
} from "firebase/auth";
import { auth } from "../firebase";

// context for this component is called AuthContext - being explicit always good
const AuthContext = React.createContext();

// if imported, this function gives access to all of AuthContext/which may
// or may not be accessible to their scope. This is the context consumer.
// (CLUE: gives access to authDetails variable below)
export function useAuth() {
  return useContext(AuthContext);
}

// returns the auth details/processes live
export function AuthProvider({ children }) {
  // this is how to add a variable to state in functional components
  // this could change and will rerender this component (just like class components)
  // the 1st arg is the variable and the 2nd is the function to call to update variable
  // optional could put initial state of variable as arg of useState func
  const [currentUser, setCurrentUser] = useState();

  // firebase has not yet authenticated user so currently in loading state
  const [loading, setLoading] = useState(true);

  // function creates a user with given email and pass using firebase auth
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
    // return sendEmailVerification()
  }

  // function signs in a user with given email and pass using firebase auth
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // function logouts the current user
  function logout() {
    return signOut(auth);
  }

  // function that sends reset password email
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  // function that updates email
  function updateEmail(email) {
    return updateEmailFirebase(currentUser, email);
  }
  // function that updates password
  function updatePassword(password) {
    return updatePasswordFirebase(currentUser, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // all useful values/functions related to authentication
  const authDetails = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    // provides auth details to all of the children components
    <AuthContext.Provider value={authDetails}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
