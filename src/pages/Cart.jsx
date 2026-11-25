
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Divider,
  Paper,
  Alert,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import { useCart } from "../context/CartContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function Cart({ language = "en" }) {
  const isArabic = language === "ar";
  const t = (en, ar) => (isArabic ? ar : en);

  const { cart, cartCount, subtotal, updateQuantity, removeFromCart } =
    useCart();

  const [shipping] = useState(5);
  const total = subtotal + (cart.length > 0 ? shipping : 0);

  const formatPrice = (price) => `$${price.toFixed(2)}`;

  return (
    <Container maxWidth="lg" className="py-12">
      <Box className="mb-10">
        <Typography variant="overline" color="primary" className="font-bold">
          SHOPSPHERE
        </Typography>

        <Typography variant="h3" className="font-bold mt-2">
          {t("Shopping Cart", "سلة التسوق")}
        </Typography>

        <Typography sx={{ color: "text.secondary" }} className="mt-2">
          {cartCount} {t("items in your cart", "منتج في سلتك")}
        </Typography>
      </Box>

      <AnimatePresence mode="wait">
        {cart.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Paper
              elevation={0}
              variant="outlined"
              className="flex flex-col items-center gap-4 rounded-2xl px-6 py-16 text-center"
            >
              <ShoppingBagOutlinedIcon
                sx={{ fontSize: 65, color: "text.secondary" }}
              />

              <Typography variant="h5" className="font-bold">
                {t("Your cart is empty", "سلتك فارغة")}
              </Typography>

              <Typography sx={{ color: "text.secondary" }}>
                {t(
                  "Looks like you haven't added anything yet.",
                  "يبدو أنك لم تضف أي منتجات حتى الآن."
                )}
              </Typography>

              <Button
                component={Link}
                to="/products"
                variant="contained"
                size="large"
              >
                {t("Continue Shopping", "ابدأ التسوق")}
              </Button>
            </Paper>
          </motion.div>
        ) : (
          <motion.div
            key="cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
              <Box className="flex flex-col gap-4 lg:col-span-2">
                <AnimatePresence propagate>
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={false}
                      exit={{
                        opacity: 0,
                        x: isArabic ? 25 : -25,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Paper
                        variant="outlined"
                        elevation={0}
                        className="rounded-2xl p-4"
                      >
                        <Box className="flex flex-col gap-4 sm:flex-row sm:items-center">
                          <Box className="h-28 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900 sm:w-28">
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="h-full w-full object-contain p-2"
                            />
                          </Box>

                          <Box className="min-w-0 flex-1">
                            <Typography className="font-bold">
                              {item.title}
                            </Typography>

                            <Typography
                              color="primary"
                              className="font-bold mt-2"
                            >
                              {formatPrice(item.price)}
                            </Typography>

                            <Box className="mt-3 flex items-center gap-2">
                              <IconButton
                                size="small"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                disabled={item.quantity <= 1}
                                aria-label="Decrease quantity"
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>

                              <Typography className="font-bold">
                                {item.quantity}
                              </Typography>

                              <IconButton
                                size="small"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                disabled={item.quantity >= item.stock}
                                aria-label="Increase quantity"
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Box>

                          <Box className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                            <Typography className="font-bold">
                              {formatPrice(item.price * item.quantity)}
                            </Typography>

                            <IconButton
                              color="error"
                              onClick={() => removeFromCart(item.id)}
                              aria-label="Remove Product"
                            >
                              <DeleteOutlinedIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      </Paper>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <Button
                  component={Link}
                  to="/products"
                  variant="outlined"
                  color="inherit"
                  startIcon={<ShoppingBagOutlinedIcon />}
                  className="self-start"
                  sx={{
                    mt: 5,
                    px: 3,
                    py: 1.2,
                    direction: isArabic ? "rtl" : "ltr",
                    gap: 1.5,
                    "& .MuiButton-startIcon": {
                      margin: 0,
                    },
                    borderRadius: "12px",
                    borderColor: "divider",
                    textTransform: "none",
                    fontWeight: 600,
                    transition: "all 0.25s ease",
                    "&:hover": {
                      borderColor: "primary.main",
                      color: "primary.main",
                      backgroundColor: "action.hover",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {t("Continue Shopping", "متابعة التسوق")}
                </Button>
              </Box>

              <Paper
                variant="outlined"
                elevation={0}
                className="rounded-2xl p-6"
              >
                <Typography variant="h5" className="font-bold">
                  {t("Order Summary", "ملخص الطلب")}
                </Typography>

                <Divider className="my-5" />

                <Box className="mb-4 flex justify-between gap-3">
                  <Typography sx={{ color: "text.secondary" }}>
                    {t("Subtotal", "المجموع الفرعي")}
                  </Typography>

                  <Typography className="font-medium">
                    {formatPrice(subtotal)}
                  </Typography>
                </Box>

                <Box className="mb-4 flex justify-between gap-3">
                  <Typography sx={{ color: "text.secondary" }}>
                    {t("Shipping", "الشحن")}
                  </Typography>

                  <Typography className="font-medium">
                    {formatPrice(shipping)}
                  </Typography>
                </Box>

                <Divider className="my-5" />

                <Box className="mb-6 flex justify-between gap-3">
                  <Typography variant="h6" className="font-bold">
                    {t("Total", "الإجمالي")}
                  </Typography>

                  <Typography
                    variant="h6"
                    className="font-bold"
                    color="primary"
                  >
                    {formatPrice(total)}
                  </Typography>
                </Box>

                <Button
                  component={Link}
                  to="/checkout"
                  variant="contained"
                  fullWidth
                  size="large"
                >
                  {t("Proceed to Checkout", "إتمام الشراء")}
                </Button>

                <Alert
                  severity="info"
                  className="mt-4"
                  sx={{
                    direction: isArabic ? "rtl" : "ltr",
                    gap: 1,
                    "& .MuiButton-startIcon": {
                      margin: 0,
                    },
                  }}
                >
                  {t(
                    "Shipping cost is a demo estimate.",
                    "تكلفة الشحن تقديرية للتجربة."
                  )}
                </Alert>
              </Paper>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
}
