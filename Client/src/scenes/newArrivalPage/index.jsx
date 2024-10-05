import {Box,useTheme,Typography,Button} from "@mui/material"
import {useQuery} from "@tanstack/react-query";
import Cardd from "../../components/Card";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';

// or

const NewArrival = () => {
    const theme = useTheme();
    const [SeeMore, setSeeMore] = useState(false);
    const navigate = useNavigate();
    const getNewArrivals = async()=>{
      await new Promise(resolve => setTimeout(resolve, 2000));
      const res = await fetch('http://localhost:6008/products/newArrival',{
        method:"GET",
      });
      const data = await res.json();

      return data;
    }
    const query = useQuery({
      queryKey:["newArrivals"],
      queryFn:getNewArrivals
    });

   const {data,isLoading} = query;
    if(SeeMore){
      navigate('/home/newArrivals');
      setSeeMore(false);
    }
  return (
    <>
    <Box p="1rem 0.65rem" position="relative" mb="2rem">
        <header style={{padding:"0.43rem"}}>
            {
              isLoading ? (
                <Skeleton animation={"pulse"} variant='rectangular' width="100%">
                <Typography variant="h1">.</Typography>
              </Skeleton>
              ):(
                <Typography variant="h2" textAlign={"center"}>New Arrivals</Typography>
              )}
            <Typography variant="h6" textAlign={"center"} color={theme.palette.neutral.mediumMain}>Our new arrivals are built to withstand your activity while keeping you looking your best</Typography>
        </header>
        <Box display={"flex"} justifyContent={"center"} gap={"2rem"} padding={"0.65rem"}>
          {isLoading?(
            <Skeleton animation={"wave"} height={"260px"} width={"100%"} sx={
              { bgcolor: 'grey.900' }
            } variant="rectangular" />
          ):(
            data?.map((product)=>(
              <Cardd key={product._id} isLoad={isLoading} img={product.images[0]} name={product.name} price={product.price}
              _id={product._id}/>
            ))
          )}
        </Box>
        <Button onClick={()=>setSeeMore(true)} sx={{fontWeight:"bold",color:theme.palette.neutral.medium,background:theme.palette.primary.main,width:"100px",position:"absolute",left:"47%" ,mb:"1rem"}}>See More</Button>
    </Box>
  </>
  )
}

export default NewArrival 

