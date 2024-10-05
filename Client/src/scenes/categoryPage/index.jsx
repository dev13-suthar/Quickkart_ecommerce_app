import {useParams} from "react-router-dom";
import {useTheme,Typography,Box,Divider} from "@mui/material";
import {useSelector} from "react-redux"
import {useQuery,useQueryClient} from "@tanstack/react-query";
import SetHeader from "../../components/SetHeader";
import Cardd from "../../components/Card";
import Skeleton from '@mui/material/Skeleton';

const Category = () => {
    const {categoryName} = useParams();
    const token = useSelector((state)=>state.token)
    const theme = useTheme();
    const getCategoryProducts = async()=>{
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const res = await fetch(`http://localhost:6008/products/category/${categoryName}`,{
                method:"GET",
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(error.message)
        }
    }
    const query = useQuery({
        queryKey:["Categories"],
        queryFn:getCategoryProducts
    })
    const {data,isLoading} = query;

  return (
    <Box p="1.55rem">
        <SetHeader title={`${categoryName}`} subtitle={`Collection of ${categoryName}`}/>
        <Divider/>
        {isLoading ?(
            <Box display={"flex"} gap={"1rem"}>
                {Array.from({length:3}).map((_,index)=>(
                    <Box key={index} display={"flex"} flexDirection={"column"} gap={"10px"}>
                          <Skeleton key={index} variant="rectangular" height={"350px"} width={"300px"} animation={"wave"} sx={{ bgcolor: 'grey.900' }}/>
                          <Typography variant="h5">
                    <Skeleton />
                  </Typography>
                    </Box>
                ))}
            </Box>
        ):(
            <Box display="flex" gap="1.1rem" padding="1rem">
            {data.map((prod)=>(
                <Cardd key={prod._id+1} img={prod.images[0]} price={prod.price} _id={prod._id} name={prod.name}/>
            ))}
        </Box>
        )}
    </Box>
  )
}

export default Category
