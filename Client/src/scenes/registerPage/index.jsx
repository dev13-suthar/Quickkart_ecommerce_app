import {Box,Typography,useTheme,useMediaQuery,TextField,Button,Divider} from "@mui/material";
import Flexbetween from "../../components/Flexbetween";
import { Formik } from "formik";
import bg from "../../assets/bg.webp"
import { Link,useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:1000px)")

  const register = async(value,onSubmitProps)=>{
    const res = await fetch("http://localhost:6008/auth/register",{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value), // Stringify the value object
    });
    // eslint-disable-next-line no-unused-vars
    const data = await res.json();
    onSubmitProps.resetForm();
  }
  const handleFormSubmit = async(values,onSubmitProps)=>{
    await register(values,onSubmitProps)
    onSubmitProps.resetForm();
    navigate('/')
  }; 
  return (
    <Flexbetween p="0.2rem">
        
      <Box flexBasis={isNonMobile?"44%":"100%"}>
        <header style={{marginBottom:"7px",padding:"1.03rem"}}>
          <Typography variant="h1" color={theme.palette.primary.main}>Create Your Account</Typography>
          <Typography variant="h6"ml={"0.5rem"} color="initial">Already a member?? <Link style={{color:theme.palette.primary.main}} to={"/"}>Login</Link> </Typography>
        </header >
        <Divider sx={{mb:"1.4rem"}}/>
        <Formik
        onSubmit={handleFormSubmit}
        initialValues={{
          firstName:'',
          lastName:'',
          email:'',
          password:'',
          location:'',
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
                <Flexbetween gap="0.2rem">
                  <TextField
                    label="FirstName"
                    value={values.firstName}
                    onChange={handleChange}
                    name="firstName"
                    onBlur={handleBlur}
                    fullWidth        
                  />
                  {errors.firstName && touched.firstName && errors.firstName}
                   <TextField
                    label="LastName"
                    value={values.lastName}
                    onChange={handleChange}
                    name="lastName"
                    onBlur={handleBlur}
                    fullWidth
                
                  />
                  {errors.lastName && touched.lastName && errors.lastName}
                </Flexbetween>
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
                  <TextField
                    label="Location"
                    value={values.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="location"
                
                  />
                  {errors.location && touched.location && errors.location}
                  <Button  type="submit" sx={{background:theme.palette.primary.contrastText,p:"0.85rem",fontWeight:"500","&:hover":{
                    background:theme.palette.neutral.main
                  }}}>
                    Submit
                  </Button>
              </Box>
            </form>
          )}
        </Formik>

      </Box>
      {isNonMobile && (
        <Box>
        <img src={bg} width={"100%"} height={"100%"} style={{borderRadius:"11px"}} alt="" />
      </Box>
      )}
    </Flexbetween>
  )
}

export default RegisterPage
