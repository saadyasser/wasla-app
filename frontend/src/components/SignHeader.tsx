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
                P
            </Typography>
            <Typography 
                color="textDisabled"
                variant={'body2'}
            >
                Join the Palestinian freelancer community
            </Typography>
        </Grid>
    )
}