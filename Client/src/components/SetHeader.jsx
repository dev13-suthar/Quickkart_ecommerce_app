import {useTheme,Typography} from "@mui/material";

const SetHeader = ({title,subtitle}) => {
    const theme = useTheme();
  return (
    <>
        <Typography mb="3px" variant="h2">{title}</Typography>
        <Typography mb="3px" variant="h5" color={theme.palette.neutral.mediumMain}>{subtitle}</Typography>
    </>
  )
}

export default SetHeader
