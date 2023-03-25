import { Box, CircularProgress } from "@mui/material";
import React from "react";

export default function Spinner() {
  return (
    <Box
    //   sx={{
    //     width: "100%",
    //     height: "100%",
    //   }}
    >
      <CircularProgress size={"1rem"} sx={{ color: "white" }} />
    </Box>
  );
}
