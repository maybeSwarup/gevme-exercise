import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletePost } from "../../../api/posts";
import useAppContext from "../../../context";
import Spinner from "../../Spinner";

export default function PostCard({ post }) {
  const { openSnackbar } = useAppContext();

  const [isEditMode, setIsEditMode] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  function onClickEdit() {
    setIsEditMode(true);
  }

  async function onClickSave() {
    setSaveLoading(true);

    setSaveLoading(false);
  }

  function onClickCancel() {
    setIsEditMode(false);
  }

  async function onClickDelete() {
    setDeleteLoading(true);
    const response = await deletePost(post?.id);

    if (response?.success) {
      openSnackbar("success", "Post deleted successfully");
    } else {
      openSnackbar("error", response?.message || "Error deleting post");
    }
    setDeleteLoading(false);
  }

  return (
    <Card
      sx={{ maxWidth: 345, height: 280, m: 1, p: 1, background: "cornsilk" }}
    >
      <CardContent>
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
          {post?.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ height: "100%" }}
        >
          {post?.body}
        </Typography>
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
