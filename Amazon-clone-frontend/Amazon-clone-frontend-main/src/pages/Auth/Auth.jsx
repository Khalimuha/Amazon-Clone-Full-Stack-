import React, { useState, useContext } from "react";
import classes from "./Signup.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import { ClipLoader } from "react-spinners";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { DataContext } from "./../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false
  });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();

  console.log("useLocation output:", navStateData);

  const authHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.name);

    if (e.target.name == "signin") {
      // Firebase sign in
      setLoading({ ...setLoading, signIn: true });
      try {
        const userInfo = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        dispatch({
          type: Type.SET_USER,
          user: userInfo.user
        });

        setLoading({ ...setLoading, signIn: false });
        navigate(navStateData?.state?.redirect || "/");
      } catch (err) {
        setError(err.message);
        setLoading({ ...setLoading, signIn: false });
      }
    } else {
      // Firebase sign up
      setLoading({ ...setLoading, signUp: true });

      try {
        const userInfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        setLoading({ ...setLoading, signUp: false });
        navigate(navStateData?.state?.redirect || "/");
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user
        });

        setLoading({ ...setLoading, signUp: false });

        navigate("/");
      } catch (err) {
        setError(err.message);
        setLoading({ ...setLoading, signUp: false });
      }
    }
  };

  return (
    <section className={classes.login}>
      {/* logo of auth page*/}
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt=""
        />
      </Link>
      {/* form */}
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold"
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>

          <button
            name="signin"
            onClick={authHandler}
            type="submit"
            className={classes.signInBtn}
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
        </form>
        {/* agreement */}
        <p>
          By signing-in you agree to the AMAZONFAKE CLONE conditions of the use
          & Sale . Please see our policy Notice, our cookies and our
          Internet-Based Ads Notice.
        </p>

        {/* Create account */}

        <button
          name="signup"
          onClick={authHandler}
          type="submit"
          className={classes.signUpBtn}
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            " Create your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
};

export default Auth;
