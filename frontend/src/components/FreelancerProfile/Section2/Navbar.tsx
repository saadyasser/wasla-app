import { Container } from "@mui/material"
import { Button } from "@mui/material"
import { Dispatch, SetStateAction } from "react"

type section = 'Projects' | 'Reviews' | 'Settings'
const headers: section[] = ["Projects", "Reviews", "Settings"]

type props = {
    visibleSection: section,
    setVisibleSection: Dispatch<SetStateAction<section>>
}

export const NavBar = ({visibleSection ,setVisibleSection}: props) => {
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
                        color={visibleSection == header ? 'success' : 'inherit'}
                        size="small"
                        sx={{textTransform: 'none'}}
                        onClick={()=> setVisibleSection(header)}
                    >
                        <b>{header[0].toUpperCase() + header.slice(1).toLowerCase()}</b>
                    </Button>
                )}
        </Container>
    )
}