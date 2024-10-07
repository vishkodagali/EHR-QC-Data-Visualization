import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTab } from "../../contexts/TabContext";
const drawerWidth = 240;

export function LayoutWithSideBar({ children }) {
  const { tabIndex, setTabIndex } = useTab();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", maxWidth: `100%` }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EHRQC
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItemButton onClick={() => navigate("/standardise")}>
              <ListItemText primary={"Standardise"} />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/preprocess")}>
              <ListItemText primary={"Preprocess"} />
            </ListItemButton>
            <List disablePadding component={"div"}>
              <ListItemButton
                onClick={() => {
                  navigate("/preprocess");
                  setTabIndex(1);
                }}
                sx={{ pl: 4 }}
              >
                <ListItemText primary={"Concept Coverage"} />
              </ListItemButton>
              <ListItemButton
                onClick={() => {
                  navigate("/preprocess");
                  setTabIndex(2);
                }}
                sx={{ pl: 4 }}
              >
                <ListItemText primary={"Extract"} />
              </ListItemButton>
              <ListItemButton
                onClick={() => {
                  navigate("/preprocess");
                  setTabIndex(3);
                }}
                sx={{ pl: 4 }}
              >
                <ListItemText primary={"Data Coverage Analysis"} />
              </ListItemButton>
              <ListItemButton
                onClick={() => {
                  navigate("/preprocess");
                  setTabIndex(4);
                }}
                sx={{ pl: 4 }}
              >
                <ListItemText primary={"Impute"} />
              </ListItemButton>
              <ListItemButton
                onClick={() => {
                  navigate("/preprocess");
                  setTabIndex(5);
                }}
                sx={{ pl: 4 }}
              >
                <ListItemText primary={"Outliers"} />
              </ListItemButton>
              <ListItemButton
                onClick={() => {
                  navigate("/preprocess");
                  setTabIndex(6);
                }}
                sx={{ pl: 4 }}
              >
                <ListItemText primary={"Graphing"} />
              </ListItemButton>
            </List>
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, maxWidth: `calc(100vw - ${drawerWidth}px)`, minHeight: `50vh` }}
      >
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
}
