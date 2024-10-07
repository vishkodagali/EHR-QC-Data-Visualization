import { AppBar, Box, Toolbar, Typography, Link as MuiLink, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NavBarComponent = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"></AppBar>
    </Box>
  );
};

export default NavBarComponent;
