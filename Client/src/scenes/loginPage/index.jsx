import {Box,Typography,useTheme,useMediaQuery,TextField,Button,Divider} from "@mui/material";
import { Formik } from "formik";
import bg from "../../assets/bg.webp"
import { Link,useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import {setUser} from "../../state/index.js"

import Flexbetween from "../../components/Flexbetween";
const LoginPage = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = async(value,onSubmitProps)=>{
        const res = await fetch('http://localhost:6008/auth/login',{
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify(value)
        });
        const loggin = await res.json();
        if(loggin){
          dispatch(
            setUser({
              user:loggin.user,
              token:loggin.token
            })
          );
        }
        onSubmitProps.resetForm(); 
        navigate("/home");
  }
  const handleFormSubmit = async(values,onSubmitProps)=>{
      login(values,onSubmitProps);
      onSubmitProps.resetForm();
  };
  return (
    <Flexbetween p="0.2rem">
      <Box flexBasis={isNonMobile?"44%":"100%"}>
      <header style={{marginBottom:"7px",padding:"1.03rem"}}>
          <Typography variant="h1" color={theme.palette.primary.main}>Login to Your Account</Typography>
          <Typography variant="h6"ml={"0.5rem"}>New Here? <Link style={{color:theme.palette.primary.main}} to={"/register"}>Sign UP</Link> </Typography>
        </header >
        <Divider sx={{mb:"1.4rem"}}/>

        <Formik onSubmit={handleFormSubmit}
        initialValues={{
          email:'',
          password:''
        }}
        >
          {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              resetForm
          })=>(
            <form onSubmit={handleSubmit} style={{padding:"0.75rem"}}>
                <Box p="1rem" display="flex" flexDirection="column" gap="1.1rem">
                <TextField
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="email"
                
                  />
                  {errors.email && touched.email && errors.email}

                  <TextField
                    type="password"
                    label="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="password"
                  />
                  {errors.password && touched.password && errors.password}

                  <Button  type="submit" sx={{background:theme.palette.primary.contrastText,p:"0.85rem",fontWeight:"500","&:hover":{
                    background:theme.palette.neutral.main
                  }}}>
                      Login
                  </Button>
                </Box>
            </form>
          )}
        </Formik>
      </Box>
      {isNonMobile && (
        <Box>
        <img src={bg} width={"100%"} height={"auto"} style={{borderRadius:"11px"}} alt="" />
      </Box>
      )}
    </Flexbetween>
  )
}

export default LoginPage
