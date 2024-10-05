import {Box,Typography} from "@mui/material"
import Navbar from '../scenes/navbar'
import Footer from "../scenes/footer"

const Success = () => {
  return (
    <Box>
    <Navbar/>
    <Box m={"2rem"} p={"2rem"}>
        <Typography variant="h1" color={"green"}>Successs ORder Placed SUCCESSS</Typography>
    </Box>
    <Footer/>
</Box>
  )
}

export default Success
