import React, { useContext, useState, createContext, useEffect } from "react";
import { defaultValues } from "../utils";
import { getPosts } from "../api/posts";

const AppContext = createContext();

export default function useAppContext() {
  return useContext(AppContext);
}

export const initialState = {
  snackbar: { open: false },
};

export const AppContextProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState(initialState.snackbar);
  const [posts, setPosts] = useState([]);

  async function fetchPosts() {
    const response = await getPosts();

    if (response?.success) {
      if (Array.isArray(response.data)) {
        if (response?.data?.length > 0) {
          setPosts(response?.data);
          openSnackbar("success", "Posts fetched successfully");
        } else {
          openSnackbar("info", "Post not found!");
        }
      } else {
        openSnackbar("error", "Response data is not correct");
        console.log("response data is not an array");
      }
    } else {
      openSnackbar("error", response?.message || "Error Fetching posts data");
    }
  }

  function openSnackbar(severity, message) {
    // console.log("openSnackbar", snackbarProps);
    setSnackbar({
      ...defaultValues.snackbar,
      severity,
      message,
    });
  }

  const value = {
    snackbar,
    setSnackbar,
    openSnackbar,
    posts,
    fetchPosts,
    setPosts,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
