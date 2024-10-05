import {Box,useTheme} from "@mui/material";
import SetHeader from "../../components/SetHeader"
import {useSelector} from "react-redux";
import HorizontalCard from "../../components/HorizontalCard";
import SuggestedCard from "../../components/SuggestedCard";
import {useQuery} from "@tanstack/react-query";


const Wishlist = () => {
    const theme = useTheme();
    const getNewArrivals = async()=>{
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
    const list = useSelector((state)=>state.wishlist);
    const user = useSelector((state)=>state.user);
    console.log(list);
    
    if(isLoading) return "loadinngngggg. wiiattt..."
  return (
    <Box p={"1.55rem 2.3rem"}>
        <SetHeader title="Your WishList"/>
        <Box mt={"1.4rem"} display={"flex"} gap={"1rem"}>
            <Box display={"flex"} width={"100%"} flexDirection={"column"} gap={"1.1rem"} p={"0.5rem"} flexBasis={"69%"}>
                {/* Card BOX */}
                {list.map((item)=>(
                    <HorizontalCard key={item._id} name={item.name} userId={user._id} productId={item._id} company={item.company} price={item.price} img={item.images[0]}/>
                ))}
            </Box>
            <Box flexBasis={"28%"}  p={"0.44rem"}>
                <SetHeader subtitle={"Suggested For You"}/>
                <Box display={"flex"} flexDirection={"column"} gap={"0.90rem"}>
                    {data?.map((prod)=>(
                        <SuggestedCard key={prod._id} name={prod.name} price={prod.price} _id={prod._id} img={prod.images[0]}/>
                    ))}
                </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default Wishlist
