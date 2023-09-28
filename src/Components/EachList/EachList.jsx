import axios from "axios";
import React, { useContext, useState } from "react";
import { MyContext } from "../../MyContext";
import { BASE_URL } from "../../BaseUrl";
import "./EachList.css";
import { MdDelete, MdUpdate } from "react-icons/md";
import { AiFillEdit, AiOutlineClose } from "react-icons/ai";
// import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import Button from "@mui/material/Button";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const EachList = ({ item }) => {
  const { update, setUpdate } = useContext(MyContext);
  const [edit, setEdit] = useState(false);
  const [inp, setInp] = useState({
    title: "",
    description: "",
  });
  const handleUpdate = async () => {
    const upload = { ...inp, task_id: item._id };
    try {
      const res = await axios.patch(`${BASE_URL}/api/v1/task/update`, upload);

      setEdit(false);
      setUpdate((p) => !p);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/api/v1/task/delete/${item._id}`
      );
      setUpdate((p) => !p);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="to_do-each_list">
      <div key={item?._id} className="to_do-list_task">
        {edit ? (
          <>
            <div className="to_do-input">
              <input
                type="text"
                style={{ padding: "1rem 0.5rem" }}
                placeholder="Enter your title "
                value={inp.title}
                onChange={(e) => setInp({ ...inp, title: e.target.value })}
              />

              <textarea
                name=""
                id=""
                cols="30"
                rows="2"
                placeholder="Description Here"
                value={inp?.description}
                onChange={(e) =>
                  setInp({ ...inp, description: e.target.value })
                }
              ></textarea>
            </div>
          </>
        ) : (
          <div>
            {/* <Box sx={{ width: "100%" }}> */}
            <Stack spacing={2}>
              <Item>
                <h3 style={{ color: "black", textAlign: "start" }}>
                  {item.title}
                </h3>
                <p style={{ color: "black", textAlign: "start" }}>
                  {item?.description}
                </p>
              </Item>
            </Stack>
            {/* </Box> */}
          </div>
        )}
        <div className="to_do-list_button">
          {edit ? (
            <Button
              style={{ fontFamily: "var(--font-family)" }}
              onClick={handleUpdate}
              variant="contained"
              startIcon={<MdUpdate />}
            >
              Update
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<AiFillEdit />}
              style={{ fontFamily: "var(--font-family)" }}
              onClick={() => {
                setInp({ title: item.title, description: item?.description });
                setEdit(true);
              }}
            >
              Edit
            </Button>
          )}
          <Button
            variant="outlined"
            color="error"
            style={{ fontFamily: "var(--font-family)" }}
            startIcon={<MdDelete />}
            onClick={handleDelete}
          >
            Delete
          </Button>
          {edit && (
            <Button
              style={{ fontFamily: "var(--font-family)" }}
              variant="contained"
              onClick={() => setEdit(false)}
              startIcon={<AiOutlineClose />}
            >
              close
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EachList;
