"use client";
export const dynamic = "force-dynamic";
import React from "react";
import {
  AppBar, Toolbar, IconButton, Menu,
  MenuItem, Container, Avatar, Button, Box
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import MuiNavLink from "../muiNavLink/page";
import { useDispatch, useSelector } from "react-redux";
import { removToken } from "@/redux/authSlice";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { token } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const logOut = () => {
    dispatch(removToken());
    localStorage.removeItem("token");
    router.replace("/login");
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: 100}}>
      <Container maxWidth="xl">
        <Toolbar sx={{ px: { lg: 3 } }}>
          {/* Logo / Avatar */}
          {token && (
            <IconButton sx={{ p: 0, pr: { xs: 1 } }}>
              <Avatar alt="User" src="/static/images/avatar/2.jpg" />
            </IconButton>
          )}

          {/* Mobile Menu Button */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            {token && (
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <MuiNavLink href="/products" label="Products" />
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <MuiNavLink href="/allPosts" label="Posts" />
                </MenuItem>
              </Menu>
            )}
          </Box>

          {/* Desktop Menu Links */}
          {token && (
            <Box sx={{ display: { xs: "none", md: "flex" }, ml: 2 }}>
              <Button sx={{ color: "black" }}>
                <MuiNavLink href="/allPosts" label="Posts" />
              </Button>
              <Button sx={{ color: "black" }}>
                <MuiNavLink href="/products" label="Products" />
              </Button>
            </Box>
          )}

          {/* Right Side: Auth Buttons */}
          <Box sx={{ ml: "auto" }}>
            {token ? (
              <IconButton onClick={logOut} color="inherit">
                <LogoutIcon sx={{ fontSize: { xs: 25, md: 30 } }} />
              </IconButton>
            ) : (
              <Box sx={{ display: "flex", gap: 2 }}>
                <MuiNavLink href="/login" label="Login" />
                <MuiNavLink href="/register" label="Register" />
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}