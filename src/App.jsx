import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Typography } from "@mui/material";
import { getPosts } from "./api/posts";
import useAppContext from "./context";
import AppSnackbar from "./components/AppSnackbar";
import PostsContainer from "./components/PostsContainer";
import PostsContainerSkeleton from "./components/PostsContainer/components/PostsContainerSkeleton";

function App() {
  const { openSnackbar } = useAppContext();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState();

  async function onComponentLoad() {
    setLoading(true);
    const response = await getPosts();

    if (response?.success) {
      if (Array.isArray(response.data)) {
        setPosts(response?.data);
        openSnackbar("success", "Posts fetched successfully");
      } else {
        openSnackbar("error", "Response data is not correct");
        console.log("response data is not an array");
      }
    } else {
      openSnackbar("error", response?.message || "Error Fetching posts data");
    }
    setLoading(false);
  }

  useEffect(() => {
    onComponentLoad();
  }, []);

  return (
    <div className="App">
      <Typography variant="h3">Posts</Typography>
      {loading ? <PostsContainerSkeleton /> : <PostsContainer posts={posts} />}
      <AppSnackbar />
    </div>
  );
}

export default App;
