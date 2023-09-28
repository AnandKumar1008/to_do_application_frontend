import React, { useContext, useState } from "react";
import "./Nav.css";
import { BiUser } from "react-icons/bi";
import { MyContext } from "../../MyContext";
import { FaUser } from "react-icons/fa";
import { CiLogin, CiLogout } from "react-icons/ci";
// import { IoPersonAdd } from "react-icons/io";
import { IoMdPersonAdd } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../BaseUrl";
const Nav = () => {
  const {
    setAuthPage,
    setLoginPage,
    login,
    setLogin,

    setUserData,
    userName,
    userPhoto,
    userId,
    setLoading,
  } = useContext(MyContext);
  const location = useLocation();
  const [select, setSelect] = useState(
    location.pathname == "/todo" ? "todo" : "home"
  );
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.setItem("to_do_token", JSON.stringify(""));
    setUserData([]);
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/api/v1/user/logout`, { userId });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setLogin(false);
  };
  return (
    <div className="to_do-nav">
      <ul className="to_do-nav_top">
        <li
          style={select === "todo" ? { backgroundColor: "lightblue" } : {}}
          onClick={() => {
            setSelect("todo");
            navigate("/todo");
          }}
        >
          ToDo App
        </li>
        <li
          style={select === "home" ? { backgroundColor: "lightblue" } : {}}
          onClick={() => {
            navigate("/");
            setSelect("home");
          }}
        >
          Home
        </li>
        {login ? (
          // <li
          //   onClick={() => {
          //     setLogin(false);
          //     setUserData([]);
          //     localStorage.setItem("to_do_token", JSON.stringify(""));
          //   }}
          // >
          //   Logout
          // </li>
          <></>
        ) : (
          <>
            <li
              onClick={() => {
                setAuthPage(true);
              }}
            >
              Register
            </li>
            <li
              onClick={() => {
                setAuthPage(true);
                setLoginPage(true);
              }}
            >
              Login
            </li>
          </>
        )}
      </ul>
      {
        <ul className="to_do-nav_right">
          <li className="to_do-nav_profile">
            {login ? (
              <li className="to_do-user_image">
                <img src={userPhoto} alt="user" />{" "}
              </li>
            ) : (
              <AiOutlineUser />
            )}
            <div className="to_do-nav_profile_hover">
              <ul>
                {login ? (
                  <>
                    <li>
                      <img src={userPhoto} alt="" />
                      {userName}
                    </li>
                    <li onClick={handleLogout}>
                      {" "}
                      <CiLogout /> Logout
                    </li>
                  </>
                ) : (
                  <>
                    <li
                      onClick={() => {
                        setLoginPage(true);
                        setAuthPage(true);
                      }}
                    >
                      {" "}
                      <CiLogin /> LogIn
                    </li>
                    <li
                      onClick={() => {
                        setLoginPage(false);
                        setAuthPage(true);
                      }}
                    >
                      {" "}
                      <IoMdPersonAdd /> Create Account
                    </li>
                  </>
                )}
              </ul>
            </div>
          </li>
        </ul>
      }
    </div>
  );
};

export default Nav;
