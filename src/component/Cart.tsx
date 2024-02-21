/** @format */

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { cartProduct } from "../Slices/ProductsSplice";
import {
  addProduct,
  removeProduct,
  deleteProduct,
} from "../Slices/ProductsSplice";
import { useState } from "react";
let cartList;
export default function Cart() {
  const [open, setOpen] = useState(false);
  const [deletedProduct, setDeletedProduct] = useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch<AppDispatch>();
  const cartProducts: cartProduct[] = useSelector((state: RootState) => {
    return state.productsData.cartProducts;
  });
  const totalProduct: number = useSelector((state: RootState) => {
    return state.productsData.allQuantity;
  });
  const totalPrice: number = useSelector((state: RootState) => {
    return state.productsData.totalPrice;
  });
  cartList = cartProducts.map((product) => {
    return (
      <Box
        className="cart-product"
        sx={{
          padding: "1rem",
          display: "flex",
        }}
        key={product.id}
      >
        <Box className="product-image">
          {" "}
          <CardMedia
            component="img"
            alt="green iguana"
            height="180"
            sx={{ objectFit: "contain" }}
            image={product.image}
          />
        </Box>

        <Box
          className="product-details"
          sx={{
            padding: "1rem",
            color: "primary.main",
          }}
        >
          <Typography className="product-title">{product.title}</Typography>
          <Typography className="product-price" sx={{ fontWeight: "bold" }}>
            {Math.round(product.price * product.quantity)} $
          </Typography>
          <Box
            className="cart-product-action"
            sx={{ display: "flex", margin: "1rem 0" }}
          >
            <Button
              sx={{ marginRight: "0.5rem" }}
              startIcon={<DeleteOutlineOutlinedIcon />}
              onClick={() => {
                handleClickOpen();
                setDeletedProduct(product);
              }}
            >
              Remove
            </Button>
            <Box
              className="product-quantity-control"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {product.quantity > 1 ? (
                <IconButton
                  aria-label="decrease"
                  onClick={() => {
                    dispatch(removeProduct(product));
                  }}
                >
                  <RemoveIcon />
                </IconButton>
              ) : (
                ""
              )}

              <Typography style={{ margin: "0 0.5rem", whiteSpace: "nowrap" }}>
                Quantity {product.quantity}
              </Typography>
              <IconButton
                aria-label="increase"
                onClick={() => {
                  dispatch(addProduct(product));
                }}
              >
                <AddIcon />{" "}
              </IconButton>
            </Box>
          </Box>{" "}
        </Box>
      </Box>
    );
  });
  return (
    <>
      {cartProducts.length > 0 ? (
        <Container maxWidth="xl" sx={{ margin: "2rem 0" }}>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle
              id="alert-dialog-title"
              sx={{
                color: "#004d40",
                fontWeight: "BOLD",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              DELETE PRODUCT
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-description"
                sx={{ color: "#004d40", fontWeight: "BOLD" }}
              >
                By doing this, the product will be removed from your cart. Do
                you confirm?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  handleClose();
                  dispatch(deleteProduct(deletedProduct));
                }}
                autoFocus
                sx={{ fontWeight: "bold", letterSpacing: "0.2rem" }}
              >
                DELETE
              </Button>
            </DialogActions>
          </Dialog>
          <Typography
            variant="h5"
            className="cart-quantity"
            sx={{
              textTransform: "capitalize",
              fontWeight: "BOLD",
              color: "primary.main",
              marginBottom: "1rem",
            }}
          >
            shopping cart ({totalProduct} product)
          </Typography>
          <Typography
            variant="h6"
            className="adv"
            sx={{
              textAlign: "center",
              background: "#fafafa",
              padding: "1rem 0",
              color: "primary.main",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                border: "3px solid #004d40",
                borderRadius: "50%",
                marginRight: "0.3rem",
              }}
            ></div>
            You got the{" "}
            <span style={{ fontWeight: "bold", margin: "0 0.3rem" }}>
              free shipping
            </span>{" "}
            opportunity!
          </Typography>
          <Grid
            container
            sx={{ margin: "1rem 0" }}
            className="cart-products-details"
          >
            <Grid
              md={8}
              xs={12}
              sx={{
                border: "1px solid  #e0e0e0",
                boxShadow: " rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
              }}
            >
              {cartList}{" "}
            </Grid>

            <Grid
              md={3.5}
              xs={12}
              className="cart-order"
              sx={{
                border: "1px solid #e0e0e0",
                padding: "1rem",
                height: "fit-content",
                margin: { md: "0 1rem", xs: "1rem 0" },
              }}
            >
              <Typography
                className="total-price"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                  alignItems: "center",
                }}
              >
                Total Amount{" "}
                <span
                  className="total-price"
                  style={{ fontWeight: "bold", fontSize: "1.2rem" }}
                >
                  {Math.round(totalPrice)} $
                </span>
              </Typography>
              <Button fullWidth variant="contained">
                complete order
              </Button>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Box sx={{ textAlign: "center", margin: "3rem 0" }}>
          <ShoppingBagOutlinedIcon
            sx={{
              fontSize: "6rem",
              color: "primary.main",
              marginBottom: "2rem",
            }}
          />
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "primary.main", margin: "1rem 0" }}
          >
            No products in your basket.
          </Typography>
          <Typography
            sx={{
              lineHeight: "2.5",
              wordSpacing: "0.1rem",
              color: "primary.main",
            }}
          >
            Thousands of ShopCart products are waiting for you <br />. You can
            start to discover ShopCart with category links..
          </Typography>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Button
              variant="contained"
              sx={{ margin: "4rem 0 2rem 0", padding: "1rem ", width: "20rem" }}
            >
              Go TO home page
            </Button>
          </Link>
        </Box>
      )}
    </>
  );
}
