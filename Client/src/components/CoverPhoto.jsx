import React from 'react'
import {Box,IconButton,Typography,Button,useTheme} from "@mui/material";
import HomeBg from "../assets/HomeBG.jpg"
const CoverPhoto = () => {
  const theme = useTheme();
  return (
    <Box width={"100%"} height={"40vh"} display={"flex"}  justifyContent={"center"}  alignItems={"center"} position={"relative"} sx={{
      "&.MuiBox-root::after":{
        content:'""',
        position:"absolute",
        inset:0,
        background:"black",
        zIndex:"-1",
        opacity:0.4
      },
      isolation:'isolate',
      backgroundImage:"url(https://images.pexels.com/photos/3965543/pexels-photo-3965543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
      backgroundPosition:"center",
      backgroundSize:"cover",
      zIndex:1
    }}>
        <Box width="60%">
          <Typography  textAlign={"center"} variant="h1">Welcome to E-Shoppers</Typography>
          <Typography variant="h4" textAlign={"center"}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae corporis inventore alias ex rerum animi perferendis voluptatibus odio provident. Perspiciatis, esse.
          </Typography>
        </Box>
    </Box>
  );
}

export default CoverPhoto
