import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Input,
} from "@mui/material";
import React, { useState } from "react";
import { createPost } from "../../../api/posts";
import Spinner from "../../Spinner";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import useAppContext from "../../../context";

export default function CreatePostCard({}) {
  const initialState = {
    formData: {
      title: "",
      body: "",
    },
  };

  const { openSnackbar, setPosts } = useAppContext();

  const [isCreateMode, setIsCreateMode] = useState(false);
  const [formData, setFormData] = useState(initialState.formData);
  const [loading, setLoading] = useState(false);

  function onClickAdd() {
    setIsCreateMode(true);
  }

  function onChangeInput(key, value) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  async function onClickCreate() {
    setLoading(true);
    const response = await createPost(formData);

    if (response?.success) {
      console.log(response?.data);
      setPosts((prev) => {
        const newState = [...prev];
        newState.unshift({
          ...response?.data,
          id: Number(newState?.length) + 1,
        });
        return newState;
      });

      setFormData(initialState.formData);
      setIsCreateMode(false);
      openSnackbar("success", "Post created successfully");
    } else {
      openSnackbar("error", response?.message || "Error creating post");
    }
    setLoading(false);
  }

  function onClickCancel() {
    setIsCreateMode(false);
  }

  return isCreateMode ? (
    <Card
      sx={{
        maxWidth: 345,
        width: "100%",
        height: 280,
        m: 1,
        p: 1,
        background: "cornsilk",
      }}
    >
      <>
        <CardContent>
          <Input
            sx={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              width: "100%",
            }}
            value={formData?.title}
            onChange={(e) => onChangeInput("title", e.target.value)}
          />
          <Input
            sx={{
              width: "100%",
            }}
            multiline
            value={formData?.body}
            onChange={(e) => onChangeInput("body", e.target.value)}
          />
        </CardContent>
        <CardActions sx={{ justifyContent: "space-around" }}>
          <Button
            size="small"
            startIcon={loading ? <Spinner /> : <AddCircleOutlineIcon />}
            onClick={onClickCreate}
            variant="contained"
          >
            Create
          </Button>
          <Button
            size="small"
            startIcon={<CancelIcon />}
            onClick={onClickCancel}
            variant="contained"
          >
            Cancel
          </Button>
        </CardActions>
      </>
    </Card>
  ) : (
    <Card
      sx={{
        maxWidth: 345,
        width: "100%",
        height: 280,
        m: 1,
        p: 1,
        background: "#565656",
      }}
    >
      <Button
        sx={{
          width: "100%",
          height: "100%",
          background: "#565656",
          border: "1px solid whitesmoke",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={onClickAdd}
      >
        <AddIcon
          sx={{
            fontSize: "3rem",
            color: "whitesmoke",
          }}
        />
      </Button>
    </Card>
  );
}
