import React, { useContext, useEffect, useState } from "react";

import "./List.css";
import EachList from "../EachList/EachList";
import axios from "axios";
import { MyContext } from "../../MyContext";
import { BASE_URL } from "../../BaseUrl";

import Container from "@mui/material/Container";

const List = () => {
  const { update, login, userId, userData, setUserData, loading, setLoading } =
    useContext(MyContext);

  useEffect(() => {
    const fetchUserTasks = async () => {
      if (!login || !userId) return;
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/task/userTask/${userId}`);
      const data = res.data;
      setUserData(data.data.reverse());
      console.log(data);
      setLoading(false);
    };
    fetchUserTasks();
  }, [update, userId]);
  return (
    <div className="to_do-list">
      {userData.length == 0 && login && (
        <div>
          <p>You have not created any to do till now</p>
        </div>
      )}
      {login || (
        <p style={{ color: "white" }}>Please login to check your to do</p>
      )}
      {userData.map((item) => (
        <div key={item._id}>
          <Container maxWidth="sm">
            <EachList item={item} />
          </Container>
        </div>
      ))}
    </div>
  );
};

export default List;
