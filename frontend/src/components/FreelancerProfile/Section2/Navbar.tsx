import { Container } from "@mui/material"
import { Button } from "@mui/material"

const headers = ["Projects", "Reviews", "Settings"]

export const NavBar = () => {
    return(
        <Container 
            sx={{
                display:'flex', 
                justifyContent: 'space-around',
                bgcolor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '1rem',
                color: 'black',
                mt: 4,
                mb: 4
            }}>
                {headers.map(header=> 
                    <Button 
                        key={`freelancerProfile-${header}`}
                        color="inherit"
                        size="small"
                        sx={{textTransform: 'none'}}
                    >
                        {header[0].toUpperCase() + header.slice(1).toLowerCase()}
                    </Button>
                )}
        </Container>
    )
}