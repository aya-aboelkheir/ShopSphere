import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Stack,
} from "@mui/material";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import { useNavigate } from "react-router-dom";

import ScrollReveal from "../component/ٍScrollReveal";

export default function About({ language = "en" }) {
  const isArabic = language === "ar";
  const navigate = useNavigate();

  const features = [
    {
      icon: <ShoppingBagOutlinedIcon fontSize="large" />,
      title: isArabic ? "منتجات متنوعة" : "Wide Selection",
      description: isArabic
        ? "اكتشف مجموعة متنوعة من المنتجات التي تناسب احتياجاتك."
        : "Discover a wide range of products for your everyday needs.",
    },
    {
      icon: <LocalShippingOutlinedIcon fontSize="large" />,
      title: isArabic ? "تجربة تسوق سهلة" : "Easy Shopping",
      description: isArabic
        ? "استمتع بتجربة تسوق بسيطة وسلسة من البداية للنهاية."
        : "Enjoy a simple and smooth shopping experience.",
    },
    {
      icon: <VerifiedUserOutlinedIcon fontSize="large" />,
      title: isArabic ? "تسوق بثقة" : "Shop with Confidence",
      description: isArabic
        ? "نهدف إلى تقديم تجربة واضحة وموثوقة لكل عميل."
        : "We aim to provide a reliable and transparent experience.",
    },
    {
      icon: <SupportAgentOutlinedIcon fontSize="large" />,
      title: isArabic ? "دعم العملاء" : "Customer Support",
      description: isArabic
        ? "نسعى لمساعدتك وتقديم تجربة أفضل في كل زيارة."
        : "We strive to make every visit a better experience.",
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "background.default",
          py: { xs: 8, md: 12 },
          textAlign: "center",
        }}
      >
        
<Container maxWidth="md">
  <ScrollReveal>
    <Typography
      color="primary"
      className="font-bold tracking-[3px]"
      gutterBottom
    >
      {isArabic ? "من نحن" : "ABOUT SHOPSPHERE"}
    </Typography>
  </ScrollReveal>

  <ScrollReveal delay={0.15}>
    <Typography
      variant="h2"
      sx={{
        fontWeight: "bold",
        mb: 3,
        fontSize: { xs: 36, md: 52 },
      }}
    >
      {isArabic ? "تسوق أذكى، عش أفضل" : "Shop Smarter, Live Better"}
    </Typography>
  </ScrollReveal>

  <ScrollReveal delay={0.3}>
    <Typography
      variant="h6"
      sx={{
        color: "text.secondary",
        lineHeight: 1.8,
        maxWidth: 700,
        mx: "auto",
      }}
    >
      {isArabic
        ? "نحن ShopSphere، وجهتك للتسوق الإلكتروني، ونسعى لتقديم تجربة سهلة وممتعة تساعدك على اكتشاف المنتجات التي تحتاجها."
        : "ShopSphere is your online shopping destination. We aim to make discovering and shopping for the products you need simple and enjoyable."}
    </Typography>
  </ScrollReveal>

  <ScrollReveal delay={0.45}>
    <Button
      variant="contained"
      size="large"
      sx={{ mt: 4, px: 4, py: 1.5 }}
      onClick={() => navigate("/products")}
    >
      {isArabic ? "اكتشف المنتجات" : "Explore Products"}
    </Button>
  </ScrollReveal>
</Container>

      </Box>

      {/* Story Section */}
      
{/* Story Section */}
<Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 } }}>
  <Grid container spacing={5} sx={{ alignItems: "center" }}>

    {/* Story Image */}
    <Grid size={{ xs: 12, md: 6 }}>
      <ScrollReveal>
        <Box
  sx={{
    overflow: "hidden",
    borderRadius: 3,
    width: "100%",
    height: { xs: 280, md: 420 },

    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.6s ease",
    },

    "&:hover img": {
      transform: "scale(1.08)",
    },
  }}
>
  <Box
    component="img"
    src="/imgs/ShopSphere Premium Shopping Studio.png"
    alt="ShopSphere shopping experience"
  />
</Box>
      </ScrollReveal>
    </Grid>

    {/* Story Text */}
    <Grid size={{ xs: 12, md: 6 }}>
      <ScrollReveal delay={0.3}>
        <Typography color="primary" className="font-bold" gutterBottom>
          {isArabic ? "قصتنا" : "OUR STORY"}
        </Typography>

        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", marginBottom: 3 }}
        >
          {isArabic
            ? "التسوق الإلكتروني بطريقة أبسط"
            : "A Simpler Way to Shop"}
        </Typography>

        <Typography
          sx={{ color: "text.secondary", lineHeight: 2 }}
        >
          {isArabic
            ? "بدأت فكرة ShopSphere من الرغبة في تقديم تجربة تسوق إلكتروني تجمع بين سهولة الاستخدام وتنوع المنتجات والتنظيم. نعمل على تطوير تجربة تجعل الوصول إلى ما تحتاجه أكثر سهولة."
            : "ShopSphere was created around a simple idea: make online shopping easier through an organized experience, product variety, and convenient navigation. We continue working to make finding what you need simpler."}
        </Typography>
      </ScrollReveal>
    </Grid>

  </Grid>
