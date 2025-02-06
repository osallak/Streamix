"use client";

import { Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu as MuiMenu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const pages = [
  { label: "Home", path: "/" },
  { label: "Movies", path: "/movies" },
  { label: "TV Shows", path: "/series" },
  { label: "Watch Later", path: "/watchLater" },
];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isDiscoverPage = pathname?.includes("/discover");

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: isDiscoverPage
            ? "#000000"
            : "linear-gradient(rgba(0, 0, 0, .6), #141414)",
        }}
        elevation={0}
      >
        <Container
          maxWidth={false}
          sx={{
            px: { xs: 2, sm: 4 },
            "@media (min-width: 1200px)": {
              paddingLeft: "24px",
              paddingRight: "24px",
            },
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: "64px", md: "70px" },
              padding: 0,
            }}
          >
            {/* Logo - Desktop */}
            <Box
              sx={{
                display: { xs: "none", sm: "block" },
                flexGrow: 0,
                paddingRight: 4,
              }}
            >
              <Typography
                onClick={() => router.push("/")}
                sx={{
                  color: "secondary.main",
                  fontFamily: "Inter",
                  fontWeight: 700,
                  fontSize: { xs: "1.5rem", sm: "2rem" },
                  cursor: "pointer",
                  letterSpacing: "1px",
                }}
              >
                STREAMIX
              </Typography>
            </Box>

            {/* Navigation - Desktop */}
            <Stack
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              spacing={2}
              alignItems="center"
              direction="row"
            >
              {pages.map((page) => (
                <Button
                  key={page.label}
                  onClick={() => {
                    handleCloseNavMenu();
                    router.push(page.path);
                  }}
                  sx={{
                    color: "white",
                    fontFamily: "Inter",
                    textTransform: "capitalize",
                  }}
                >
                  {page.label}
                </Button>
              ))}
            </Stack>

            {/* Mobile Menu */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="primary"
              >
                <Menu />
              </IconButton>

              <MuiMenu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
                PaperProps={{
                  sx: {
                    backgroundColor: "#141414",
                  },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.label}
                    onClick={() => {
                      handleCloseNavMenu();
                      router.push(page.path);
                    }}
                    sx={{
                      color: "white",
                      fontFamily: "Inter",
                    }}
                  >
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                ))}
              </MuiMenu>
            </Box>

            {/* Logo - Mobile */}
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
                flexGrow: 0,
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <Typography
                onClick={() => router.push("/")}
                sx={{
                  color: "secondary.main",
                  fontFamily: "Inter",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  letterSpacing: "1px",
                }}
              >
                STREAMIX
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
