import React from "react";
import { Box, Typography } from "@mui/material";
import FrontPage from "../../../FrontPage";

export const Graphing = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ pt: 3, gap: 2, maxWidth: `100%` }}
    >
      <Typography variant="h3">Graphing</Typography>
      <Typography variant="body1">Creating graphs based on the data</Typography>
      <FrontPage/>

    </Box>
  );
};
