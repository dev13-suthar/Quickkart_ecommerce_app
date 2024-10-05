import {Box,Typography,Divider,useTheme} from "@mui/material";
import {useSelector} from "react-redux"
import { UserWithOrders } from "../../helpers/AddToCart";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import HorizontalCard from "../../components/HorizontalCard"
import SmallCard from "../../components/SmallCard";


const YourOrder = () => {
    const user = useSelector((state)=>state.user);
    const theme = useTheme();
    const userWithOrders = UserWithOrders(user._id);
    const steps = [
        "Order Confirmed",
        "Shipping",
        "Order Delivered"
    ]
  return (
    <Box p={"0.5rem"} minHeight={"100vh"}>
        <header style={{padding:"1rem",marginBottom:"10px",display:"flex",gap:"40px",alignItems:"center"}} >
                <Typography variant="h3" fontWeight={"bold"}>Order Details #</Typography>
                <span style={{
                  border:'1px solid transperant',
                  color:"blue",
                  padding:"4px 7px",
                  backgroundColor:"rgb(203, 203, 203)"
                  
                }}>
                    <h4 style={{margin:"0",padding:"0",fontWeight:"100"}}>Shipping</h4>
                </span>
        </header>
        <Stepper activeStep={1} alternativeLabel  sx={{
            fontSize:"large"
        }}>
            {
                steps.map((label)=>(
                    <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))
            }
        </Stepper>
        <Box p={"0.94rem"} mt={"2.4rem"}>
            <Typography variant="h5" mb={"1rem"}>Items Ordered</Typography>
              {/* Product Display Box  and Container for Centering*/}

              <Box display={"flex"} justifyContent={"center"} p={"0.6rem"}>
                    <Box backgroundColor={theme.palette.background.alt} width={"70%"} p={"1.1rem"} display={"flex"} flexDirection={"column"} gap={"7px"}>
                        <SmallCard/>
                        <Divider/>
                        <SmallCard/>
                    </Box>
              </Box>
        </Box>
    </Box>
  )
}

export default YourOrder
