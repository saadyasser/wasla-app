//this is used for secitons (3, 4, 5, 6)

import { Typography } from "@mui/material"

interface header{
    title: string,
    subTitle: string
}

export const SectionHeader = ({title, subTitle}: header)=> {
    return(
        <>
        <Typography 
            color="#101828" 
            fontWeight={'bold'} 
            variant='h5'
        >
            {title}
        </Typography>
        <Typography 
            color='#4A5565' 
            variant='subtitle1'
        >
            {subTitle}
        </Typography>
        </>
    )
}