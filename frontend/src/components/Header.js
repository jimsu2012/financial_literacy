import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const NavLink = ({ children, to }) => {
    return (
      <ListItem onClick={() => setOpenDrawer(false)}>
        <ListItemText>
          <Link
            to={to}
            style={{
              color: "purple",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            {children}
          </Link>
        </ListItemText>
      </ListItem>
    );
  };

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/account">Account</NavLink>
          <NavLink to="/explore">Explore</NavLink>
          <NavLink to="/habits">Habits</NavLink>
        </Drawer>
        <IconButton
          onClick={() => setOpenDrawer(!openDrawer)}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
