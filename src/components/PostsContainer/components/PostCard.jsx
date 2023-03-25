import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";

export default function PostCard({ post }) {
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
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
