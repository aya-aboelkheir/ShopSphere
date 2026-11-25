import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Divider,
  Stack,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
export default function CheckOut({ language = "en" }) {
  const isArabic = language === "ar";
  const navigate = useNavigate();

  const { cart, subtotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipcode: "",
  });
  const [error, setError] = useState("");

  const shipping = cart.length > 0 ? 5 : 0;
  const total = subtotal + shipping;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      setError(isArabic ? "سلة التسوق فارغة." : "Your cart is empty.");
      return;
    }

    const hasEmptyField = Object.values(formData).some(
      (value) => !value.trim(),
    );

    if (hasEmptyField) {
      setError(
        isArabic ? "من فضلك أكمل جميع البيانات." : "Please fill in all fields.",
      );
      return;
    }

    const order = {
      id: `ORD-${Date.now()}`,
      customer: formData,
      items: cart,
      subtotal,
      shipping,
      total,
      createAt: new Date().toISOString(),
    };

    localStorage.setItem("shopsphere-last-order", JSON.stringify(order));

    clearCart();
    navigate("/order-success");
  };

  if (cart.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 12, TextField: "center" }}>
        <Typography variant="h4" className="font-bold mb-10">
          {isArabic ? "سلة التسوق فارغة" : "Your cart is empty"}
        </Typography>
        <Button variant="contained" onClick={() => navigate("/products")}>
          {isArabic ? "تسوق الآن" : "Continue Shopping"}
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" className="font-bold mb-4">
        {isArabic ? "إتمام الطلب" : "Checkout"}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handlePlaceOrder}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
              <Typography variant="h6" className="font-bold mb-3">
                {isArabic ? "بيانات العميل" : "Customer Information"}
              </Typography>

              <Grid container spacing={2}>
                {[
                  {
                    name: "fullName",
                    label: isArabic ? "الاسم بالكامل" : "Full Name",
                    required: true,
                    minLength:3,
                    maxLength:60,
                    pattern:"^[\\p{L}][\\p{L}\\s'-]*$"
                  },
                  {
                    name: "email",
                    label: isArabic ? "البريد الإلكتروني" : "Email",
                    type: "email",
                    required: true,
                    maxLength:254,
                  },
                  {
                    name: "phone",
                    label: isArabic ? "رقم الهاتف" : "Phone Number",
                    type:"tel",
                    required: true,
                    minLength:10,
                    maxLength:15,
                    pattern:"^\\+?[0-9]{10,15}$"
                  },
                  {
                    name: "address",
                    label: isArabic ? "العنوان" : "Address",
                    required: true,
                    minLength:8,
                    maxLength:150,
                  },
                   {
                    name: "city",
                    label: isArabic ? "المدينة" : "City",
                    required: true,
                    minLength:2,
                    maxLength:50,
                    pattern:"^[\\p{L}][\\p{L}\\s'-]*$"
                  },
                   {
                    name: "zipcode",
                    label: isArabic ? "الرمز البريدي" : "ZIP Code",
                    required: false,
                    minLength:3,
                    maxLength:10,
                    pattern:"^[0-9A-Za-z -]{3,10}$"
                  },
                ].map((field) => (
                  <Grid key={field.name} size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required={field.required}
                      name={field.name}
                      label={field.label}
                      type={field.type || "text"}
                      value={formData[field.name]}
                      onChange={handleChange}
                      slotProps={{
                        htmlInput:{
                            minLength: field.minLength,
                            maxLength: field.maxLength,
                            pattern:field.pattern
                        }
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
              <Typography variant="h6" className="font-bold mb-3">
                {isArabic ? "ملخص الطلب" : "Order Summary"}
              </Typography>
              <Stack spacing={2}>
                {cart.map((item) => (
                  <Box key={item.id} className="flex justify-between gap-2">
                    <Typography variant="body2">
                      {item.title} × {item.quantity}
                    </Typography>
                    <Typography className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                ))}

                <Divider />

                <Box className="flex justify-between">
                  <Typography>
                    {isArabic ? "المجموع الفرعي" : "Subtotal"}
                  </Typography>
                  <Typography>${subtotal.toFixed(2)}</Typography>
                </Box>

                <Box className="flex justify-between">
                  <Typography>{isArabic ? "الشحن" : "Shipping"}</Typography>
                  <Typography>${shipping.toFixed(2)}</Typography>
                </Box>

                <Divider />

                <Box className="flex justify-between">
                  <Typography className="font-bold">
                    {isArabic ? "الإجمالي" : "Total"}
                  </Typography>
                  <Typography className="font-bold" color="primary">
                    ${total.toFixed(2)}
                  </Typography>
                </Box>

                <Button 
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{mt:2,py:1.5}}
                >
                    {isArabic ? "تأكيد الطلب" : "Place Order"}
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
