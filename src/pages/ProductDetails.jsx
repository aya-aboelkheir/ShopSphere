import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Rating,
  Chip,
  IconButton,
  Divider,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { getProductByID } from "../services/ProductService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useCart } from "../context/CartContext";

import { AnimatePresence, motion } from "framer-motion";
export default function ProductDetails({ language = "en" }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const isArabic = language === "ar";
  const t = (en, ar) => (isArabic ? ar : en);

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  

  useEffect(() => {
    const controller = new AbortController();
    async function loadProduct() {
      try {
        setLoading(true);
        setError("");
        setProduct(null);
        setSelectedImage("");

        const data = await getProductByID(id, controller.signal);
        setProduct(data);
        setSelectedImage(data.thumbnail);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(t("Unable to load this product.", "تعذر تحميل المنتج."));
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }
    loadProduct();

    return () => controller.abort();
  }, [id]);

  const increaseQuantity = () => {
    setQuantity((current) => Math.min(current + 1, product.stock));
  };
  const decreaseQuantity = () => {
    setQuantity((current) => {
      return Math.max(1, current - 1);
    });
  };

  const handleAddToCart = () => {
    if (!product || product.stock <= 0) return;

    addToCart(product, quantity);
    setAdded(true);
  };

  if (loading) {
    return (
      <Box className="flex min-h-[60vh] items-center justify-center">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth="lg" className="py-12">
        <Alert severity="error">
          {error || t("Product not found", "المنتج غير موجود")}
        </Alert>
        <Button onClick={() => navigate("/products")} className="mt-4">
          {t("Back to Products", "العودة للمنتجات")}
        </Button>
      </Container>
    );
  }

  const images =
    product.images?.length > 0 ? product.images : [product.thumbnail];

  return (
    <Container maxWidth="lg" className="pt-10">
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/products")}
        className="mb-3"
      >
        {t("Back to Products", "العودة للمنتجات")}
      </Button>
      <Grid container spacing={5}>
        <Grid size={{ xs: 12, md: 6 }}>
         <Box className="overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900">
  <AnimatePresence mode="wait">
    <motion.img
      key={selectedImage}
      src={selectedImage}
      alt={product.title}
      className="h-[420px] w-full object-contain p-6"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
  </AnimatePresence>
</Box>
          <Box className="mt-4 flex flex-wrap gap-3">
            {images.map((image, index) => (
              <Box
                key={`${image}-${index}`}
                onClick={() => setSelectedImage(image)}
                className={`h-20 w-20 cursor-pointer overflow-hidden rounded-xl border-2 ${
                  selectedImage === image
                    ? "border-amber-600"
                    : "border-transparent"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="h-full w-full object-contain p-1"
                />
              </Box>
            ))}
          </Box>
        </Grid>

        {/* INFORMATION */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Chip
            label={product.category}
            color="primary"
            variant="outlined"
            className="mb-4 capitalize"
          />

          <Box className="flex items-center justify-between">
            <Typography variant="h4" className="font-bold">
              {product.title}
            </Typography>

            {product.brand && (
              <Box className="flex items-center gap-1.5">
                <StorefrontOutlinedIcon
                  sx={{ fontSize: 16, color: "#B7791F" }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: "#B7791F", fontWeight: 600 }}
                >
                  {product.brand}
                </Typography>
              </Box>
            )}
          </Box>
          <Box className="my-4 flex items-center gap-2"
          >
            <Rating value={product.rating} precision={0.1} readOnly  sx={{
      direction: "ltr",
      gap: "2px",
    }}/>
            <Typography sx={{ color: "text.secondary" }}>
              {product.rating} / 5
            </Typography>
          </Box>

          <Typography variant="h4" color="primary" className="font-bold my-5">
            ${product.price}
          </Typography>

          <Typography sx={{ color: "text.secondary" }} className="leading-7">
            {product.description}
          </Typography>

          <Divider className="my-6" />

          <Box className=" mb-5 flex items-center justify-between">
            <Typography className="font-medium">
              {t("Availability", "التوفر")}
            </Typography>
            <Chip
              label={
                product.stock > 0
                  ? t("In Stock", "متوفر")
                  : t("Out of Stock", "غير متوفر")
              }
              color={product.stock > 0 ? "success" : "error"}
              size="small"
            />
          </Box>

          <Typography className="font-medium mb-3">
            {t("Quantity", "الكمية")}
          </Typography>

          {/* QUANTITY + ADD TO CART */}
          <Box className="mb-6 mt-4 flex flex-wrap items-center gap-5">
            {/* QUANTITY */}
            <Box className="flex items-center gap-2">
              <IconButton
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                sx={{ border: 1, borderColor: "divider" }}
              >
                <RemoveIcon />
              </IconButton>

              <Typography
                sx={{ minWidth: 25, textAlign: "center" }}
                fontWeight="bold"
              >
                {quantity}
              </Typography>

              <IconButton
                onClick={increaseQuantity}
                disabled={quantity >= product.stock}
                aria-label="Increase quantity"
                sx={{ border: 1, borderColor: "divider" }}
              >
                <AddIcon />
              </IconButton>
            </Box>

            {/* ADD TO CART */}
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCartOutlinedIcon />}
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              sx={{
                flex: "0 1 280px",
                px: 3,
                py: 1.5,
                whiteSpace: "nowrap",
                direction: isArabic ? "rtl" : "ltr",
  gap: 1,
  "& .MuiButton-startIcon": {
    margin: 0,
  }
              }}
            >
              {t("Add to Cart", "أضف إلى السلة")}
            </Button>
          </Box>
          {added && (
            <Box className="mt-4 mb-6 flex items-center gap-2">
              <CheckCircleIcon sx={{ color: "success.main", fontSize: 18 }} />
              <Typography variant="body2" color="success.main">
                {t("Added to cart successfully", "تمت الإضافة إلى السلة بنجاح")}
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
