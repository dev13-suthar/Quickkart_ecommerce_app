import React from 'react'
import {Box,IconButton,useTheme,Typography,Button} from "@mui/material";
import bg from "../../assets/bg.webp";
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";

const Categories = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const onCLick = (navgateTo)=>{
      navigate(`/home/categories/${navgateTo}`);
      queryClient.invalidateQueries("Categories");
    };

  return (
    <Box mt="1.5rem" p={"1.75rem"}>
        <header style={{marginBottom:"1rem"}}>
            <Typography textAlign={"center"}  variant="h2">Featured Collection</Typography>
            <Typography  textAlign={"center"} variant="h6" color={theme.palette.neutral.mediumMain}>
                Dare to Mix and Match our collections to level up for Fashion Game
            </Typography>
        </header>
        <Box display={"flex"} width="100%"  height={"85vh"} p={"1rem"} gap="15px">
          <Box display="flex" flexDirection={"column"} width={"50%"} gap="15px">
              <Box flex={1} height={"100px"} display={"flex"} position="relative" border={"0.7px solid whitesmoke"} sx={{borderRadius:"11px"}}  padding="2px">
                <img src="https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width={"100%"} height="100%" alt="" style={{opacity:"0.8",zIndex:"1",filter:"grayscale(70%)",objectFit:"cover"}} />
                <Button onClick={()=>onCLick("shoes")} variant="contained" sx={{position:"absolute",left:'45%',top:'50%',zIndex:"5"}}>Shoes</Button>
              </Box>
              <Box flex={2} height={"100px"} position="relative" border={"0.7px solid whitesmoke"} sx={{borderRadius:"11px"}} padding="2px">
              <img src="https://images.pexels.com/photos/1986996/pexels-photo-1986996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width={"100%"} height="100%" alt="" style={{opacity:"0.8",zIndex:"1",filter:"grayscale(70%)",objectFit:"cover"}} />
                <Button  onClick={()=>onCLick("Bag")}  variant="contained" sx={{position:"absolute",left:'45%',top:'50%',zIndex:"5"}}>Bags</Button>
              </Box>
          </Box>
          <Box display="flex" flexDirection={"column"} width="50%" gap="15px">
              <Box flex={2} height={"10px"} position="relative"  border={"0.7px solid whitesmoke"} sx={{borderRadius:"11px"}}  padding="2px">
              <img src="https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg" width={"100%"} height="100%" alt="" style={{opacity:"0.8",zIndex:"1",filter:"grayscale(70%)",objectFit:"cover"}} />
                <Button  onClick={()=>onCLick("tshirts")}  variant="contained" sx={{position:"absolute",left:'45%',top:'50%',zIndex:"5"}}>T-Shirts</Button>
              </Box>
              <Box flex={1} height={"100px"} position="relative" border={"0.7px solid whitesmoke"} sx={{borderRadius:"11px"}}  padding="2px">
               <img src="https://images.pexels.com/photos/1275311/pexels-photo-1275311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width={"100%"} height="100%" alt="" style={{opacity:"0.8",zIndex:"1",filter:"grayscale(70%)",objectFit:"cover"}} />
              <Button  onClick={()=>onCLick("jacket")}  variant="contained" sx={{position:"absolute",left:'45%',top:'50%',zIndex:"5"}}>Jacket</Button>
              </Box>
          </Box>
          <Box display="flex" flexDirection={"column"} width="50%" gap="15px">
              <Box flex={1} height={"100px"} position="relative"  border={"0.7px solid whitesmoke"} sx={{borderRadius:"11px"}}  padding="2px">
              <img src="https://images.pexels.com/photos/704857/pexels-photo-704857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width={"100%"} height="100%" alt="" style={{opacity:"0.8",zIndex:"1",filter:"grayscale(70%)",objectFit:"cover"}} />
              <Button  onClick={()=>onCLick("headwear")}  variant="contained" sx={{position:"absolute",left:'45%',top:'50%',zIndex:"5"}}>Headwear</Button>
              </Box>
              <Box flex={2} height={"100px"} position="relative" border={"0.7px solid whitesmoke"} sx={{borderRadius:"11px"}}  padding="2px">
              <img src="https://images.pexels.com/photos/17389819/pexels-photo-17389819/free-photo-of-close-up-a-young-man-touching-the-chain-on-his-neck.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width={"100%"} height="100%" alt="" style={{opacity:"0.8",zIndex:"1",filter:"grayscale(70%)",objectFit:"cover"}} />
              <Button  onClick={()=>onCLick("accesories")}  variant="contained" sx={{position:"absolute",left:'45%',top:'50%',zIndex:"5"}}>Accesories</Button> 
              </Box>
          </Box>
        </Box>
       </Box>
  )
}

export default Categories

// https://mongoosejs.com/docs/populate.html





