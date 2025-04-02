import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "./../../firebase/firebase.init";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // const currentPath = window.location.pathname;
  // const inLoginPath = currentPath.includes("/login");
  // console.log("window.location.pathname=>",window.location.pathname,inLoginPath);

  // FIREBASE CLIENT SDks
  // create user
  const registerUser = (email, password) => {
    setLoading(true);

    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user
  const loginUser = (email, password) => {
    setLoading(true);

    return signInWithEmailAndPassword(auth, email, password);
  };

  // auth state observer set

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser.emailVerified) {
        // const uid = currentUser.uid;
        setUser(currentUser);
        setLoading(false);
        // console.log(uid);
      } 
      // else {
        
      //   // toast("Email not verified! Check inbox or spam to verify.");
      // }
      console.log("On auth=>", currentUser);
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  //   Update a user's profile
  const updateUserProfile = (name) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      // photoURL: photoUrl,
    });
  };

  // logout
  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Email verification mail send
  const verifyEmailLink = (email) => {
    setLoading(true);
    return sendEmailVerification(email);
    // return sendEmailVerification(auth.currentUser);
  };
  // password Reset Email Link

  const passResetEmailLink = (email) => {
    setLoading(true);

    return sendPasswordResetEmail(auth, email);
  };
  const authInfo = {
    name: "sazol",
    user,
    setUser,
    loading,
    setLoading,
    registerUser,
    loginUser,
    logoutUser,
    updateUserProfile,
    passResetEmailLink,
    verifyEmailLink,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
