import React from 'react'
import {Box,useTheme,Typography,Button} from "@mui/material"

const StoreVisit = () => {
  const theme = useTheme();
  return (
    <Box p="1.1rem 2.2rem"  mt="1.55rem" mb="1rem" display={"flex"} gap={"0.33rem"}>
      <Box width={"60%"} height={"500px"}>
        <img src='https://images.pexels.com/photos/4940756/pexels-photo-4940756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' height={"100%"} style={{borderRadius:"11px"}} width={"100%"}/>
      </Box >
      <Box width={"40%"} p={"0.55rem"} display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
          <Box  ml="1.1rem">
          <Typography width={"60%"} variant="h1" mb="13px" fontWeight={"100"}>Find Your Perfect Look at Our Store Now.</Typography>
          <Typography zIndex={"5"} textAlign={"justify"} variant="h5" color={theme.palette.neutral.mediumMain} fontWeight={"100"}>
            Welcome to neweset Outlet in Surat,Gujarat! Step into our stylish and trendy store and discover the latest in fashion and apparel.come and experience the unique and vibrant atmosphere.
          </Typography>
          </Box>
          <Box ml="1.1rem">
          <Typography width={"60%"} variant="h3" mb="13px" fontWeight={"100"}>Come and Enjoy Sale</Typography>
          <Typography width={"60%"} variant="h1"fontSize={"4.5rem"} mb="13px" fontWeight={"bold"}>50%</Typography>
          <Button sx={{
            backgroundColor:theme.palette.background.alt,
            p:"0.33rem 1.4rem"
          }}>
            See on Maps
          </Button>
          </Box>
      </Box>
    </Box>
  )
}

export default StoreVisit
