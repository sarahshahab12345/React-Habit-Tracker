import React from "react";
import { Skeleton, Box, Typography } from "@mui/material";

const LoadingSkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        <Skeleton variant="text" width={200} />
      </Typography>
      <Skeleton
        variant="rectangular"
        width="100%"
        height={300}
        sx={{ mb: 2 }}
      />
      <Skeleton variant="text" width="50%" sx={{ mb: 1 }} />
      <Skeleton variant="text" width="50%" />
    </Box>
  );
};

export default LoadingSkeleton;
