import {Box,Typography} from "@mui/material"

const SmallCard = () => {
  return (
    <>
    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
      <Box p={"1px"} display={"flex"} alignItems={"center"}  gap={"0.6rem"}>
        <Box height={"100px"} width={"100px"}>
          <img
            style={{ height: "100%", width: "100%" }}
            src="https://images.pexels.com/photos/19288164/pexels-photo-19288164/free-photo-of-direction.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            srcSet=""
          />
        </Box>
        <Box maxWidth={"70px"}>dvdsvvsckksvj mvkfk</Box>
      </Box>
      <Typography variant="h6">1x</Typography>
      <Typography variant="h6">400$</Typography>
      </Box>
    </>
  );
}

export default SmallCard
