/** @format */
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { singleProductFetch } from "../Slices/ProductsSplice";
import { addProduct } from "../Slices/ProductsSplice";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ProductDetails() {
  const { productId } = useParams();
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) => {
    return state.productsData.singleProduct;
  });

  useEffect(() => {
    const controller = new AbortController();
    dispatch(singleProductFetch(Number(productId)));
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <Container maxWidth="xl" sx={{ marginTop: "2rem" }}>
      <Typography
        sx={{ margin: "1rem 0 2rem 0" }}
        className="product-classification"
      >
        <span
          className="category"
          style={{ color: "#9e9e9e", fontWeight: "bold" }}
        >
          {" "}
          {product.category}
        </span>
        <span style={{ margin: "0 0.3rem" }}>/</span>
        <span
          className="product-name"
          style={{ color: "primary.main", fontWeight: "bold" }}
        >
          {product.title}
        </span>
      </Typography>
      <Grid container spacing={2}>
        <Grid md={6} xs={12}>
          <Item>
            <CardMedia
              component="img"
              alt="green iguana"
              height="400"
              sx={{ objectFit: "contain" }}
              image={product.image}
            />
          </Item>
        </Grid>
        <Grid md={6} xs={12}>
          <Item
            elevation={0}
            sx={{
              textAlign: { md: "left", xs: "center" },
              paddingLeft: { md: "4rem" },
            }}
          >
            <Box className="product-details">
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "primary.main" }}
                className="product-name"
              >
                {product.title}
              </Typography>
              <Typography sx={{ margin: "0.5rem 0" }} className="product-desc">
                {" "}
                {product.description}
              </Typography>
              <Typography className="product-rating">
                {" "}
                <Rating
                  name="size-small"
                  defaultValue={product.rating.rate}
                  precision={0.5}
                  size="small"
                  sx={{ marginRight: "0.2rem" }}
                />
                ({product.rating.count})
              </Typography>
            </Box>
            <Box
              className="price-plan"
              sx={{
                padding: "1.5rem 0",
                margin: "1rem 0",
                borderTop: "1px solid #e0e0e0",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <Typography
                sx={{ fontWeight: "bold", color: "primary.main" }}
                variant="h5"
              >
                ${Math.round(product.price)} or {Math.round(product.price / 6)}
                /month
              </Typography>{" "}
              <Typography>
                Suggested payment with 6 months special financing
              </Typography>
            </Box>
            <Box className="product-action">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { md: "left", xs: "center" },
                }}
              >
                {" "}
                <Typography
                  sx={{
                    background: "#efefef",
                    width: "fit-content",
                    padding: "0.5rem 1rem",
                    borderRadius: "2rem",
                    color: "primary.main",
                  }}
                >
                  <IconButton
                    aria-label="decrease"
                    onClick={() => {
                      if (amount > 1) {
                        setAmount((amount: number): number => {
                          return amount - 1;
                        });
                      }
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <span
                    style={{ margin: "0 1rem", fontWeight: "bold" }}
                    className="amount"
                  >
                    {amount}
                  </span>
                  <IconButton
                    aria-label="increase"
                    onClick={() => {
                      setAmount((amount: number): number => {
                        return amount + 1;
                      });
                    }}
                  >
                    <AddIcon />{" "}
                  </IconButton>{" "}
                </Typography>
              </Box>
              <Typography className="add-product" sx={{ marginTop: "1.5rem" }}>
                <Button
                  sx={{
                    borderRadius: 28,
                    marginRight: "1rem",
                    padding: "0.5rem 3rem",
                    fontWeight: "bold",
                  }}
                  variant="contained"
                >
                  Buy Now
                </Button>
                <Button
                  sx={{
                    borderRadius: 28,
                    padding: "0.5rem 2rem",
                    fontWeight: "bold",
                  }}
                  variant="outlined"
                  onClick={() => {
                    dispatch(addProduct({ product, quantity: amount }));
                  }}
                >
                  Add to cart
                </Button>
              </Typography>{" "}
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
}
