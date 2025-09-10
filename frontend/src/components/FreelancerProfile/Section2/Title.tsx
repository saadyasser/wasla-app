import { Box, Typography } from '@mui/material'

type props = {
    Icon: React.ElementType,
    text: string
}

export const Title = ({Icon, text}: props) => {
    return(
        <Box sx={{
            display: 'flex',
            gap: .5,
            color: 'black',
            pb: 3
        }}>
            <Icon fontSize="small" color="success"/>
            <Typography fontSize={'small'}>{text}</Typography>
        </Box>
    )
}