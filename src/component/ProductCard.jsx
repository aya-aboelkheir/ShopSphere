import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Chip,
  Box,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useWishlist } from "../context/WishlistContext";
import { useNavigate , Link} from "react-router-dom";

export default function ProductCard({product,language="en"}){
    const isArabic = language == "ar";
    const navigate = useNavigate();

    const openProduct = () =>{
      navigate(`/products/${product.id}`)
    }
    const {
      toggleWishlist,
  isInWishlist,
    } = useWishlist();
      const favorite = isInWishlist(product.id);

    return(
         <Card className="h-full cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" onClick={openProduct} 
        onKeyDown={(event) => {
    if (event.key === "Enter") openProduct();
  }}
         role="link"
         tabIndex={0}
         >
         <Box className="relative">
      <CardMedia
        component="img"
        alt={product.title}
        image={product.thumbnail}
        className="h-56 bg-gray-100 object-contain p-4"
      />
      {product.discountPercentage > 0 && (
        <Chip 
        label={`${Math.round(product.discountPercentage)}% OFF`}
        color="error"
        size="small"
        className="absolute left-3 top-3"
        />
      )}
      <IconButton
      color="error"
     onClick={(event) => {
  event.stopPropagation();
  toggleWishlist(product);
}}
      aria-label="Toggle wishlist"
      className="absolute right-3 top-3 p-0"
      >
        {favorite ? <FavoriteIcon/>:<FavoriteBorderIcon/>}
      </IconButton>
        </Box>
        <CardContent>
        <Typography variant="caption" color="text.secondary" className="capitalize" >
          {product.category}
        </Typography>

        <Typography variant="h6" className="line-clamp-1 font-semibold">
         {product.title}
        </Typography>
        <Box className="flex items-center justify-between">
        <Typography variant="h6" color="primary" sx={{fontWeight:"bold"}}>
         ${product.price}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         ⭐ {product.rating}
        </Typography>
        </Box>

         <Button component={Link}  nativeButton={false} variant="contained" fullWidth className="mt-2" to={`/products/${product.id}`} onClick={(event) => event.stopPropagation()}>
          {isArabic?"عرض التفاصيل" : "View Details"}
         </Button>
      </CardContent>
       
    </Card>
    )

} 