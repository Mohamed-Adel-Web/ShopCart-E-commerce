/** @format */

import { ThemeProvider } from "@emotion/react";
import "./App.css";
import { createTheme } from "@mui/material/styles";
import Backdrop from "@mui/material/Backdrop";
import NavBar from "./component/NavBar";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Route, Routes } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { RootState } from "./store";
import { useSelector } from "react-redux";
import Cart from "./component/Cart";
const LazyLoading = React.lazy(() => import("./component/Products"));
import ProductDetails from "./component/ProductDetails";
const theme = createTheme({
  palette: {
    primary: { main: "#004d40" },
    secondary: { main: "#212121" },
  },
  typography: {
    fontFamily: ["Roboto"].join(),
  },
});
function App() {
  const progressState = useSelector((state: RootState) => {
    return state.productsData.progressState;
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <NavBar />
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={progressState}
          >
            <CircularProgress />
          </Backdrop>
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <React.Suspense
                    fallback={
                      <CircularProgress
                        style={{
                          position: "fixed",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%,-50%)",
                        }}
                      />
                    }
                  >
                    <LazyLoading />
                  </React.Suspense>
                }
              />
              <Route path="Cart" element={<Cart />} />
              <Route path="product/:productId" element={<ProductDetails />} />
            </Route>
          </Routes>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
