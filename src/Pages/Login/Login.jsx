import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { MyContext } from "../../MyContext";
import axios from "axios";
import { BASE_URL } from "../../BaseUrl";
import { auth, provider } from "../../firebase";
import { AiOutlineClose } from "react-icons/ai";
import { signInWithPopup } from "firebase/auth";
import Animations from "../../Components/Animations";
import LoadingSkeleton from "../LoadingSleteton";
import { FcGoogle } from "react-icons/fc";
import Button from "@mui/material/Button";
const Login = () => {
  const {
    setLoginPage,
    setAuthPage,
    message,
    setMessage,
    setLogin,
    setUserId,
    setUpdate,
    setUserName,
    setLoading,
    userPhoto,
    setUserPhoto,
  } = useContext(MyContext);
  const [error, setError] = useState("");
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
  });
  const sendToBackend = async (name, email, password, userPhoto) => {
    const userDetail = {
      name,
      email,
      userPhoto,
      password,
    };
    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/user/firebase`,
        userDetail
      );
      const data = res.data;
      setUserId(data.data._id);
      localStorage.setItem("to_do_token", JSON.stringify(data.token));
      setUpdate((p) => !p);
    } catch (error) {
      console.log(error);
    }
  };
  const handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUserName(result.user.displayName);
        setLogin(true);
        setUserPhoto(result.user.photoURL);
        sendToBackend(
          result.user.displayName,
          result.user.email,
          "",
          result.user.photoURL
        );
        setAuthPage(false);
        setLoginPage(false);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
  useEffect(() => {
    return () => {
      setMessage("");
    };
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userDetail.email || !userDetail.password) return;

    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, userDetail);

      setLogin(true);
      setUserId(res.data.data._id);
      localStorage.setItem("to_do_token", JSON.stringify(res.data.token));
      setUserName(res.data.data.name);
      setAuthPage(false);
      setLoginPage(false);
      setUpdate((p) => !p);
      setLoading(false);
    } catch (error) {
      setError("Email or password is wrong");
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="to_do-login">
      (
      <form className="to_do-login_cover" onSubmit={handleSubmit}>
        <div className="to_do-login_close">
          <button
            style={{
              backgroundColor: "white",
              border: "none",
              cursor: "pointer",
              padding: "1rem 0",
              fontSize: "1.5rem",
            }}
            onClick={(e) => {
              e.stopPropagation();
              setLoginPage(false);
              setAuthPage(false);
              setMessage("");
            }}
          >
            <AiOutlineClose />
          </button>
        </div>
        <h3 style={{ margin: "1rem 0", textAlign: "start" }}>Login </h3>
        {message && (
          <p style={{ color: "green", fontSize: "1.5rem", margin: "1rem 0" }}>
            {message}
          </p>
        )}
        {error && <p style={{ color: "red", margin: "1rem 0" }}>{error}</p>}

        <Button
          variant="contained"
          style={{
            fontFamily: "var(--font-family)",
            padding: "0.5rem",
            margin: "0.5rem 0",
            cursor: "pointer",
          }}
          onClick={handleGoogle}
        >
          <FcGoogle style={{ fontSize: "1.5rem" }} /> Continue with Google
        </Button>
        <input
          type="email"
          placeholder="Email"
          style={{ padding: "0.5rem", margin: "0.5rem 0" }}
          value={userDetail.email}
          onChange={(e) => {
            setUserDetail({ ...userDetail, email: e.target.value });
            setError("");
          }}
        />
        <input
          type="password"
          placeholder="password"
          style={{ padding: "0.5rem", margin: "0.5rem 0" }}
          value={userDetail.password}
          onChange={(e) => {
            setUserDetail({ ...userDetail, password: e.target.value });
            setError("");
          }}
        />

        <Button
          variant="contained"
          style={{
            fontFamily: "var(--font-family)",
            padding: "0.5rem",
            margin: "0.5rem 0",
            cursor: "pointer",
          }}
          onClick={handleSubmit}
        >
          Login
        </Button>
        <p>
          Doesn't have an Account{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => setLoginPage(false)}
          >
            Create Account
          </span>{" "}
        </p>
      </form>
      )
    </div>
  );
};

export default Login;
