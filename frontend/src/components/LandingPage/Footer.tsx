import { Container, Typography } from "@mui/material"

export const Footer = () => {
    return(
        <Container sx={{bgcolor: '#101828', textAlign: 'center', p: .5}} maxWidth={false}>
            <Typography>© 2025 Palestine Work. All rights reserved.</Typography>
        </Container>
    )
}