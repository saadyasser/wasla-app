import { Typography, Box, Grid } from "@mui/material"
import { LinearProgressComp } from "../LinearProgressComp"

type props = {step: number}

export const Header = ({step}: props) => {
    let linearProgressValue: number
    switch(step){
        case 1: linearProgressValue = 33
        break
        case 2: linearProgressValue = 66
        break
        default: linearProgressValue = 100
    }
    const numberOfSteps = 3
    return(
        <Grid mb={4}>
            <Box display={'flex'} justifyContent={'space-between'} mb={1}>
                <Typography sx={{color: '#101828', fontSize: '1.5rem'}} fontWeight={'bold'}>Post A New Job</Typography>
                <Typography sx={{color: '#4A5565'}} fontSize={'small'}>Step {step} of {numberOfSteps}</Typography>
            </Box>
            <LinearProgressComp value={linearProgressValue}/>
        </Grid>
    )
}