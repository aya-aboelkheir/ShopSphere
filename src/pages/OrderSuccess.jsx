import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Stack,
  Divider,
} from "@mui/material";

import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { useNavigate } from "react-router-dom";
import {  useState } from "react";

import { motion } from "framer-motion";
export default function OrderSuccess({ language = "en" }) {
  const isArabic = language === "ar";
  const navigate = useNavigate();
  const t = (ar,en)=> isArabic?ar:en
  const [order, setOrder] = useState(() => {
    const savedOrder = localStorage.getItem("shopsphere-last-order");

    return savedOrder ? JSON.parse(savedOrder):null
  });

  console.log("Order:", order);

  if(!order){
    return(
        <Container maxWidth="sm" sx={{py:10,textAlign:"center"}}>
            <Typography variant="h5" className="font-bold" gutterBottom>
                {t("لا يوجد طلب لعرضه" , "No order found")}
            </Typography>
            <Button variant="contained" onClick={()=>navigate("/products")}>
                 {t("تصفح المنتجات" , "Browse Products")}
            </Button>
        </Container>
    );
  }

  return(
    <Container maxWidth="md" sx={{py:7}}>
        <Paper 
        variant="outlined"
        sx={{
            p: {xs:3,sm:5},
            textAlign:"center",
            borderRadius:3
        }}
        >
            <motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{
    type: "spring",
    stiffness: 200,
    damping: 12,
  }}
>
  <CheckCircleOutlineOutlinedIcon
    color="success"
    sx={{ fontSize: 75, mb: 2 }}
  />
</motion.div>
            <Typography variant="h4" className="font-bold " gutterBottom >
                {t("تم استلام طلبك بنجاح!" , "Order Placed Successfully!")}
            </Typography>
            <Typography sx={{color:"text.secondary",mb:3}}>
                {t("شكرًا لثقتك بنا. تم تسجيل طلبك بنجاح."
            , "Thank you for shopping with us. Your order has been received.")}
            </Typography>

            <Divider sx={{my:3}}/>

            <motion.div
  initial={{ opacity: 0, y: 15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0.25 }}
>
  <Stack spacing={2} sx={{textAlign:"start"}}>
                <Box className="flex justify-between" >
                    <Typography sx={{color:"text.secondary"}}>
                        {t("رقم الطلب" , "Order Number")}
                    </Typography>
                    <Typography className="font-bold">
                        {order.id}
                    </Typography>
                </Box>

                <Box className="flex justify-between">
                    <Typography sx={{color:"text.secondary"}}>
                        {t( "اسم العميل" , "Customer")}
                    </Typography>
                    <Typography className="font-medium">
                        {order.customer.fullName}
                    </Typography>
                </Box>

                <Box className="flex justify-between">
                    <Typography sx={{color:"text.secondary"}}>
                        {t( "عدد المنتجات" , "Items")}
                    </Typography>
                    <Typography className="font-medium">
                        {order.items.reduce(
                            (total,item) => total + item.quantity
                            ,0
                        )}
                    </Typography>
                </Box>

                <Divider/>

                <Typography variant="h6" className="font-bold">
                    {t("تفاصيل المنتجات" , "Order Items")}
                </Typography>

                {order.items.map((item)=>(
                    <Box key={item.id} className="flex justify-between">
                        <Typography variant="body2">
                            {item.title} × {item.quantity}
                        </Typography>
                        <Typography variant="body2" className="font-bold">
                            ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                    </Box>
                ))}

                <Divider/>

                <Box className="flex justify-between">
                    <Typography color="text.secondary">
                        {t( "الإجمالي" , "Total")}
                    </Typography>
                    <Typography  variant="h6"
              color="primary"
              fontWeight="bold">
                        ${order.total.toFixed(2)}
                    </Typography>
                </Box>
            </Stack>
            </motion.div>

            <Button  variant="contained"
          size="large"
          fullWidth
          sx={{ mt: 4, py: 1.5 }}
          onClick={() => navigate("/products")}>
                {t("مواصلة التسوق" , "Continue Shopping")}
            </Button>
        </Paper>
    </Container>
  )
}
