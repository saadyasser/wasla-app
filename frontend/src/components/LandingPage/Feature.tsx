import { Typography } from "@mui/material"
import {GridLegacy as Grid} from "@mui/material"

interface props{
    icon: React.ReactNode,
    title: string,
    subTitle: string,
    //there is two sections, second section icons bigger than the first
    sectionNumber: number
}

export const Feature = (
    {
        icon, 
        title, 
        subTitle,
        sectionNumber
    } : 
        props 
    ) => {
    return(
        <Grid item xs={4} p={5} container display={'grid'} gap={1}>
            <Typography 
                color="#006633" 
                bgcolor={'#0066331A'}
                width={`${sectionNumber === 1 ? '42px' : '56px'}`}
                height={`${sectionNumber === 1 ? '42px' : '56px'}`}
                sx={{p: 1, borderRadius: 2}}
                justifySelf={'center'}
            >
                {icon}
            </Typography>
            <Typography 
                component={'h1'} 
                variant="h6"
                color="#101828"
                fontWeight={'bold'}
            >
                {title}
            </Typography>
            <Typography 
                component={'h2'} 
                variant="subtitle2"
                color="#4A5565"
            >
                {subTitle}
            </Typography>
        </Grid>
    )
}