import { ReactNode } from "react";
import { Chip } from "@mui/material";

type props = {label: string}

export const Level = ({label}: props) : ReactNode => {
    return (
        <Chip 
            label={label} 
            sx={{
                color: '#894B00', 
                bgcolor: '#FEF9C2', 
                border: '1px solid #FFF085', 
                fontWeight: 'bold'
            }}
        />
    )
}