import { Grid } from "@mui/material"
import { Typography } from "@mui/material"

export const SignHeader = ()=> {
    return(
        <Grid justifyItems={'center'} mb={1}>
            <Typography 
                bgcolor={'#006633'}
                width={'56px'}
                height={'56px'}
                textAlign={'center'}
                variant="h6"
                lineHeight={3}
                borderRadius={3}
                fontWeight={'bold'}
                marginBottom={1}
                sx={{color: 'white'}}
            >
                W
            </Typography>
            <Typography 
                textAlign={'center'}
                variant="h1"
                fontSize="26px"
                lineHeight="32px"
                fontWeight="700"
                marginTop="14px"
                marginBottom="8px"
                sx={{color: '#1A1A1A'}}
            >
                Welcome to Wasla
            </Typography>
            <Typography 
                color="#6B7280"
                variant={'body2'}
            >
                Join the Palestinian freelancer community
            </Typography>
        </Grid>
    )
}