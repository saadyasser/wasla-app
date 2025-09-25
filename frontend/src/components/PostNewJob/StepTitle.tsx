import { Box, Typography } from "@mui/material"

type props = {step: number}

type text = {
    title: string,
    subTitle: string
}

export const StepTitle = ({step}: props) => {
    let textObj: text
    switch(step){
        case 1: textObj = {title: 'Tell us about your project', subTitle: 'Start with a clear, descriptive title description'}
        break
        case 2: textObj = {title: 'Required skills', subTitle: 'Select the skills needed for this project'}
        break
        default: textObj = {title: 'Budget and timeline', subTitle: 'Set your budget and project requirements'}
    }
    return(
        <Box textAlign={'center'} mb={2}>
            <Typography variant="h5" fontWeight={'bold'}>{textObj.title}</Typography>
            <Typography fontSize={'small'} sx={{color: '#4A5565'}}>{textObj.subTitle}</Typography>
        </Box>
    )
}