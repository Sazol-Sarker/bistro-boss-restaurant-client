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

const auth = getAuth(app);


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
      if (currentUser?.emailVerified) {
        const uid = currentUser.uid;
        setUser(currentUser);
        setLoading(false);
        // console.log(uid);
      }
      // console.log("On auth=>", currentUser);
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  //   Update a user's profile
  const updateUserProfile = (name) => {
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
  const verifyEmailLink = () => {
    setLoading(true);
    return sendEmailVerification(auth.currentUser);
  };
  // password Reset Email Link

  const passResetEmailLink = (email) => {
    setLoading(true);

    return sendPasswordResetEmail(auth,email);
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