</Container>


      {/* Mission & Vision */}
      
{/* Mission & Vision */}
<Box sx={{ bgcolor: "action.hover", py: 8 }}>
  <Container maxWidth="lg">
    <Grid container spacing={3}>

      {/* Mission Card */}
      <Grid size={{ xs: 12, md: 6 }}>
        <ScrollReveal>
          <Paper elevation={0} sx={{ p: 4, height: "100%", boxShadow: 3 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              {isArabic ? "رسالتنا" : "Our Mission"}
            </Typography>

            <Typography
              sx={{ color: "text.secondary", lineHeight: 1.9 }}
            >
              {isArabic
                ? "توفير تجربة تسوق سهلة ومنظمة تساعد العملاء على اكتشاف المنتجات واتخاذ قرارات شراء مناسبة."
                : "To provide an easy and organized shopping experience that helps customers discover products and make informed choices."}
            </Typography>
          </Paper>
        </ScrollReveal>
      </Grid>

      {/* Vision Card */}
      <Grid size={{ xs: 12, md: 6 }}>
        <ScrollReveal delay={0.2}>
          <Paper elevation={0} sx={{ p: 4, height: "100%" , boxShadow: 3,}}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              {isArabic ? "رؤيتنا" : "Our Vision"}
            </Typography>

            <Typography
              sx={{ color: "text.secondary", lineHeight: 1.9 }}
            >
              {isArabic
                ? "أن نصبح تجربة تسوق إلكتروني مفضلة من خلال التطوير المستمر والاهتمام باحتياجات العملاء."
                : "To become a preferred online shopping experience through continuous improvement and customer focus."}
            </Typography>
          </Paper>
        </ScrollReveal>
      </Grid>

    </Grid>
  </Container>
</Box>


      {/* Features */}
      
{/* Features */}
<Container maxWidth="lg" sx={{ py: 9 }}>
  <ScrollReveal>
    <Typography
      variant="h4"
      sx={{
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 1,
      }}
    >
      {isArabic ? "لماذا ShopSphere؟" : "Why ShopSphere?"}
    </Typography>
  </ScrollReveal>

  <ScrollReveal delay={0.2}>
    <Typography
      sx={{
        color: "text.secondary",
        textAlign: "center",
        marginBottom: 5,
      }}
    >
      {isArabic
        ? "نسعى لتوفير تجربة أفضل في كل خطوة."
        : "We aim to make every step of your shopping experience better."}
    </Typography>
  </ScrollReveal>

  <Grid container spacing={3}>
    {features.map((feature, index) => (
      <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
        <ScrollReveal delay={index * 0.2}>
          <Paper
            elevation={0}
            variant="outlined"
            sx={{
              p: 3,
              height: "100%",
              textAlign: "center",
              transition: "all 0.3s ease",

    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: 5,
      borderColor: "primary.main",
    },
    "&:hover .feature-icon": {
  transform: "scale(1.15) rotate(5deg)",
},
            }}
          >
            <Box className="feature-icon" sx={{ color: "primary.main", marginBottom: 2,transition: "transform 0.3s ease"}}>
              {feature.icon}
            </Box>

            <Typography sx={{ fontWeight: "bold", marginBottom: 1 }}>
              {feature.title}
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "text.secondary", lineHeight: 1.8 }}
            >
              {feature.description}
            </Typography>
          </Paper>
        </ScrollReveal>
      </Grid>
    ))}
  </Grid>
</Container>


      {/* Final CTA */}
     
{/* Final CTA */}
<Box sx={{ bgcolor: "background.default", py: 8 }}>
  <Container maxWidth="md" sx={{ textAlign: "center" }}>
    <Stack sx={{ alignItems: "center" }} spacing={2}>
      <ScrollReveal>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          {isArabic
            ? "جاهز تبدأ تجربة التسوق؟"
            : "Ready to Start Shopping?"}
        </Typography>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/products")}
        >
          {isArabic ? "تسوق الآن" : "Shop Now"}
        </Button>
      </ScrollReveal>
    </Stack>
  </Container>
</Box>

    </Box>
  );
}
