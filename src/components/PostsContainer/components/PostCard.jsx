import {
  Button,
  Card,
  CardActions,
  CardContent,
  Input,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletePost, editPost } from "../../../api/posts";
import useAppContext from "../../../context";
import Spinner from "../../Spinner";

export default function PostCard({ post }) {
  const initialState = {
    formData: {
      title: post?.title || "",
      body: post?.body || "",
    },
  };

  const { openSnackbar, setPosts } = useAppContext();

  const [isEditMode, setIsEditMode] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [formData, setFormData] = useState(initialState?.formData);

  function onClickEdit() {
    setIsEditMode(true);
  }

  async function onClickSave() {
    setSaveLoading(true);
    const response = await editPost(post?.id, formData);

    if (response?.success) {
      setFormData(response?.data);
      setIsEditMode(false);
      openSnackbar("success", "Post edited successfully");
    } else {
      openSnackbar("error", response?.message || "Error editing post");
    }
    setSaveLoading(false);
  }

  function onClickCancel() {
    setIsEditMode(false);
  }

  async function onClickDelete() {
    setDeleteLoading(true);
    const response = await deletePost(post?.id);

    if (response?.success) {
      setPosts((prev) => {
        const newState = [...prev];
        const postIndex = newState?.findIndex(
          (thisPost) => thisPost?.id == post?.id
        );
        if (postIndex > -1) {
          newState.splice(postIndex, 1);
          return newState;
        } else {
          console.log(
            `Deleted post id:${post?.id}  not found in fetched posts`
          );
        }
      });
      openSnackbar("success", "Post deleted successfully");
    } else {
      openSnackbar("error", response?.message || "Error deleting post");
    }
    setDeleteLoading(false);
  }

  function onChangeInput(key, value) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  return (
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
      <CardContent>
        {isEditMode ? (
          <Input
            sx={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              width: "100%",
            }}
            value={formData?.title}
            onChange={(e) => onChangeInput("title", e.target.value)}
          />
        ) : (
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {formData?.title}
          </Typography>
        )}
        {isEditMode ? (
          <Input
            sx={{
              width: "100%",
            }}
            multiline
            value={formData?.body}
            onChange={(e) => onChangeInput("body", e.target.value)}
          />
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ height: "100%" }}
          >
            {formData?.body}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: "space-around" }}>
        {isEditMode ? (
          <>
            <Button
              size="small"
              startIcon={saveLoading ? <Spinner /> : <SaveIcon />}
              onClick={onClickSave}
              variant="contained"
            >
              Save
            </Button>
            <Button
              size="small"
              startIcon={<CancelIcon />}
              onClick={onClickCancel}
              variant="contained"
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            size="small"
            startIcon={<ModeEditIcon />}
            onClick={onClickEdit}
            variant="contained"
          >
            Edit
          </Button>
        )}

        <Button
          size="small"
          startIcon={deleteLoading ? <Spinner /> : <DeleteIcon />}
          onClick={onClickDelete}
          variant="contained"
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
