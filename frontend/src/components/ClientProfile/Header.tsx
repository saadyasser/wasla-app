import { Typography, Grid, Box } from "@mui/material"
import { Button } from "../Button"
import { Add } from "@mui/icons-material"

type props = {
    title: string, 
    subTitle: string, 
    buttonContent: string
}

export const Header = ({title, subTitle, buttonContent}: props) => {
    return(
        <Box display={'flex'} flexWrap={'wrap'} mt={3} justifyContent={'space-between'}>
            <Grid display={'grid'}>
                <Typography variant="h5" color="#101828" fontWeight={'bold'}>{title}</Typography>
                <Typography sx={{color: '#4A5565'}} mt={1}>{subTitle}</Typography>
            </Grid>
            <Grid alignSelf={'end'} mt={{xs: 1, md: 0}}>
                <Button 
                    content={buttonContent} 
                    startIcon={<Add />}
                    bgColor="#006633"
                    fontColor="white"
                    padding=".5rem 1rem"
                />
            </Grid>
        </Box>
    )
}