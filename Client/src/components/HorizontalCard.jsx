import {Box,useTheme,Typography,Divider,Button} from "@mui/material";
import Flexbetween from "./Flexbetween"
import { Cancel } from "@mui/icons-material";
import {useDispatch} from "react-redux";
import { removedFromList } from "../state";


const HorizontalCard = ({
    name,
    company,
    price,
    img,
    productId,
    userId
}) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const handleRemoveClick = async()=>{  {/*  `http://localhost:6008/user/addtowishlist` */}
        const res = await fetch(`http://localhost:6008/user/removeFromList/${userId}/${productId}`,{
            method:"DELETE",
            headers:{
                'Content-Type': 'application/json',
              },
        });
        const data = await res.json();
        dispatch(removedFromList({id:productId}))
        console.log(data);

    }

  return (
    <>
    <Flexbetween border={`1px solid ${theme.palette.neutral.mediumMain}`}>
                    {/* first for prod photo and Information */}
                        <Flexbetween sx={{backgroundColor:theme.palette.background.default}}  p={"0.45rem"} gap={"1.8rem"}>
                            <Box p={"0.3rem"} height={"280px"} width={"200px"}> 
                                <img src={img} style={{
                                    objectFit:"contain"
                                }} height={"100%"} width={"100%"}/>
                            </Box> {/* for img  */}
                            <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
                                <Typography variant="h2" fontWeight={"500"}>{name}</Typography>
                                <Typography variant="h4" fontWeight={"400"} color={theme.palette.neutral.mediumMain}>
                                    <span><b>Company: </b></span>
                                    {company}
                                </Typography>
                                <Typography variant="h6" color={theme.palette.neutral.mediumMain} fontWeight={"300"}>Delivered within 3-5 working days</Typography><Divider/>
                                <Box display={"flex"} alignItems={"center"} gap={"2rem"}>
                                    <Typography variant="h5" sx={{
                                        textDecoration:"underline",
                                        cursor:"pointer"
                                    }} color={"lightblue"}>Add to Cart</Typography>
                                    <Button onClick={handleRemoveClick}  sx={{p:"0.55rem",background:theme.palette.background.alt}}><Cancel/> Remove</Button>
                                </Box>
                            </Box> {/* for price anf buttons  */}
                        </Flexbetween>
                        <Box height={"100%"} pt={"55px"} pr={"1rem"}>
                            <Typography variant="h2">&#8377; {price}</Typography>
                        </Box>
                    {/* Second for price */}
                </Flexbetween>
    </>
  )
}

export default HorizontalCard
