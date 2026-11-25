import {
  Box,
  Container,
  Typography,
  Stack,
  IconButton,
  Divider,
  Link,
  colors,
} from "@mui/material";
import ScrollReveal from "../component/ٍScrollReveal";
import { Link as RouterLink } from "react-router-dom";

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

export default function Footer({language="en"}){
const isArabic= language === "ar";

const t = (en ,ar) =>(isArabic?ar:en)
const linkStyle = {
    color: "text.secondary",
    textDecoration: "none",
    "&:hover":{
        color: "primary.main"
    }
};


return (
  <ScrollReveal y={30} duration={0.8}>
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        mt: "auto",
        pt: 7,
        pb: 3,
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Box className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <ScrollReveal delay={0.1}>
            <Box>
              <Typography variant="h5" color="primary" className="font-bold">
                ShopSphere
              </Typography>

              <Typography sx={{ color: "text.secondary" }} className="mt-4">
                {t(
                  "Your style, your choice. Discover products you love.",
                  "أسلوبك واختيارك. اكتشف المنتجات التي تحبها."
                )}
              </Typography>

              <Stack direction="row" spacing={1} className="mt-3">
                <IconButton aria-label="facebook" color="primary">
                  <FacebookIcon />
                </IconButton>
                <IconButton aria-label="instagram" color="primary">
                  <InstagramIcon />
                </IconButton>
                <IconButton aria-label="X" color="primary">
                  <XIcon />
                </IconButton>
              </Stack>
            </Box>
          </ScrollReveal>

          {/* QUICK LINKS */}
          <ScrollReveal delay={0.3}>
            <Box>
              <Typography variant="h6" className="font-bold mb-4">
                {t("Quick Links", "روابط سريعة")}
              </Typography>

              <Stack spacing={2}>
                <Link component={RouterLink} to="/" sx={linkStyle}>
                  {t("Home", "الرئيسية")}
                </Link>
                <Link component={RouterLink} to="/products" sx={linkStyle}>
                  {t("Shop", "المنتجات")}
                </Link>
                <Link component={RouterLink} to="/about" sx={linkStyle}>
                  {t("About Us", "من نحن")}
                </Link>
              </Stack>
            </Box>
          </ScrollReveal>

          {/* CUSTOMER SERVICE */}
          <ScrollReveal delay={0.5}>
            <Box>
              <Typography variant="h6" className="font-bold mb-4">
                {t("Customer Service", "خدمة العملاء")}
              </Typography>

              <Stack spacing={2}>
                <Link href="#" sx={linkStyle}>
                  {t("FAQs", "الأسئلة الشائعة")}
                </Link>
                <Link href="#" sx={linkStyle}>
                  {t("Returns & Refunds", "الاستبدال والاسترجاع")}
                </Link>
              </Stack>
            </Box>
          </ScrollReveal>

          {/* CONTACT */}
          <ScrollReveal delay={0.4}>
            <Box>
              <Typography variant="h6" className="font-bold mb-4">
                {t("Contact Us", "تواصل معنا")}
              </Typography>

              <Stack spacing={2}>
                <Typography sx={{ color: "text.secondary" }}>
                  support@shopsphere.com
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {t("Egypt", "مصر")}
                </Typography>
              </Stack>
            </Box>
          </ScrollReveal>

        </Box>

        <Divider sx={{ my: 4 }} />

        <ScrollReveal >
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", textAlign: "center" }}
          >
            {t(
              "© 2026 ShopSphere. All rights reserved.",
              "© 2026 ShopSphere. جميع الحقوق محفوظة."
            )}
          </Typography>
        </ScrollReveal>
      </Container>
    </Box>
  </ScrollReveal>
);

}