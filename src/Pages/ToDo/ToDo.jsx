import React, { useContext } from "react";
import Container from "@mui/material/Container";
import EachList from "../../Components/EachList/EachList";
import { MyContext } from "../../MyContext";
import "./ToDo.css";
const ToDo = () => {
  const { data } = useContext(MyContext);

  return (
    <div className="to_do-all">
      <h1>These are some sample of To Do list</h1>
      <div className="to_do-list">
        {data.slice(0, 10).map((item) => (
          <div key={item._id}>
            <Container maxWidth="sm">
              <EachList item={item} />
            </Container>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDo;
