import {Box,Typography,useTheme,TextField,Button} from "@mui/material";


const NewsLetter = () => {
    const theme = useTheme();
  return (
        <div className="newLetter" style={{
            padding:"1.1rem",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            gap:"0.5rem",
            width:"100%",
            height:"max-content",
            backgroundPosition:"center",
            backgroundSize:"cover",
            backgroundImage:"linear-gradient(to bottom,rgba(0, 0, 0, 0.355),rgba(12, 51, 101, 0.501)),url(https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
        }}>
            <div style={{
                padding:"1.1rem",
                display:"flex",
                flexDirection:'column',
                gap:"0.33rem",
                alignItems:"center"
            }}>
            <Typography variant="h2" fontFamily={"monospace"}>Sign Up to Our Newsletter</Typography>
                <Typography variant="h5" color={theme.palette.neutral.dark}>
                    Get the Latest Secreats and Trends,Sign up for Our Newsletter and stay informed About All Things Beauty
                </Typography>
                <div style={{display:"flex",gap:"1rem",alignItems:"center",marginTop:"1.5rem"}}>
                    <input type="email" name="mail" placeholder="email" id=""style={{width:"210px",padding:"0.84rem",borderRadius:"14px",outline:"none",border:"1px solid blue",background:theme.palette.neutral.mediumMain}} />
                    <Button sx={{p:"0.44rem",borderRadius:"11px",background:theme.palette.neutral.light}}>Submit</Button>
                </div>
            </div>
        </div>
  )
}

export default NewsLetter
