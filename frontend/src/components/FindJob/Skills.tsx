import { Box, Chip } from "@mui/material"
import { ReactNode } from "react"

type props = {
    skills?: string[],
    title?: string
}

export const Skills = ({skills, title}: props) : ReactNode => {
    return (
        <Box display={'flex'} gap={1} flexWrap={'wrap'}>
            {skills && skills.map(skill =>
                <Chip key={`${title}-${skill}`} label={skill} sx={{bgcolor: '#F5F5F5', fontWeight: title? 'bold' : ''}}/>
            )}
        </Box>
    )
}