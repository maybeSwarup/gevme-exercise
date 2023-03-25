import React from "react";
import ZeroScreen from "./components/ZeroScreen";
import PostCard from "./components/PostCard";
import { Box, Stack } from "@mui/material";

export default function PostsContainer({ posts }) {
  return posts?.length > 0 ? (
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
      }}
    >
      {posts?.map((post, i) => {
        return <PostCard key={post?.id + i} post={post} />;
      })}
    </Box>
  ) : (
    <ZeroScreen />
  );
}
