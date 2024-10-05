import {Box,Typography,useTheme,Divider,Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";
import { AddToCart } from "../helpers/AddToCart";
import {useSelector,useDispatch} from "react-redux";
import { addProductToCart } from "../state";

const SuggestedCard = ({
    _id,
    name,
    price,
    img,
}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.user);
    const queryClient = useQueryClient();
    const handleClick = ()=>{
        navigate(`/home/${_id}`)
        queryClient.invalidateQueries("newArrivals");
    }
    const handleButtonClick = ()=>{
        AddToCart(user._id,_id);
        dispatch(addProductToCart({cart:{
            _id,name,price,img
        }}))
    }
  return (
    <Box  display={"flex"} backgroundColor={theme.palette.background.alt} gap={"2.15rem"} p={"1rem"} border={"1px solid whitesmoke"} borderRadius={"10px"}>
        <Box onClick={handleClick} height={"120px"} width={"140px"}>
            <img src={img} height={"100%"} width={"100%"} style={{objectFit:"cover",objectPosition:"center"}} alt="" />
        </Box> {/* for images*/}
        <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
            <Box display={"flex"} flexDirection={"column"} gap={"0.5rem"}>
                <Typography variant="h3">{name}</Typography>
                <Typography variant="h6" color={theme.palette.neutral.mediumMain}>&#x20b9; {price}</Typography><Divider/>  
            </Box>
            <Button onClick={handleButtonClick}>ADD to Cart</Button>
        </Box> 
    </Box>
  )
}

export default SuggestedCard
