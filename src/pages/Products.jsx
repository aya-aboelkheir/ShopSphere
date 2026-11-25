import { useEffect, useState } from "react";

import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getCategories, getCatalogProducts } from "../services/ProductService";
import ProductCard from "../component/ProductCard";

import { useSearchParams } from "react-router-dom";


export default function Products({ language = "en" }) {
  const isArabic = language === "ar";
  const t = (english, arabic) => (isArabic ? arabic : english);
const [searchParams, setSearchParams] = useSearchParams();

  //products data
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(
  () => searchParams.get("category") || ""
);
  const [total, setTotal] = useState(0);
  //search and filtals
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
 
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");
  //pagination
  const [page, setPage] = useState(1);
  const productsPerPage = 12;
  //loading and errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const selectedCategory = searchParams.get("category") || "";

  setCategory(selectedCategory);
  setPage(1);
}, [searchParams]);

  //load categories
  useEffect(() => {
    const controller = new AbortController();

    async function loadCategories() {
      try {
        const data = await getCategories(controller.signal);
        setCategories(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("categories error", err);
        }
      }
    }
    loadCategories();
    return () => controller.abort();
  }, []);
  //load products whenever filters change
  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");
        const data = await getCatalogProducts({
          limit: productsPerPage,
          skip: (page - 1) * productsPerPage,
          search,
          category,
          sortBy,
          order,
          signal: controller.signal,
        });
        setProducts(data.products || []);
        setTotal(data.total || 0);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            t(
              "Unable to load products. Please try again.",
              "تعذر تحميل المنتجات. حاول مرة أخرى.",
            ),
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }
    loadProducts();
    return () => controller.abort();
  }, [page, search, category, sortBy, order]);

  //submit search
  const handleSearch = (event) => {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput);
  };

  //change category
 const handleCategoryChange = (event) => {
  const value = event.target.value;

  setPage(1);
  setCategory(value);

  if (value) {
    setSearchParams({ category: value });
  } else {
    setSearchParams({});
  }
};

  //chang sorting
  const handleSortChange = (event) => {
    const value = event.target.value;
    setPage(1);
    if (!value) {
      setSortBy("");
      setOrder("asc");
      return;
    }
    const [field, direction] = value.split("-");
    setSortBy(field);
    setOrder(direction);
  };

  //clear all filters
  const clearFilters = () => {
    setSearchInput("");
    setSearch("");
    setCategory("");
    setSortBy("");
    setOrder("asc");
    setPage(1);
    setSearchParams({});
  };
  const pageCount = Math.ceil(total / productsPerPage);
  return (
    <>
      <Box sx={{ minHeight: "70vh", py: 6 }}>
        <Container maxWidth="lg">
          {/* PAGE HEADER */}
          <Box>
            <Typography
              variant="overline"
              color="primary"
              className="font-bold"
            >
              SHOPSPHERE COLLECTION
            </Typography>
            <Typography variant="h3" className="mt-2 font-bold">
              {t("All Products", "كل المنتجات")}
            </Typography>
            <Typography sx={{ color: "text.secondary",marginBottom:2 }}>
              {t(
                "Discover our collection and find your favorite products.",
                "اكتشف مجموعتنا واختر المنتجات المفضلة لديك.",
              )}
            </Typography>
          </Box>

          {/* SEARCH AND FILTERS */}
          <Box className="mb-8 flex flex-col gap-4 md:flex-row ">
            <Box
              component="form"
              className="flex flex-1 gap-2"
              onSubmit={handleSearch}
            >
              <TextField
                fullWidth
                size="small"
                placeholder={t("Search products...", "ابحث عن منتج...")}
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                variant="outlined"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Button type="submit" variant="contained">
                {t("search", "بحث")}
              </Button>
            </Box>

            <FormControl size="small" className="min-w-full md:min-w-48">
              <InputLabel>{t("Category", "القسم")}</InputLabel>
              <Select
              value={category}
                label={t("Category", "القسم")}
                onChange={handleCategoryChange}
              >
                <MenuItem value="">
                  {t("All Categories", "كل الأقسام")}
                </MenuItem>
                {categories.map((item) => (
                  <MenuItem key={item.slug} value={item.slug}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/**SORT */}
            <FormControl size="small" className="min-w-full md:min-w-48">
              <InputLabel>{t("Sort By", "ترتيب حسب")}</InputLabel>

              <Select
                value={sortBy ? `${sortBy}-${order}` : ""}
                label={t("Sort By", "ترتيب حسب")}
                onChange={handleSortChange}
              >
                <MenuItem value=""> {t("Default", "الافتراضي")}</MenuItem>
                <MenuItem value="price-asc">
                  {t("Price: Low to High", "السعر: من الأقل للأعلى")}
                </MenuItem>

                <MenuItem value="price-desc">
                  {t("Price: High to Low", "السعر: من الأعلى للأقل")}
                </MenuItem>

                <MenuItem value="rating-desc">
                  {t("Highest Rated", "الأعلى تقييماً")}
                </MenuItem>

                <MenuItem value="title-asc">
                  {t("Name: A to Z", "الاسم: أ إلى ي")}
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/**RESULT INFO */}
          <Box className="mb-6">
            <Typography sx={{ color: "text.secondary" }}>
              {t("showing", "عرض")} {products.length} {t("of", "من")} {total}{" "}
              {t("products", "منتج")}
            </Typography>

            {(search || category || sortBy) && (
              <Button
                onClick={clearFilters}
                variant="text"
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                  "&:hover": {
                    color: "primary.main",
                    backgroundColor: "action.hover",
                  },
                }}
              >
                {t("Clear Filters", "مسح الفلاتر")}
              </Button>
            )}
          </Box>

          {/* Error */}
          {error && (
            <Alert severity="error">
        {error}
      </Alert>
          )}

      {/* PRODUCTS */}
{loading ? (
  <Box className="flex justify-center py-20">
    <CircularProgress />
  </Box>
) : products.length > 0 ? (
  <Box className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {products.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        language={language}
      />
    ))}
  </Box>
) : (
  <Box>
    <Typography variant="h5" fontWeight="bold">
      {t("No products found", "لا توجد منتجات")}
    </Typography>

    <Typography color="text.secondary" className="mt-2">
      {t(
        "Try changing your search or filters.",
        "جرب تغيير البحث أو الفلاتر."
      )}
    </Typography>

    <Button
      variant="outlined"
      onClick={clearFilters}
      className="mt-5"
    >
      {t("Clear Filters", "مسح الفلاتر")}
    </Button>
  </Box>
)}

{/* pagination */}
{!loading && pageCount >1 && (
    <Box className="mt-12 flex justify-center">
      <Pagination count={pageCount} page={page} 
      onChange={(event,value)=>{
        setPage(value);
        window.scrollTo({
            top:0,
            behavior:"smooth"
        });
      }}
      color="primary"
      size="large"
      shape="rounded"
      />

    </Box>
)}
        </Container>
      </Box>
      

    </>
  );
}
