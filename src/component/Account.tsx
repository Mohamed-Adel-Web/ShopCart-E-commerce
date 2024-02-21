/** @format */
import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import SignIn from "./SignIn";
import Register from "./Register";
interface drawer {
  open: boolean;
  handleClose: () => void;
}

export default function Account({ open, handleClose }: drawer) {
  const [value, setValue] = useState(0);
  const handleChange = (
    _event: React.ChangeEvent<HTMLElement>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  return (
    <div>
      <>
        <Drawer anchor={"right"} open={open}>
          <Typography>
            <Box
              className={"form"}
              sx={{ padding: "2rem", width: { md: "450px", xs: "100vw" } }}
            >
              <Box
                className={"form-header"}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  color: "primary.main",
                }}
              >
                LOGIN
                <IconButton
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <CloseIcon sx={{ fontSize: "2rem" }} />
                </IconButton>
              </Box>
              <Tabs
                value={value}
                onChange={handleChange}
                sx={{ marginTop: "2rem" }}
                centered
              >
                <Tab
                  label="SIGN IN"
                  sx={{
                    fontSize: "1rem",
                    marginRight: "4rem",
                    fontWeight: "bold",
                  }}
                />
                <Tab
                  label="Register"
                  sx={{ fontSize: "1rem", fontWeight: "bold" }}
                />
              </Tabs>
              {value == 0 ? <SignIn /> : <Register />}
            </Box>
          </Typography>
        </Drawer>
      </>
    </div>
  );
}
