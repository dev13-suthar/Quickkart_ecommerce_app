import {Box,useTheme,Typography,IconButton} from "@mui/material";
import Flexbetween from "./Flexbetween";
import { Add, Close, Remove } from "@mui/icons-material";
import {useDispatch,useSelector} from "react-redux";
import { descreaseItemQuantity, increaseItemQuantity, removeProductFromCart } from "../state";
import {useNavigate} from "react-router-dom";
import { useState } from "react";


const CartCard = ({
    name,price,image,company,_id,userID,
}) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const itemQuantity = useSelector((state)=>state.user.cart[0].quantity);
    const [quantity, setquantity] = useState(1)
    const handleClick = async()=>{
        const res = await fetch('http://localhost:6008/user/removeFromCart',{
            method:"DELETE",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                userId:userID,
                productId:_id
            })
        });
        const data = await res.json();
        dispatch(removeProductFromCart({id:_id}))
    }
  return (
    <>
    <Flexbetween p={"2rem"} borderBottom={"1px solid"}>
        <Flexbetween gap={"1.7rem"}>
            <Box width={"220px"} height={"220px"} p={"5px"} border={"1px solid white"} sx={{cursor:"pointer"}} onClick={()=>navigate(`/home/${_id}`)}>
                <img height={"100%"} width={"100%"} src={image} style={{objectFit:"cover"}} alt="" srcSet="" />
            </Box>
            <Box  height={"auto"} width={"auto"} display={"flex"} flexDirection={"column"} gap={"20px"}>
                <Typography variant="h1">{name}</Typography>
                <Typography variant="h5" color={theme.palette.neutral.mediumMain}>Brand:{company}</Typography>
                <Typography sx={{cursor:"pointer",textDecoration:"underline"}} variant="h6" color={theme.palette.neutral.mediumMain}>Move to WishList</Typography>
            </Box>
        </Flexbetween>
        <Box height={"100%"} display={"flex"} flexDirection={"column"} justifyContent={"space-around"} alignItems={"center"} gap={"0.44rem"}>
            <IconButton onClick={handleClick} aria-label="clicl">
              <Close/>
            </IconButton>
            <Box display={"flex"} p={"0.3rem"} border={"1px solid"} alignItems={"center"} gap={"1.34rem"}>
                <IconButton onClick={()=>{
                setquantity(prev=>prev===1?1:prev-1)
                dispatch(quantity>1?descreaseItemQuantity({id:_id}):removeProductFromCart({id:_id}))
                }}><Remove/></IconButton>
                <Typography fontWeight={"600"}>{quantity}</Typography>
                <IconButton onClick={()=>{
                    setquantity(prev=>prev+1)
                    dispatch(increaseItemQuantity({id:_id}))
                    }}><Add/></IconButton>
            </Box>
            <Typography variant="h4" fontWeight={"bold"}>&#x20B9; {price}</Typography>
        </Box>
    </Flexbetween>
    </>
  )
}

export default CartCard
