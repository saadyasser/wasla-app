import { LinearProgress } from "@mui/material";

type props = {value: number}

export const LinearProgressComp = ({value}: props) => {
    return(
        <LinearProgress
            color="success"
            value={value} 
            variant="determinate"
            sx={{borderRadius: '14.5px', height: '.4rem'}}
        />
    )
}