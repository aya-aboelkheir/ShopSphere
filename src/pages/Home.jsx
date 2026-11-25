import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import ProductCard from "../component/ProductCard";
import { getProducts, getCategories } from "../services/ProductService";
import ScrollReveal from "../component/ٍScrollReveal";

export default function Home({ language = "en" }) {
  const isArabic = language == "ar";

  const [products, setProducts] = useState([]);
  const [categories, setCategoriess] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadHomeData() {
      try {
        setLoading(true);
        setError("");

        const [productsResponse, categoriesResponse] = await Promise.all([
          getProducts(30, 0, controller.signal),
          getCategories(controller.signal),
        ]);

        setProducts(productsResponse.products || []);
        setCategoriess(categoriesResponse || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            isArabic
              ? "حدث خطأ أثناء تحميل المنتجات. حاول مرة أخري."
              : "Something went wrong while loading products.",
          );
        }
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
    return () => {
      controller.abort();
    };
  }, [isArabic]);

  //   ------------------------------------
  const featuredProducts = products.slice(0, 4);
  const bestSellers = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);
  const newArrivals = [...products].sort((a, b) => b.id - a.id).slice(0, 4);

  const sectionTitle = (english, arabic) => (isArabic ? arabic : english);
  return (
    <>
      <Box>
        <Box
          sx={{
            position: "relative",
            minHeight: { xs: "520px", md: "620px" },
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            color: "#fff",

            backgroundImage: `
      linear-gradient(
        90deg,
        rgba(0,0,0,0.82) 0%,
        rgba(0,0,0,0.55) 48%,
        rgba(0,0,0,0.18) 100%
      ),
      url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=2000")
    `,
            backgroundSize: "110% auto",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",

            animation: "heroPan 10s ease-in-out infinite alternate",

            "@keyframes heroPan": {
              "0%": { backgroundPosition: "45% center" },
              "100%": { backgroundPosition: "60% center" },
            },

            "@keyframes heroText": {
              from: {
                opacity: 0,
                transform: "translateY(35px)",
              },
              to: {
                opacity: 1,
                transform: "translateY(0)",
              },
            },

            "& .hero-content": {
              animation: "heroText 1s ease-out both",
            },

            "& .hero-description": {
              animation: "heroText 1s ease-out 0.25s both",
            },

            "& .hero-button": {
              animation: "heroText 1s ease-out 0.5s both",
            },
          }}
        >
          <Container maxWidth="lg">
            <Box
              className="hero-content"
              sx={{
                maxWidth: "700px",
                py: { xs: 10, md: 14 },
                textAlign: isArabic ? "right" : "left",
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: "primary.light",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                }}
              >
                {sectionTitle(
                  "WELCOME TO SHOPSPHERE",
                  "أهلاً بك في SHOPSPHERE",
                )}
              </Typography>

              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: {
                    xs: "2.7rem",
                    md: "4.5rem",
                  },
                  lineHeight: 1.15,
                  mt: 2,
                  mb: 3,
                }}
              >
                {sectionTitle("Discover Your Style", "اكتشف أسلوبك الخاص")}
              </Typography>

              <Typography
                className="hero-description"
                variant="h6"
                sx={{
                  color: "rgba(255,255,255,0.82)",
                  fontWeight: 400,
                  lineHeight: 1.8,
                  maxWidth: "580px",
                  mb: 4,
                }}
              >
                {sectionTitle(
                  "Find everything you love in one place. Explore our latest collections and enjoy a smooth shopping experience.",
                  "اكتشف كل ما تحبه في مكان واحد واستمتع بتجربة تسوق مميزة.",
                )}
              </Typography>

              <Box className="hero-button">
                <Button
                  component={Link}
                  to="/products"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    px: 5,
                    py: 1.7,
                    borderRadius: "50px",
                    fontWeight: "bold",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  {sectionTitle("Shop Now", "تسوق الآن")}
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>

        <Container maxWidth="lg" className="py-16">
          <Box className="mb-8">
            <ScrollReveal>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {sectionTitle("Shop By Category", "تسوق حسب القسم")}
              </Typography>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <Typography sx={{ color: "text.secondary" }} className="mt-2">
                {sectionTitle(
                  "Explore our different categories",
                  "اكتشف الأقسام المختلفة",
                )}
              </Typography>
            </ScrollReveal>
          </Box>
          {loading ? (
            <CircularProgress />
          ) : (
            <Box className="flex flex-wrap gap-3 w-full">
              {categories.slice(0, 12).map((category, index) => {
                return (
                  <ScrollReveal key={category.slug} delay={index * 0.08}>
                    <Chip
                      label={category.name}
                      component={Link}
                      to={`/products?category=${category.slug}`}
                      clickable
                      variant="outlined"
                      className="px-3 py-5 text-base capitalize"
                    />
                  </ScrollReveal>
                );
              })}
            </Box>
          )}
        </Container>

        {error && (
          <Container maxWidth="lg" className="py-4">
            <Alert severity="error">{error}</Alert>
          </Container>
        )}

        {loading ? (
          <Box className="flex justify-center py-20">
            <CircularProgress size={45} />
          </Box>
        ) : (
          <>
            <Container maxWidth="lg" className="py-12">
              <Box className="mb-8 flex items-center justify-between gap-4">
                <Box>
                  <ScrollReveal>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                      {sectionTitle("Featured Products", "منتجات مميزة")}
                    </Typography>
                  </ScrollReveal>
                  <ScrollReveal delay={0.2}>
                    <Typography
                      sx={{ color: "text.secondary" }}
                      className="mt-2"
                    >
                      {sectionTitle(
                        "Our selected products for you",
                        "مجموعة مختارة من المنتجات",
                      )}
                    </Typography>
                  </ScrollReveal>
                </Box>
                <ScrollReveal delay={0.3}>
                  <Button component={Link} to="/products">
                    {sectionTitle("View All", "عرض الكل")}
                  </Button>
                </ScrollReveal>
              </Box>

              <Box className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
                {featuredProducts.map((product, index) => (
                  <ScrollReveal key={product.id} delay={index * 0.2}>
                    <ProductCard product={product} language={language} />
                  </ScrollReveal>
                ))}
              </Box>
            </Container>

            <Container maxWidth="lg" className="py-8">
              <ScrollReveal>
                <Box className="bg-gray-900 rounded-3xl px-8 py-12 text-center text-white md:px-16">
                  <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                    {sectionTitle(
                      "A Better Shopping Experience",
                      "تجربة تسوق أفضل",
                    )}
                  </Typography>
                  <ScrollReveal delay={0.2}>
                    <Typography className="mx-auto mb-6 mt-4 max-w-2xl text-gray-300">
                      {sectionTitle(
                        "Discover products you love and find your next favorite item.",
                        "اكتشف المنتجات التي تحبها واعثر على اختيارك القادم.",
                      )}
                    </Typography>
                  </ScrollReveal>
                  <ScrollReveal delay={0.4}>
                    <Button
                      component={Link}
                      to="/products"
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      {sectionTitle("Explore Collections", "اكتشف المجموعة")}
                    </Button>
                  </ScrollReveal>
                </Box>
              </ScrollReveal>
            </Container>

            <Container maxWidth="lg" className="py-12">
              <Box className="mb-8 flex items-center justify-between gap-4">
                <Box>
                  <ScrollReveal>
                    <Typography variant="h4" className="font-bold">
                      {sectionTitle("Best Sellers", "الأكثر تقييماً")}
                    </Typography>
                  </ScrollReveal>
                  <ScrollReveal delay={0.2}>
                    <Typography
                      sx={{ color: "text.secondary" }}
                      className="mt-2"
                    >
                      {sectionTitle(
                        "Products with the highest ratings",
                        "المنتجات الحاصلة على أعلى التقييمات",
                      )}
                    </Typography>
                  </ScrollReveal>
                </Box>
                <ScrollReveal delay={0.3}>
                  <Button component={Link} to="/products">
                    {sectionTitle("View All", "عرض الكل")}
                  </Button>
                </ScrollReveal>
              </Box>

              <Box className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
                {bestSellers.map((product, index) => (
                  <ScrollReveal key={product.id} delay={index * 0.2}>
                    <ProductCard product={product} language={language} />
                  </ScrollReveal>
                ))}
              </Box>
            </Container>

            <Container maxWidth="lg" className="py-12">
              <Box className="mb-8 flex items-center justify-between gap-4">
              <Box>
                <ScrollReveal>
                  <Typography variant="h4" className="font-bold">
                    {sectionTitle("New Arrivals", "أحدث المنتجات")}
                  </Typography>
                </ScrollReveal>
                <ScrollReveal delay={0.2}>
                  <Typography sx={{ color: "text.secondary" }}>
                    {sectionTitle(
                      "Check out the latest products",
                      "شاهد أحدث المنتجات",
                    )}
                  </Typography>
                </ScrollReveal>
              </Box>
              <ScrollReveal delay={0.3}>
                <Button component={Link} to="/products">
                  {sectionTitle("View All", "عرض الكل")}
                </Button>
                </ScrollReveal>
              </Box>
              <Box className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
                {newArrivals.map((product, index) => (
                  <ScrollReveal key={product.id} delay={index * 0.2}>
                    <ProductCard
                      key={product.id}
                      product={product}
                      language={language}
                    />
                  </ScrollReveal>
                ))}
              </Box>
            </Container>
          </>
        )}
      </Box>
    </>
  );
}
