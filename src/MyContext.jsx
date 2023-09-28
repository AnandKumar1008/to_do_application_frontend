import React, { createContext, useState } from "react";

export const MyContext = createContext();
import fakeData from "./Components/fakeData.json";
const MyProvider = ({ children }) => {
  const [update, setUpdate] = useState(true);
  const [authPage, setAuthPage] = useState(false);
  const [loginPage, setLoginPage] = useState(false);
  const [login, setLogin] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([...fakeData]);
  const [userPhoto, setUserPhoto] = useState("");
  // const [loading, setLoading] = useState(true);
  return (
    <MyContext.Provider
      value={{
        update,
        setUpdate,
        authPage,
        setAuthPage,
        loginPage,
        setLoginPage,
        login,
        setLogin,
        message,
        setMessage,
        userId,
        setUserId,
        userData,
        setUserData,
        userName,
        setUserName,
        loading,
        setLoading,
        data,
        setData,
        userPhoto,
        setUserPhoto,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
export default MyProvider;
