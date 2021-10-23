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
import { getToken } from "../constants";

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
          <List>
            <NavLink to="/">Home</NavLink>
            {getToken() ? (
              <NavLink to="/account">Account</NavLink>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}

            <NavLink to="/explore">Explore</NavLink>
            <NavLink to="/habits">Habits</NavLink>
          </List>
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
