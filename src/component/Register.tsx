/** @format */
import Button from "@mui/material/Button";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import { FormControl } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { Box } from "@mui/material";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
const emailRegex: RegExp =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const nameRegex: RegExp =
  /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;

const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
type form = {
  name: string;
  email: string;
  password: string;
  gender: string;
  date: Date | null;
};
type regexCheck = {
  name: boolean;
  email: boolean;
  password: boolean;
};
export default function Register() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<form>({
    name: "",
    email: "",
    password: "",
    gender: "",
    date: null,
  });
  const [regexCheck, setRegexCheck] = useState<regexCheck>({
    name: false,
    email: false,
    password: false,
  });

  const handleClickShowPassword = () =>
    setShowPassword((show: boolean) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box className={"Register-Form"} sx={{ marginTop: "2rem" }}>
      <TextField
        fullWidth
        error={regexCheck.name}
        id="standard-basic"
        label="Full Name"
        variant="standard"
        value={formData.name}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setFormData({ ...formData, name: event.target.value });
          setRegexCheck({
            ...regexCheck,
            name: !nameRegex.test(formData.name),
          });
        }}
      />
      <TextField
        fullWidth
        error={regexCheck.email}
        id="standard-basic"
        label={!regexCheck.email ? "E-mail Address" : "Incorrect E-mail"}
        variant="standard"
        sx={{ margin: "2rem 0" }}
        value={formData.email}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setFormData({ ...formData, email: event.target.value });
          setRegexCheck({
            ...regexCheck,
            email: !emailRegex.test(formData.email),
          });
        }}
      />
      <FormControl fullWidth variant="standard" sx={{ marginBottom: "2rem" }}>
        <InputLabel
          htmlFor="standard-adornment-password"
          color={regexCheck.password ? "error" : "success"}
        >
          {!regexCheck.password ? "Password" : "Password is too weak"}
        </InputLabel>
        <Input
          error={regexCheck.password}
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
          value={formData.password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, password: event.target.value });
            setRegexCheck({
              ...regexCheck,
              password: !passwordRegex.test(formData.password),
            });
          }}
        />
      </FormControl>
      <DemoItem label="Date of Birth" sx={{ margin: "2rem 0" }}>
        <DesktopDatePicker
          value={formData.date}
          onChange={(dateNewValue) => {
            setFormData({ ...formData, date: dateNewValue.$d ?? null });
          }}
        />
      </DemoItem>
      <FormControl sx={{ margin: "2rem 0" }}>
        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={formData.gender}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, gender: event.target.value });
          }}
        >
          <FormControlLabel
            value="male"
            control={<Radio />}
            label="Male"
            sx={{ marginRight: "2rem" }}
          />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
      </FormControl>
      <Button variant="contained" sx={{ padding: "0.9rem 0" }} fullWidth>
        Register
      </Button>
    </Box>
  );
}
