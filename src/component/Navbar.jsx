import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import Stack from "@mui/material/Stack";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import Drawer from "@mui/material/Drawer";
// import Button from '@mui/material/Button';
import List from "@mui/material/List";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import Container from "@mui/material/Container";

import Badge from "@mui/material/Badge";
import { useCart } from "../context/CartContext";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useWishlist } from "../context/WishlistContext";

export default function Navbar({ mode, setMode, language, setLanguage }) {
  const [open, setDrawerOpen] = useState(false);

  const isArabic = language == "ar";
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const links = [
    { label: isArabic ? "الرئيسية" : "home", path: "/" },
    { label: isArabic ? "المنتجات" : "products", path: "/products" },
    { label: isArabic ? "من نحن" : "about", path: "/about" },
    { label: isArabic ? "المفضلة" : "Wishlist", path: "/wishlist" },
  ];

  const toggleMode = () => {
    setMode(mode == "light" ? "dark" : "light");
  };

  const toggleLanguage = () => {
    setLanguage(isArabic ? "en" : "ar");
  };
  return (
    <>
      <AppBar position="sticky" color="default" elevation={0}>
        <Container maxWidth="lg" disableGutters>
          <Toolbar className="justify-between gap-3 ">
            <Typography
              variant="h5"
              component={NavLink}
              to="/"
              sx={{ textDecoration: "none" }}
              color="primary"
            >
              ShopSphere
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              {links.filter((link) =>link.path !=="/wishlist")
              .map((link) => (
                    <Button
                      key={link.path}
                      component={NavLink}
                      to={link.path}
                      color="inherit"
                    >
                      {link.label}
                    </Button>
                  ))
              }
            </Stack>
            <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
              <IconButton onClick={toggleMode} aria-label="Toggle theme">
                {mode === "light" ? (
                  <DarkModeOutlinedIcon />
                ) : (
                  <LightModeOutlinedIcon />
                )}
              </IconButton>

              <Button color="inherit" onClick={toggleLanguage}>
                {isArabic ? "En" : "عربي"}
              </Button>

              <IconButton
                component={NavLink}
                to="/wishlist"
                aria-label="Wishlist"
                color="inherit"
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                <Badge badgeContent={wishlistCount} color="error">
                  <FavoriteBorderIcon />
                </Badge>
              </IconButton>

              <IconButton
                component={NavLink}
                to="/cart"
                aria-label="shopping bag"
              >
                <Badge badgeContent={cartCount} color="primary">
                  <ShoppingBagOutlinedIcon />
                </Badge>
              </IconButton>

              <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{ display: { xs: "flex", md: "none" } }}
                aria-label="Open menu"
              >
                <MenuIcon />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor={isArabic ? "right" : "left"}
        open={open}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 260, p: 2 }}>
          <List>
            {links.map((link) => (
              <ListItemButton
                key={link.path}
                component={NavLink}
                to={link.path}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
