import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "./../../firebase/firebase.init";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGithubLogin, setIsGithubLogin] = useState(false);
  const axiosPublic = useAxiosPublic();
  // const currentPath = window.location.pathname;
  // const inLoginPath = currentPath.includes("/social");
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
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        // get+store jwt token -> localstorage
        axiosPublic
          .post("/jwt", userInfo)
          .then((res) => {
            // console.log("JWT AUTH=>", res.data);
            if (res.data.token) {
              localStorage.setItem("access-token", res.data.token);
              setLoading(false); //added later
            }
          })
          .catch((error) => {
            // console.log("JWT AUTH error=>", error);
          });

        setUser(currentUser);
        setLoading(false);
        setIsGithubLogin(false);
        console.log("On authProvider if =>");
      } 
      else {
        console.log("On authProvider else =>");
        localStorage.removeItem("access-token");
        setLoading(false); //added later

        // toast("Email not verified! Check inbox or spam to verify.");
      }

      // console.log("On auth=>",user);
      // console.log("On auth=>", currentUser);
    });

    return () => {
      return unsubscribe();
    };
  }, [isGithubLogin, axiosPublic]);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     if (currentUser) {
  //       const userInfo = { email: currentUser.email };
  //       // get+store jwt token -> localstorage
  //       axiosPublic
  //         .post("/jwt", userInfo)
  //         .then((res) => {
  //           // console.log("JWT AUTH=>", res.data);
  //           if (res.data.token) {
  //             localStorage.setItem("access-token", res.data.token);
  //             setLoading(false);//added later
  //           }
  //         })
  //         .catch((error) => {
  //           // console.log("JWT AUTH error=>", error);
  //         });
  //     }
  //     else {
  //       localStorage.removeItem("access-token");
  //       setLoading(false);//added later

  //       // toast("Email not verified! Check inbox or spam to verify.");
  //     }

  //     if (currentUser?.emailVerified || isGithubLogin) {
  //       setUser(currentUser);
  //       setLoading(false);
  //       setIsGithubLogin(false);
  //       // console.log(uid);
  //     }

  //     console.log("On auth=>", currentUser);
  //   });

  //   return () => {
  //     return unsubscribe();
  //   };
  // }, [isGithubLogin, axiosPublic]);

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
  const verifyEmailLink = () => {
    setLoading(true);
    // return sendEmailVerification(email);
    return sendEmailVerification(auth.currentUser);
  };
  // password Reset Email Link

  const passResetEmailLink = (email) => {
    setLoading(true);

    return sendPasswordResetEmail(auth, email);
  };

  // 3rd party: GOOGLE LOG IN

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  // 3rd party: github Login
  const githubLogin = () => {
    setLoading(true);
    setIsGithubLogin(true);
    return signInWithPopup(auth, githubProvider);
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
    googleSignIn,
    githubLogin,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
