import { Facebook, FacebookOutlined, Instagram, X, YouTube } from "@mui/icons-material";
import {Box,useTheme,Typography,Button,TextField} from "@mui/material";
import Flexbetween from "../../components/Flexbetween";
const Footer = () => {
  const theme = useTheme();
  return (
    <Box display={"grid"} gridTemplateColumns={"repeat(5,1fr)"} gap={"2rem"} backgroundColor={theme.palette.background.alt} padding={"1.95rem"}>
        <Box display={"flex"} mr={"4rem"} flexDirection={"column"} gap={"0.53rem"}>
          <Typography variant="h2" fontWeight={"bold"}>Store Name</Typography>
          <Typography fontWeight={"100"} variant="h6">Experience the great Outdoor in style with Store name. Shop now and gear up.</Typography>
        </Box>
        <Box ml={"1.15rem"} display={"flex"} flexDirection={"column"} gap={"0.35rem"}>
            <Typography variant="h3" mb={"1rem"}>Categories</Typography>
              <Typography variant="h6" color={theme.palette.neutral.mediumMain}>Jacket</Typography>
              <Typography variant="h6" color={theme.palette.neutral.mediumMain}>Jacket</Typography>
              <Typography variant="h6" color={theme.palette.neutral.mediumMain}>Jacket</Typography>
        </Box>
        <Box ml={"1.15rem"} display={"flex"} flexDirection={"column"} gap={"0.35rem"}>
            <Typography variant="h3" mb={"1rem"}>Customer Care</Typography>
              <Typography variant="h6" color={theme.palette.neutral.mediumMain}>FAQ</Typography>
              <Typography variant="h6" color={theme.palette.neutral.mediumMain}>Shipping</Typography>
              <Typography variant="h6" color={theme.palette.neutral.mediumMain}>Order Status</Typography>
              <Typography variant="h6" color={theme.palette.neutral.mediumMain}>Return & Exchange</Typography>
        </Box>
        <Box ml={"1.15rem"} display={"flex"} flexDirection={"column"} gap={"0.35rem"}>
            <Typography variant="h3" mb={"1rem"}>Company</Typography>
              <Typography variant="h6" color={theme.palette.neutral.mediumMain}>Privacy</Typography>
              <Typography variant="h6" color={theme.palette.neutral.mediumMain}>Guides</Typography>
              <Typography variant="h6" color={theme.palette.neutral.mediumMain}>Terms and conditions</Typography>
        </Box>
        <Box display={"flex"} justifyContent={"center"} gap={"1.03rem"}>
            <Facebook/>
            <Instagram/>
            <YouTube/>
            <X/>
        </Box>
        <Flexbetween gridColumn={"1/6"}>
          <Typography variant="h4">@2024 All right reserverd </Typography>
          <Typography variant="h6" fontWeight={"700"} color={theme.palette.neutral.mediumMain}>Call Us on: +91 90909090</Typography>
        </Flexbetween>
    </Box>
  )
}

export default Footer
