import {Box, Typography,IconButton,Divider,useTheme} from "@mui/material"
import Cardd from "../../components/Card";
import { useEffect, useState } from "react";
import Flexbetween from "../../components/Flexbetween";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Sort } from "@mui/icons-material";

const AllNewArrivals = () => {
  const [range, setrange] = useState(500);
  const [data, setdata] = useState([]);
  const theme = useTheme();
  const [isLoading, setisLoading] = useState(false);
  const [sortBy, setsortBy] = useState("asc");
    const getAllArrivals = async()=>{
       try {
        setisLoading(true)
        const res = await fetch(`http://localhost:6008/products/newArrival/more?sort=${sortBy}&maxPrice=${range}`,{
          method:"GET"
      });
      const data = await res.json();
      setdata(data);
      setisLoading(false)
       } catch (error) {
        console.log(error.message)
       }
    };

   
    useEffect(()=>{
      getAllArrivals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[sortBy,range]) 
  return (
    <>
    <Box display={"flex"} position={"relative"} gap={"9px"} p={"1.1rem"}>
       {
        isLoading ? "Loading.....":(
          <Box width={"max-content"} display={"grid"}  gridTemplateColumns={"repeat(4,1fr)"} gap={"0.94rem"}>
          {data?.map((prod)=>(
    <Cardd _id={prod._id} key={prod._id} img={prod.images[0]} name={prod.name} price={prod.price}/>
  ))}
          </Box>
        )
       }
        <Box width={"max-content"} height={"100%"} position={"absolute"} right={"2px"}  p={"0.33rem 1rem"}>
          <Typography variant="h3" textAlign={"center"}>Filters</Typography>
          <Box display={"flex"} mt={"1.4rem"} flexDirection={"column"} gap={"0.44rem"}>
              <Flexbetween>
                <IconButton onClick={()=>setsortBy('desc')}><ArrowDownwardIcon/></IconButton>
                <Sort/>
                <IconButton onClick={()=>setsortBy('asc')}><ArrowUpwardIcon/></IconButton>
              </Flexbetween>
          </Box>
          <Divider/>
          <Box p={"0.3rem"} display={"flex"} flexDirection={"column"} gap={"1rem"}>
              <Box display={"flex"} flexDirection={"column"} gap={"5px"}>
                <Typography variant="h3" color={theme.palette.neutral.mediumMain}>Sort by Price</Typography>
                <Box display={"flex"} alignItems={"center"} gap={"0.3rem"}>
                <input width={"65%"} type="range" onChange={(e)=>{
                  setrange(e.target.value)
                  e.preventDefault();
                }} name="range" min={"500"} max={"10000"} id="range" />
                <label htmlFor="range">500 to {range}</label>
                </Box>
              </Box>
          </Box>
        </Box>
    </Box>
    </>
  )
}

export default AllNewArrivals


