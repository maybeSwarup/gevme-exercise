import React from "react";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Box, Typography } from "@mui/material";

export default function ZeroScreen() {
  return (
    <Box
      sx={{
        width: "80vw",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SentimentVeryDissatisfiedIcon
        sx={{
          fontSize: "5rem",
        }}
      />
      <Typography variant="body1">No Posts Found!</Typography>
    </Box>
  );
}
