import { Skeleton } from "@mui/material";
import React from "react";

export default function PostsContainerSkeleton() {
  return (
    <div>
      <Skeleton variant="rounded" width={210} height={60} />;
    </div>
  );
}
