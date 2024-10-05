import { useParams } from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {useSelector,useDispatch} from "react-redux"
import { useEffect, useState } from "react";
import {Box,Typography,useTheme,Button,Divider} from "@mui/material";
import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addProductToCart, addtowishList } from "../../state";
import { AddToCart } from "../../helpers/AddToCart";

const ProductOverview = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const theme = useTheme();
    const token = useSelector((state)=>state.token);
    const user = useSelector((state)=>state.user);
    const list = useSelector((state)=>state.user.wishlist)
    const getProduct = async()=>{
        const res = await fetch(`http://localhost:6008/products/${id}`,{
          headers:{
            Authorization:`Bearer ${token}`
          },
          method:"GET",
        });
        const data = await res.json();
        return data;
    }
    const query = useQuery({
      queryKey:["GetOneProductWithId"],
      queryFn:getProduct
    });
    const {data,isLoading} = query;
    const [selectedPhoto, setselectedPhoto] = useState(data && data.images && data.images[0] ? data.images[0] : '')
    const handleClick = (url)=>{
        setselectedPhoto(url);
    }
    const prodToAdded = data;
    useEffect(() => {
      if (data && data.images && data.images.length > 0) {
        setselectedPhoto(data.images[0]);
      }
    }, [data]);
    const formatedDEsc = data?.description.split(".");

    const handleAddToWishList = async()=>{
      const res = await fetch(`http://localhost:6008/user/addtowishlist`,{
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({userId:user._id,id})
      });
      const data = await res.json();
      dispatch(addtowishList({
        list:prodToAdded
      }))
      console.log(data);

    };

    const handleAddToCart = ()=>{
      AddToCart(user._id,id);
      const newItem = {
        name:data.name,
        images:data.images[0],
        _id:id,
        unitPrice:data.price,
        quantity:1,
        company:data.company,
        totalPrice: data.price*1,
      }
      dispatch(addProductToCart({cart:newItem}))
    }
  return (
    <>
    {isLoading ? (
      "Loadingggg.."
    ):(
      <Box p="1rem" display={"flex"} gap="0.75rem">
      <Box width={"fit-content"} maxWidth={"60%"} p="1rem 0.33rem" display={"flex"} gap="2rem" >
          <div className="multipleIMGS" style={{display:"flex",flexDirection:"column", gap:"0.76rem",borderRight:`2px solid ${theme.palette.mode==="dark"?'white':'black'}`,paddingRight:"14px"}}>
              {data?.images.map((photo,index)=>(
                  <img key={index} src={photo} width={"190px"} height={"260px"} alt={index+1} onClick={()=>handleClick(photo)} style={{cursor:"pointer",objectFit:"contain"}} />
              ))}
          </div>
          <div className="mainImag">
            <img src={selectedPhoto} alt="" height={"100%"} width={"100%"} style={{objectFit:"contain",background:`${theme.palette.background.alt}`}}  />
          </div>
      </Box>
      <Box height={"100vh"} flex={"1 1 auto"} p="4.5rem 0.33rem" display={"flex"}   flexDirection={"column"}>
         <Typography ml="1rem" mb={"0.4rem"} fontWeight="100" variant="h1" color={theme.palette.neutral.mediumMain}>	&#8377; {data.price}</Typography>
         <Typography variant="h1" ml={"1rem"} mb={"1.3rem"} fontFamily={"monospace"} fontWeight={"bold"}>{data.name}</Typography>
         <Box ml="1rem" display={"flex"} flexDirection={"column"} gap={"0,3rem"}>
         <Typography variant="h5" color={theme.palette.neutral.mediumMain}>visit the Store</Typography>
          <Box display={"flex"} alignItems={"center"} gap={"1.1rem"}>
          <Rating  value={data.rating} precision={0.5}  size="large" readOnly sx={{color:theme.palette.neutral.dark}}/>
                <Box padding="0.15rem 0.85rem" borderRadius={"11px"} backgroundColor={theme.palette.mode==="dark"? theme.palette.neutral.light:theme.palette.neutral.mediumMain}>
                <Typography fontWeight={"bold"} variant="h4">{data.rating} / 5</Typography>
                </Box>
          </Box>
         </Box>
         <Box ml="0.5rem" display={"flex"} mt={"2rem"} mb={"2rem"} alignItems={"center"} gap="11px">
          <Button onClick={handleAddToCart} sx={{p:"1.3rem 0",background:theme.palette.neutral.mediumMain,color:theme.palette.background.alt,"&:hover":{
            backgroundColor:"white",
            fontWeight:"bold"
          }}}  fullWidth>
            Add To Cart
          </Button>
          <Button
          onClick={handleAddToWishList}
           sx={{p:"1.3rem 0",background:theme.palette.neutral.mediumMain,color:theme.palette.background.alt,"&:hover":{
            backgroundColor:"white",
            fontWeight:"bold"
          }}} fullWidth>
            <FavoriteBorderIcon/>  ADD TO WISHLIST
          </Button>
      </Box>
      <Divider/>
      <Box mt={"2rem"}>
          <ul>
            {formatedDEsc.map((li,index)=>(
              <li key={index}>
              <Typography  variant="h5">{li}</Typography>
              </li>
            ))}
          </ul>
      </Box>
      </Box>
  </Box>  
    )}
    </>
  )
}
export default ProductOverview
