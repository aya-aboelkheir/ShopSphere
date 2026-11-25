import "./App.css";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Navbar from "./component/Navbar";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Footer from "./component/Footer";
import ProductDetails from "./pages/ProductDetails";
import CartProvider from "./context/CartContext";
import Cart from "./pages/Cart";
import CheckOut from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

import WishList from "./pages/WishList";
import { WishListProvider } from "./context/WishlistContext";
import ScrollToTop from "./component/ScrollToTop";
function App() {
  const [mode, setMode] = useState(()=>localStorage.getItem("mode") || "light");
  const [language, setLanguage] = useState(()=>localStorage.getItem("language") || "en");


  useEffect(()=>{
    localStorage.setItem("mode",mode);
  },[mode]);

  useEffect(()=>{
    localStorage.setItem("language",language);
  },[language])

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: "#b88a44",
      },
    },
    direction: language === "ar" ? "rtl" : "ltr",
    typography: {
      fontFamily: "Arial,sans-serif",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <WishListProvider>
          <Box
            dir={language == "ar" ? "rtl" : "ltr"}
            sx={{ minHeight: "100vh" }}
          >
            <BrowserRouter>
              <Navbar
                mode={mode}
                setMode={setMode}
                language={language}
                setLanguage={setLanguage}
              />
             <ScrollToTop />

<Routes>
  <Route path="/" element={<Home language={language} />} />

  <Route
    path="/products"
    element={<Products language={language} />}
  />

  <Route
    path="/products/:id"
    element={<ProductDetails language={language} />}
  />

  <Route path="/about" element={<About language={language} />} />

  <Route path="/cart" element={<Cart language={language} />} />

  <Route
    path="/checkout"
    element={<CheckOut language={language} />}
  />

  <Route
    path="/order-success"
    element={<OrderSuccess language={language} />}
  />

  <Route
    path="/wishlist"
    element={<WishList language={language} />}
  />

  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
              

              <Footer language={language} />
            </BrowserRouter>
          </Box>
        </WishListProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
