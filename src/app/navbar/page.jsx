"use client";
export const dynamic = "force-dynamic";
import React, { useContext, useEffect, useState } from "react";
import {
  AppBar, Toolbar, IconButton, Menu, MenuItem,
  Container, Avatar, Button, Box, Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MuiNavLink from "../muiNavLink/MuiNavLink";
import { useDispatch, useSelector } from "react-redux";
import { removToken, setToken } from "@/redux/authSlice";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/page";
import Link from "next/link";

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { userProfile, setUserProfile, refreshUserProfile } = useContext(UserContext);
  const { token } = useSelector((store) => store.authReducer);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

useEffect(() => {
  if (typeof window !== "undefined") {
    const storedToken = localStorage.getItem("token");
    if (storedToken && storedToken !== token) {
      dispatch(setToken(storedToken));
      refreshUserProfile(storedToken);
    }
  }
}, []);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const logOut = () => {
    localStorage.removeItem("token");
    dispatch(removToken());
    dispatch(setToken(null));
    setUserProfile('');
    router.replace("/login");
  };

  return (
    <AppBar position="fixed" color="primary" elevation={1} sx={{ zIndex: 100 }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ px: { lg: 3 }, display: "flex", alignItems: "center" }}>
          {token && (
            <Link href={`/profile`} passHref>
              <IconButton sx={{ p: 0, pr: { xs: 1 } }}>
                <Avatar src={userProfile?.photo} />
              </IconButton>
            </Link>
          )}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
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
                  <MuiNavLink href="/profile" label="Profile" />
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <MuiNavLink href="/allPosts" label="Posts" />
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <MuiNavLink href="/profilePhoto" label="Photo" />
                </MenuItem>
              </Menu>
            )}
          </Box>

          {token && (
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4, ml: 2 }}>
              <MuiNavLink href="/allPosts" label="Posts" />
              <MuiNavLink href="/profile" label="Profile" />
              <MuiNavLink href="/profilePhoto" label="Photo" />
            </Box>
          )}

          <Box sx={{ ml: "auto" }}>
            {token ? (
              <>
                <Button
                  onClick={handleOpenUserMenu}
                  endIcon={<ArrowDropDownIcon />}
                  sx={{
                    textTransform: "none",
                    bgcolor: "#f5f5f5",
                    borderRadius: 3,
                    px: 2,
                    py: 0.5,
                    color: "#333",
                    fontWeight: "bold",
                    "&:hover": { bgcolor: "#eaeaea" },
                  }}
                >
                  {userProfile?.name?.split(" ")[0] || "User"}
                </Button>
                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem disabled sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar src={userProfile?.photo} sx={{ width: 30, height: 30 }} />
                    <Typography variant="body2">{userProfile?.name}</Typography>
                  </MenuItem>
                  <MenuItem onClick={logOut}>
                    <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
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