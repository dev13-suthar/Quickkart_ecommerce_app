import {Box,Typography} from "@mui/material"
import Navbar from '../scenes/navbar'
import Footer from "../scenes/footer"

const Cancel = () => {
  return (
    <Box>
        <Navbar/>
        <Box m={"2rem"} p={"2rem"}>
            <Typography variant="h1" color={"red"}>Cancel Go Back to HOMEEE</Typography>
        </Box>
        <Footer/>
    </Box>
  )
}

export default Cancel
