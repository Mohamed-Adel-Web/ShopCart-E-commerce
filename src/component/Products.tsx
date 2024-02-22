/** @format */

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CardActions from "@mui/material/CardActions";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect } from "react";
import { productsFetch, product } from "../Slices/ProductsSplice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { addProduct } from "../Slices/ProductsSplice";
import FilterProducts from "./FilterProducts";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import HeroSection from "./HeroSection";
let productsList;
export default function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const Products = useSelector((state: RootState) => {
    return state.productsData.AllProducts;
  });
  useEffect(() => {
    const controller = new AbortController();

    dispatch(productsFetch());
    return () => {
      controller.abort();
    };
  }, [dispatch]);

  productsList = Products.map((product: product) => {
    const modifiedTitle: string = product.title.slice(0, 16) + "....";
    return (
      <Grid
        lg={3}
        md={4}
        sm={6}
        xs={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
        key={product.id}
      >
        {" "}
        <Card sx={{ minWidth: 280 }}>
          <Link to={`/product/${product.id}`}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="180"
              sx={{ objectFit: "contain" }}
              image={`${product.image}`}
            />
          </Link>
          <CardContent>
            <Typography
              gutterBottom
              sx={{
                fontWeight: "bold",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              component="div"
            >
              <Box className="product-name" sx={{ fontSize: "0.9rem" }}>
                {modifiedTitle}
              </Box>
              <Box sx={{ fontSize: "0.9rem" }} className="product-price">
                ${Math.round(product.price)}
              </Box>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.category}
            </Typography>
            <Box
              sx={{
                marginTop: "0.5rem ",
                display: "flex",
                alignItems: "center",
                fontSize: "0.8rem",
                justifyContent: { sm: "left", xs: "center" },
              }}
            >
              <Rating
                name="size-small"
                defaultValue={product.rating.rate}
                precision={0.5}
                size="small"
                sx={{ marginRight: "0.2rem" }}
              />
              ({product.rating.count})
            </Box>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: { sm: "left", xs: "center" },
            }}
          >
            {" "}
            <Button
              variant="contained"
              sx={{ fontWeight: "bold", borderRadius: 10 }}
              onClick={() => {
                dispatch(addProduct({ product: product, quantity: 1 }));
                toast.success("Product Added to Cart", {
                  style: {
                    padding: "1rem",
                    fontSize: "1.2rem",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    background: "#fafafa",
                  },
                });
              }}
            >
              Add to Cart
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  });
  return (
    <>
      <HeroSection />
      <Container maxWidth="lg" sx={{ marginTop: "3rem" }}>
        <Toaster
          position="top-right"
          reverseOrder={true}
          toastOptions={{
            success: {
              iconTheme: {
                primary: " #004d40",
                secondary: "white",
              },
            },
          }}
        />
        <FilterProducts />
        <Grid
          container
          sx={{ textAlign: { sm: "left", xs: "center" } }}
          spacing={4}
        >
          {productsList}{" "}
        </Grid>
      </Container>
    </>
  );
}
