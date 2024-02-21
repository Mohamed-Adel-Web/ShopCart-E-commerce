/** @format */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Account from "./Account";
import { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import Banner from "./Banner";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { getCartProducts } from "../Slices/ProductsSplice";
import { Link } from "react-router-dom";
export default function NavBar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const productQuantity = useSelector((state: RootState) => {
    return state.productsData.allQuantity;
  });
  useEffect(() => {
    dispatch(getCartProducts());
  }, [dispatch]);
  function handleClose(): void {
    setOpen(false);
  }
  return (
    <>
      <AppBar position="sticky" sx={{ background: "#f5f5f5" }}>
        <Banner />
        <Container
          maxWidth={"xl"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 1.5rem",
          }}
        >
          <Link style={{ textDecoration: "none", color: "inherit" }} to={""}>
            <Typography
              className="logo"
              sx={{
                fontWeight: "bold",
                fontSize: "1.8rem",
                color: "primary.main",
                display: "flex",
                alignItems: "center",
              }}
            >
              Shopcart
            </Typography>
          </Link>
          <Typography sx={{ display: "flex" }}>
            <Box
              className={"nav-list"}
              sx={{
                display: "flex",
                alignItems: "center",
                color: "primary.main",
                cursor: "pointer",
                fontWeight: "bold",
                className: "nav-list",
                position: "relative",
              }}
              onClick={() => {
                setOpen(true);
              }}
            >
              {" "}
              <PersonIcon sx={{ marginRight: "0.5rem" }} />
              Account
            </Box>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={"/Cart"}
            >
              <Box
                className={"nav-list"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "primary.main",
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginLeft: "3rem",
                  position: "relative",
                }}
              >
                {" "}
                <Badge
                  badgeContent={productQuantity}
                  color="primary"
                  sx={{ marginRight: "0.8rem" }}
                >
                  <AddShoppingCartIcon />
                </Badge>
                Cart{" "}
              </Box>
            </Link>
          </Typography>
        </Container>
        <Account open={open} handleClose={handleClose} />
      </AppBar>
    </>
  );
}
