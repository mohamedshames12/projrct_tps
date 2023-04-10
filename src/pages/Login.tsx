import React from "react";
import { auth, provider } from "../config/Firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
  const navigare = useNavigate();
  const [user] = useAuthState(auth);
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigare("/");
  };

  return (
    <div>
      {user ? (
        <>{navigare("/")}</>
      ) : (
        <>
        
          <div className="login">
            <h4>if you want to login with this app, just login by google </h4>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
