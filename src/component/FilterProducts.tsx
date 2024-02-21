/** @format */

import Drawer from "@mui/material/Drawer";
import { Box } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryFetch,
  filteredProductsFetch,
  productsFetch,
} from "../Slices/ProductsSplice";
import { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
let categoryList;
export default function FilterProducts() {
  const [open, setOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const category = useSelector((state: RootState) => {
    return state.productsData.category;
  });
  useEffect(() => {
    dispatch(categoryFetch());
  }, [dispatch]);
  categoryList = category.map((cat) => {
    return (
      <FormControlLabel key={cat} value={cat} control={<Radio />} label={cat} />
    );
  });
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "1rem 0",
        }}
      >
        <Button
          sx={{ fontWeight: "bold" }}
          onClick={() => {
            setOpen(true);
          }}
          startIcon={<FilterAltIcon />}
        >
          Show Filter
        </Button>
        <Button
          sx={{ fontWeight: "bold" }}
          onClick={() => {
            dispatch(productsFetch());
            setCategoryValue("");
          }}
          startIcon={<FilterAltOffIcon />}
        >
          Clear Filter
        </Button>
      </Box>
      <Drawer anchor={"left"} open={open}>
        <Typography>
          <Box
            className={"filter"}
            sx={{ padding: "2rem", width: { md: "450px", xs: "100vw" } }}
          >
            <Box
              className="filter-header"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                marginBottom: "1.5rem",
              }}
            >
              {" "}
              <CloseIcon
                onClick={() => {
                  setOpen(false);
                }}
                sx={{ fontSize: "2rem", cursor: "pointer" }}
              />
              <Box
                sx={{
                  margin: "0 auto",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                Filter
              </Box>
              <Button
                sx={{ fontWeight: "bold" }}
                onClick={() => {
                  dispatch(productsFetch());
                  setCategoryValue("");
                  setOpen(false);
                }}
              >
                Clear
              </Button>
            </Box>{" "}
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
                sx={{ background: "#fafafa" }}
              >
                <Typography sx={{ fontWeight: "bold", color: "primary.main" }}>
                  Category
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={categoryValue}
                      onChange={(event) => {
                        setCategoryValue(event.target.value);
                      }}
                    >
                      {categoryList}
                    </RadioGroup>
                  </FormControl>
                </Typography>
                <Button
                  disabled={categoryValue == "" ? true : false}
                  sx={{ marginTop: "1rem" }}
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    dispatch(filteredProductsFetch(categoryValue));
                    setOpen(false);
                  }}
                >
                  Apply
                </Button>
              </AccordionDetails>
            </Accordion>{" "}
          </Box>
        </Typography>
      </Drawer>
    </>
  );
}
