import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function Animations() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        margin: "0 auto",
        padding: "6rem",
      }}
    >
      <Skeleton animation="wave" sx={{ height: "5rem" }} />
      <Skeleton animation="wave" sx={{ height: "5rem" }} />
      <Skeleton animation="wave" sx={{ height: "5rem" }} />
      <Skeleton animation="wave" sx={{ height: "5rem" }} />
      <Skeleton animation="wave" sx={{ height: "5rem" }} />
      <Skeleton animation="wave" sx={{ height: "5rem" }} />
      <Skeleton animation="wave" sx={{ height: "5rem" }} />
    </Box>
  );
}
