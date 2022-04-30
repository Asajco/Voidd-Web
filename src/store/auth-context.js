import React, { useEffect, useState, useContext } from "react";
import { auth } from "../firebase";
import { firestore } from "../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userAccountType, setUserAccountType] = useState(null);
  const [userData, setUserData] = useState(null);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const protectedRoutes = ["/membership", "/tickets", "/create-event"]

  const setAccountType = async () => {
    const docReference = doc(firestore, "users", auth.currentUser.uid);
    const document = await getDoc(docReference);

    setUserAccountType(document.data()["membership"]);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAccountType();
        setIsLoggedIn(true);
        setUserData(user);
      } else {
        setIsLoggedIn(false);
        setUserAccountType(null);
        setUserData(null);
      }
    });
  }, []);

  const signInHandler = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (ex) {
      throw ex;
    }
  };

  const signUpHandler = async (email, password) => {
    try {
      const userInfo = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(firestore, "users", userInfo.user.uid), {
        email: userInfo.user.email,
        membership: "basic",
      });
    } catch (ex) {
      throw ex;
    }
  };

  const signOutHandler = () => {
    signOut(auth);
    if(protectedRoutes.includes(pathname)) {
      navigate("/", { replace: true });
    }

  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userAccountType: userAccountType,
        userData: userData,
        signOut: signOutHandler,
        signIn: signInHandler,
        signUp: signUpHandler,
        updateUserAccountState: setAccountType,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default useAuth;
