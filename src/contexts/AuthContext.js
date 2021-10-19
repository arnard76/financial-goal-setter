import React, { useContext, useState, useEffect } from "react";
// import app from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
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

  // function creates a user with given email and pass using firebase auth
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  // all useful values/functions related to authentication
  const authDetails = {
    currentUser,
    signup,
  };

  console.log(authDetails);

  return (
    // provides auth details to all of the children components
    <AuthContext.Provider value={authDetails}>{children}</AuthContext.Provider>
  );
}
