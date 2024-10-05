import {Box,IconButton,Typography,useTheme,Divider,Button} from "@mui/material"
import {Menu,DarkModeOutlined,LightModeOutlined,Person2Outlined, Search, AccountCircle, MoneyOffCsredRounded, FavoriteBorderSharp} from "@mui/icons-material"
import Flexbetween from "../../components/Flexbetween"
import {useDispatch,useSelector} from "react-redux"
import { removeUser, setMode } from "../../state"
import { useState } from "react"
import {useQuery} from "@tanstack/react-query"
import {useNavigate} from "react-router-dom"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [isUserInfoBar, setisUserInfoBar] = useState(false);
  const user = useSelector((state)=>state.user);
  const cartLen = user.cart.length
  const getDetails = async()=>{
      const res = await fetch(`http://localhost:6008/user/${user._id}`,{
        method:"GET",
      })
      const data = await res.json();
      return data;
  }
  
  const query = useQuery({
    queryKey:["LoggedInUserInfo"],
    queryFn:getDetails,
  });
  const {data,isLoading} = query;
  
  return (
    <Flexbetween padding="1.1rem 2.1rem" backgroundColor={theme.palette.background.alt} sx={{
      boxShadow:"0 0 6px 3px rgba(0,0,0,0.3)"
    }}>
        <Flexbetween gap="0.75rem">
          <IconButton>  
              <Menu/>
          </IconButton>
          <Typography onClick={()=>navigate('/home')} sx={{
            cursor:"pointer"
          }} variant="h3" mr={"1.2rem"}>E-Shoppers</Typography>
          <Typography variant="h5" sx={{
            "&:hover":{
                cursor:"pointer"
            }
          }}>Collection</Typography>
          <Typography variant="h5" sx={{
            "&:hover":{
                cursor:"pointer"
            }
          }}>Find Store</Typography>
          <Typography variant="h5" sx={{
            "&:hover":{
                cursor:"pointer"
            }
          }}>Find Store</Typography>
        </Flexbetween>
        <Flexbetween gap="1.7rem">
          <IconButton onClick={()=>dispatch(setMode({mode:"dark"}))}>
          {theme.palette.mode==="light"?<DarkModeOutlined/>:<LightModeOutlined/>}
          </IconButton>
          <IconButton onClick={()=>navigate('/home/cart')} sx={{position:"relative"}}><ShoppingCartIcon sx={{fontSize:"25px"}}/>
            <Box position={"absolute"} top={"-5px"} display={"flex"} justifyContent={"center"} alignItems={"center"} color={"red"} p={"0px 4px"} borderRadius={"50%"}right={"1px"} backgroundColor={theme.palette.neutral.dark}>
              <span style={{fontSize:"15px"}}>{cartLen}</span>
            </Box>
          </IconButton>
          <IconButton onClick={()=>setisUserInfoBar(!isUserInfoBar)} sx={{
            position:"relative"
          }}><Person2Outlined/></IconButton>
        {isUserInfoBar && 
        <Box position={"absolute"} sx={{
          isolation:"isolate",
          zIndex:"11"
        }} top={"4rem"} right={"2rem"} p={"1rem"} borderRadius={"11px"} alignItems={"center"} gap={"0.5rem"} backgroundColor={theme.palette.neutral.mediumMain}>
            <Flexbetween>
              <IconButton><AccountCircle/></IconButton>
              <Typography variant="h6">{user.firstName} {user.lastName}</Typography>
            </Flexbetween>
            <Divider/>
            <Flexbetween>
              <IconButton><MoneyOffCsredRounded/></IconButton>
              <Typography variant="h6">Orders</Typography>
            </Flexbetween><Divider/>
            <Flexbetween>
              <IconButton><FavoriteBorderSharp/></IconButton>
              <Typography onClick={()=>navigate("/home/wishlist")} sx={{cursor:"pointer"}} variant="h6">Wishlist</Typography>
            </Flexbetween><Divider/>
            <Button onClick={()=>{
              dispatch(removeUser());
              navigate('/')
            }} sx={{width:"120px" ,m:"auto"}}>
            Logout
            </Button>
        </Box>
        }
        </Flexbetween>
    </Flexbetween>
  )
}

export default Navbar;
