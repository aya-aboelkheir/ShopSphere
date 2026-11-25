import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

import { AnimatePresence, motion } from "framer-motion";

const MotionGrid = motion(Grid);
export default function WishList({language = "en"}){

    const isArabic = language === "ar";
    const navigate = useNavigate();

    const {wishlist,wishlistCount,removeFromWishlist}=useWishlist();
    const{addToCart} = useCart();

    const handleAddToCart= (product)=>{
        addToCart(product);
        removeFromWishlist(product.id);
    }
    return (
        <Container maxWidth="lg" sx={{py:6}}>
            <Typography variant="h4" className="font-bold mb-1">
                {isArabic ? "قائمة المفضلة" : "My Wishlist"}
            </Typography>

            <Typography sx={{color:"text.secondary", marginBottom:4}}>
                {isArabic
          ? `${wishlistCount} منتجات محفوظة`
          : `${wishlistCount} saved products`}
            </Typography>

            {wishlistCount === 0 ?(
                <AnimatePresence mode="wait">
  {wishlistCount === 0 ? (
    <motion.div
      key="empty"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box sx={{ textAlign: "center" }} className="py-8">
        <Typography variant="h6" className="mb-5">
          {isArabic
            ? "قائمة المفضلة فارغة"
            : "Your wishlist is empty"}
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/products")}
        >
          {isArabic ? "تصفح المنتجات" : "Explore Products"}
        </Button>
      </Box>
    </motion.div>
  ) : (
    <motion.div
      key="wishlist"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* حط هنا Grid المنتجات الموجود عندك كما هو */}
    </motion.div>
  )}
</AnimatePresence>
            ):(
                <Grid container spacing={3}>
  <AnimatePresence>
    {wishlist.map((product) => (
      <MotionGrid
        key={product.id}
        size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
        layout
        initial={false}
        exit={{
          opacity: 0,
          scale: 0.9,
          y: 15,
        }}
        transition={{ duration: 0.3 }}
      >
                            <Card sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}>
                                <CardMedia
                                component="img"
                                height="200"
                                image={product.thumbnail}
                                alt={product.title}
                                sx={{
                                    objectFit:"contain",
                                    p:2,
                                    cursor:"pointer"
                                }}
                                onClick={()=>navigate(`/products/${product.id}`)}
                                />

                                <CardContent sx={{flexGrow:1}}>
                                    <Typography className="font-bold" gutterBottom noWrap>
                                        {product.title}
                                    </Typography>
                                    <Typography color="primary" className="font-bold">
                                        ${product.price}
                                    </Typography>
                                </CardContent>

                                <CardActions sx={{justifyContent:"space-between",px:2,pb:2}}>
                                    <Button size="small" startIcon={<ShoppingCartOutlinedIcon/>} onClick={()=>handleAddToCart(product)} sx={{ direction: isArabic ? "rtl" : "ltr",
  gap: 1,
  "& .MuiButton-startIcon": {
    margin: 0,
  }}}>
                                        {isArabic ? "أضف للسلة" : "Add to Cart"}
                                    </Button>

                                    <IconButton color="error" aria-label="Remove from wishlist" onClick={()=>removeFromWishlist(product.id)}>
                                        <DeleteOutlinedIcon/>
                                    </IconButton>
                                </CardActions>
                            </Card>
                             </MotionGrid>
    ))}
  </AnimatePresence>
</Grid>
            )}
        </Container>
    )
}