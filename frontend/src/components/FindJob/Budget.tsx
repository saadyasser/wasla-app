import { Typography } from "@mui/material"
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { ReactNode } from "react";

type props = {budget: string}

export const Budget = ({budget}: props) : ReactNode => {
    return (
        <Typography sx={{color: "black", fontWeight: 'bold'}}>
            <AttachMoneyOutlinedIcon fontSize="medium" sx={{mt: -.5, color:"#4A5565"}}/> 
            {budget}
        </Typography>
    )
}