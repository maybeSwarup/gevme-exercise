import { Box, Skeleton } from "@mui/material";
import React from "react";

export default function PostsContainerSkeleton() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
        p: 1,
        m: 1,
        bgcolor: "grey",
        borderRadius: 1,
        width: "fit-content",
        height: "80vh",
      }}
    >
      {new Array(6).fill("_").map((_, i) => {
        return (
          <Skeleton
            key={i}
            sx={{
              maxWidth: 345,
              m: 1,
              p: 1,
            }}
            variant="rounded"
            width={345}
            height={280}
          />
        );
      })}
    </Box>
  );
}
