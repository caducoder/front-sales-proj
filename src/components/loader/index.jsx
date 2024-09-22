import { Box, Loader } from "@mantine/core";
import React from "react";

function LoaderComponent() {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Loader color="teal" size={50} />
    </Box>
  );
}

export default LoaderComponent;
