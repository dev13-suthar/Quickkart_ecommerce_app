import {Box,useTheme,Typography,Card,CardMedia,CardContent,IconButton} from "@mui/material";
import {FavoriteOutlined,} from "@mui/icons-material"
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import Flexbetween from "./Flexbetween";
import {useNavigate} from "react-router-dom";
import { useQueryClient } from '@tanstack/react-query';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Skeleton from '@mui/material/Skeleton';


const Cardd = ({
    img,
    name,
    price,
    _id,  
    isLoad,
}) => {
    const theme = useTheme();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate(`/home/${_id}`);
        queryClient.invalidateQueries('GetOneProductWithId');
    }
  return (
    <>
    <Card variant="outlined" 
    onClick={handleClick}
    sx={{
        maxWidth:435,
        width:"300px ",
        height:"400px",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between",
        cursor:"pointer"
    }}
    >
        {isLoad?(
            <Skeleton animation={"wave"} height={"200px"} width={"300px"}  sx={{ bgcolor: 'grey.900' }} variant="rectangular"/>
        ):(
            <CardMedia
        sx={{height:"90%", position:"relative",objectFit:"cover"}}
        image={img}
        >
           <IconButton color="primary" sx={{
                position:"absolute",
                top:'5px',
                right:"2px",
                zIndex:"15"
            }}>
           <FavoriteBorderIcon />
           </IconButton>
        </CardMedia>
        )}
        <CardContent>
            <Flexbetween>
                <Box display="flex"  justifyContent={"center"} flexDirection="column">
                    <Typography variant="h6">{name}</Typography>
                    <Typography variant="h6">&#8377; {price}</Typography>
                </Box>
                <AddShoppingCartSharpIcon color={theme.palette.neutral.mediumMain}/>
            </Flexbetween>
        </CardContent>
    </Card>
    </>
  )
}

export default Cardd


{/* <Skeleton animation={"wave"} height={"300px"} width={"400px"}  sx={{ bgcolor: 'grey.900' }} variant="rectangular"/> */}

