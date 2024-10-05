import {Box,useTheme,Typography,Button,TextField} from "@mui/material";
import SetHeader from "../../components/SetHeader"
import {useSelector} from "react-redux";
import CartCard from "../../components/CartCard";
import Flexbetween from "../../components/Flexbetween";
import { useEffect, useState } from "react";
import {loadStripe} from "@stripe/stripe-js";
import {useDispatch} from "react-redux";
import { clearCart } from "../../state";

const MyCart = () => {
    const theme = useTheme();
    const {cart,_id} = useSelector((state)=>state.user)
    const userId = _id;
    const dispatch = useDispatch();
    const [isCoupenApplied, setisCoupenApplied] = useState(false);
    const [discount, setdiscount] = useState(50);
    const [error, seterror] = useState("");
    const [discountCode, setdiscountCode] = useState("");
    let Total = cart.reduce((total,item)=>total+item.totalPrice,0);
    const [Subtotal, setSubtotal] = useState(0);
  
    
      useEffect(() => {
      setSubtotal(Total===0?0:Total+14);
      }, [Total]);

    const handleApplyClick = ()=>{
      if(discountCode==="FLAT50"){
        setSubtotal(Subtotal-discount);
        console.log(Subtotal)
        setisCoupenApplied(true);
        console.log("done")
      }else{
        seterror("Invalid Coupen Code")
      }
  }

    const handlePayment  = async()=>{
        const stripe = await loadStripe("pk_test_51Og4CySBp6uwL0aNxOtgCo6H0KVi5MUgzPHXBad5u65Lin0zVgCxq9eG7BqHPoOyYQbCUfjOsKARJKAVU0Ak14vf008AZV28aH");
        const body = {
          products:cart
        }
        const headers = {
          "Content-type":"application/json"
        }

        const res = await fetch(`http://localhost:6008/pay/create-payment-intent/${userId}`,{
          method:"POST",
          headers:headers,
          body:JSON.stringify(body)
        })
        const session = await res.json();
        const result = stripe.redirectToCheckout({
          sessionId:session.id
        });
        console.log(session);
        dispatch(clearCart())
        if(result.error){
          console.log(result.error);
        }
    }
  return (
    <>
    <Box p={"1.3rem"}>
      <SetHeader title={"SHOPPING CART"}/>
      <Box mt={"5px"} display={"flex"} gap={"15px"}>
        <Box width={"70%"} display={"flex"} flexDirection={"column"}>
            {cart.map((item)=>(
                <CartCard key={item._id} _id={item._id} name={item.name} price={item.unitPrice} image={item.images} userID={_id} company={item.company}/>
            ))}
        </Box> {/* left side */}
        <Box width={"30%"} p={"1.4rem"} backgroundColor={theme.palette.background.alt} borderRadius={"11px"} height={"max-content"}>
            <SetHeader title={"ORDER SUMMARY"}/>
            <Box mt={"1.4rem"} p={"0.33"}>
              <Flexbetween mb={"0.4rem"}>
                <Typography variant="h6" color={theme.palette.neutral.mediumMain}>TOTAL</Typography>
                <Typography variant="h6">&#8377; {Total}</Typography>
              </Flexbetween>
              <Flexbetween mb={"0.4rem"}>
                <Typography variant="h6" color={theme.palette.neutral.mediumMain}>Taxes</Typography>
                <Typography variant="h6">&#8377; 14</Typography>
              </Flexbetween>
              {isCoupenApplied && (
                <Flexbetween mb={"0.4rem"}>
                <Typography variant="h6" color={theme.palette.neutral.mediumMain}>Coupen Discount</Typography>
                <Typography variant="h6">&#8377; - {discount}</Typography>
              </Flexbetween>
              )}
              <Flexbetween mb={"0.4rem"}>
                <Typography variant="h6" color={theme.palette.neutral.mediumMain}>SUBTOTAL</Typography>
                <Typography variant="h6">&#8377; {Subtotal}</Typography>
              </Flexbetween>
              <Box p={"0.4rem"}display={"flex"} mt={"20px"} justifyContent={"center"} gap={"0.55rem"}>
              <TextField
              label={"Coupen Code"}
              value={discountCode}
              onChange={(e)=>setdiscountCode(e.target.value)}
              placeholder="Apply coupen code"
              />
              <Button  onClick={handleApplyClick} sx={{
                 backgroundColor:"#a39a9a",
                 fontWeight:"bold"
              }}>Apply</Button>
              </Box>
              {error.length>1 && (
                <Typography width={"190px"} m={"auto"} variant="h6" color={theme.palette.neutral.mediumMain}>{error}</Typography>
              )}
              <Button onClick={handlePayment}
              sx={{
                backgroundColor:"#8a7e7e",
                fontWeight:"bold",
                mt:"0.66rem"
              }} fullWidth>CHECKOUT</Button>
            </Box>
        </Box>{/* Right side */}
      </Box>
    </Box>
  </>
  )
}

export default MyCart
