import { Button } from "@mui/material"

type props = {
    Icon: React.ElementType,
    content: string
}

export const PostedJobButton = ({Icon, content}: props) => {
    return(
        <Button 
            sx={{
                bgcolor:'white', 
                color: '#1A1A1A', 
                boxShadow: 0, 
                border: '1px solid #E5E7EB', 
                borderRadius: '2rem', 
                textTransform: 'none'
            }} 
            size="small"
            variant="contained" 
            startIcon={<Icon />}
        >
            {content}
        </Button>
    )
}