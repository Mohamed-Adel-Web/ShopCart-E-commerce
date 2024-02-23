/** @format */
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function Footer() {
  return (
    <Box className="footer" sx={{ marginTop: "9rem", overflow: "hidden" }}>
      <Container maxWidth="xl" sx={{ padding: "7rem 0" }}>
        <Grid container spacing={4}>
          <Grid xs={12} md={4}>
            <Item
              sx={{
                backgroundColor: "inherit",
                textAlign: { md: "left", xs: "center" },
                padding: "2rem",
              }}
              elevation={24}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "primary.main",
                  marginTop: "0.5rem  ",
                }}
              >
                ShopCart
              </Typography>
              <Typography
                sx={{
                  color: "primary.main",
                  fontWeight: "bold",
                  marginTop: "0.5rem",
                }}
              >
                More Than a Store, It's a Lifestyle: Dive into a World of
                Glamour, Fashion, and Futuristic Electronics.{" "}
              </Typography>
            </Item>
          </Grid>
          <Grid xs={12} md={2}>
            <Item
              sx={{
                backgroundColor: "inherit",
                textAlign: { md: "left", xs: "center" },
                padding: "2rem",
              }}
              elevation={24}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "primary.main",
                  marginBottom: "1.5rem  ",
                }}
              >
                Links
              </Typography>
              <Typography
                sx={{
                  color: "primary.main",
                  marginTop: "0.5rem",
                  fontWeight: "bold",
                }}
              >
                About
              </Typography>{" "}
              <Typography
                sx={{
                  color: "primary.main",
                  margin: "0.5rem 0",
                  fontWeight: "bold",
                }}
              >
                Products
              </Typography>{" "}
              <Typography sx={{ color: "primary.main", fontWeight: "bold" }}>
                {" "}
                offers
              </Typography>{" "}
              <Typography
                sx={{
                  color: "primary.main",
                  margin: "0.5rem 0",
                  fontWeight: "bold",
                }}
              >
                {" "}
                Contact
              </Typography>
            </Item>
          </Grid>
          <Grid xs={12} md={2}>
            <Item
              sx={{
                backgroundColor: "inherit",
                textAlign: { md: "left", xs: "center" },
                padding: "2rem",
              }}
              elevation={24}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "primary.main",
                  marginBottom: "1.5rem  ",
                }}
                variant="h5"
              >
                Categories
              </Typography>
              <Typography sx={{ color: "primary.main", fontWeight: "bold" }}>
                men's clothing
              </Typography>{" "}
              <Typography
                sx={{
                  color: "primary.main",
                  margin: "0.5rem 0",
                  fontWeight: "bold",
                }}
              >
                women's clothing
              </Typography>{" "}
              <Typography sx={{ color: "primary.main", fontWeight: "bold" }}>
                {" "}
                jewelery
              </Typography>{" "}
              <Typography
                sx={{
                  color: "primary.main",
                  margin: "0.5rem 0",
                  fontWeight: "bold",
                }}
              >
                {" "}
                electronics
              </Typography>
            </Item>
          </Grid>
          <Grid xs={12} md={4}>
            <Item
              sx={{
                backgroundColor: "inherit",
                textAlign: { md: "left", xs: "center" },
                padding: "2rem",
              }}
              elevation={24}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "primary.main",
                  marginBottom: "1.5rem  ",
                }}
              >
                Contact
              </Typography>
              <Typography
                sx={{
                  color: "primary.main",
                  display: "flex",
                  alignItems: "center",
                  margin: "0.5rem 0",
                  fontWeight: "bold",
                  justifyContent: { md: "left", xs: "center" },
                }}
              >
                <CallIcon sx={{ marginRight: "0.5rem" }} /> (209)555-0104
              </Typography>
              <Typography
                sx={{
                  color: "primary.main",
                  display: "flex",
                  alignItems: "center",
                  margin: "1rem 0",
                  fontWeight: "bold",
                  justifyContent: { md: "left", xs: "center" },
                }}
              >
                <EmailIcon sx={{ marginRight: "0.5rem", fontWeight: "bold" }} />{" "}
                ShopCart@gmail.com
              </Typography>
              <Typography
                sx={{
                  color: "primary.main",
                  display: "flex",
                  alignItems: "center",
                  margin: "1rem 0",
                  fontWeight: "bold",
                  justifyContent: { md: "left", xs: "center" },
                }}
              >
                <EmailIcon sx={{ marginRight: "0.5rem", fontWeight: "bold" }} />{" "}
                <FacebookIcon sx={{ margin: "0 0.5rem" }} />
                <XIcon sx={{ margin: "0 0.5rem" }} />
                <LinkedInIcon sx={{ margin: "0 0.5rem" }} />
                <InstagramIcon sx={{ margin: "0 0.5rem" }} />
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
