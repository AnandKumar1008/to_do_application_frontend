import React, { useContext, useState } from "react";
import List from "../../Components/List/List";
import axios from "axios";
import { MyContext } from "../../MyContext";
import { BASE_URL } from "../../BaseUrl";
import "./Home.css";
import Animations from "../../Components/Animations";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
const Home = () => {
  const { setUpdate, login, setAuthPage, setLoginPage, userId, loading } =
    useContext(MyContext);
  const [currentData, setCurrentData] = useState({
    title: "",
    description: "",
  });
  const handleAdd = async () => {
    if (!login) {
      setLoginPage(true);
      setAuthPage(true);
      return;
    }
    if (!currentData.title) return;

    const addList = {
      ...currentData,
      creator_id: userId,
    };
    try {
      await axios.post(`${BASE_URL}/api/v1/task/create`, addList);
    } catch (error) {
      console.log(error);
    }
    setUpdate((p) => !p);
    setCurrentData({ title: "", description: "" });
  };
  return (
    <div className="to_do-home">
      <h1 style={{ color: "black", padding: "2rem 0", textAlign: "center" }}>
        To Do Appplication
      </h1>
      <div className="to_do-input_button">
        <Container>
          <div className="to_do-input">
            <input
              type="text"
              style={{ padding: "1rem 0.5rem" }}
              placeholder="Enter your title "
              value={currentData.title}
              onChange={(e) =>
                setCurrentData({ ...currentData, title: e.target.value })
              }
            />

            <textarea
              name=""
              id=""
              cols="30"
              rows="2"
              placeholder="Description"
              value={currentData.description}
              onChange={(e) =>
                setCurrentData({ ...currentData, description: e.target.value })
              }
            ></textarea>
          </div>

          <Button
            style={{ fontFamily: "var(--font-family)" }}
            variant="contained"
            color="success"
            onClick={handleAdd}
          >
            Add To Do
          </Button>
        </Container>
      </div>
      {loading && (
        <div style={{ margin: "1rem 0", textAlign: "center" }}>
          <Animations />
        </div>
      )}
      <div style={loading ? { display: "none" } : { display: "block" }}>
        {<List />}
      </div>
    </div>
  );
};

export default Home;
