import { Typography } from "@mui/material"
import {GridLegacy as Grid} from "@mui/material"
import { FeatureType } from "@/types/Feature"

interface props extends FeatureType{
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
        <Grid item xs={sectionNumber ===1 ? 6 : 12} sm={3} p={5} display={'grid'} gap={1} justifyContent={'center'} textAlign={'center'}>
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