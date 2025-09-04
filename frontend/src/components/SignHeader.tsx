import { Grid } from "@mui/material"
import { Typography } from "@mui/material"

export const SignHeader = ()=> {
    return(
        <Grid justifyItems={'center'}>
            <Typography 
                bgcolor={'#006633'}
                width={'56px'}
                height={'56px'}
                textAlign={'center'}
                variant="h6"
                lineHeight={3}
                borderRadius={3}
            >
                P
            </Typography>
            <Typography>
                Join the Palestinian freelancer community
            </Typography>
        </Grid>
    )
}