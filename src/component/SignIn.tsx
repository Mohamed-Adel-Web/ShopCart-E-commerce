/** @format */
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import { Box, FormControl } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Box className={"sign-in-form"} sx={{ marginTop: "2rem" }}>
      <TextField
        id="standard-basic"
        label="E-mail Address"
        variant="standard"
        fullWidth
      />
      <FormControl fullWidth sx={{ marginTop: "2rem" }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          fullWidth
          id="standard-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Box
        className="sign-in-option"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "2rem 0",
        }}
      >
        {" "}
        <FormControlLabel
          sx={{ fontSize: "1rem" }}
          control={<Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }} />}
          label={
            <Typography variant="headline" component={"h6"}>
              Remember me
            </Typography>
          }
        />
        <h6 className="forgot-pass">forgot password ?</h6>{" "}
      </Box>
      <Box sx={{ textAlign: "center" }}>
        {" "}
        <Button variant="contained" sx={{ padding: "0.9rem 0" }} fullWidth>
          Sign in
        </Button>
      </Box>
    </Box>
  );
}
