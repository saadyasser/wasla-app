import { Box, Card, CardContent, Chip, Typography } from "@mui/material"
import { JobStatus } from "../ClientProfile/Status"
import { status } from "@/types/RecentJob"
import DoneIcon from '@mui/icons-material/Done';
import { Skills } from "../FindJob/Skills";

export type props = {
    note: 'New Project' | status.Completed,
    name: string,
    budget? : string,
    client?: string,
    skills?: string[]
}

export const ProjectCard = ({note, name, budget, client, skills}: props) => {
    return(
        <Card sx={{
            width: '100%', 
            transform: note === 'New Project' ? 'rotate(4deg)' : 'rotate(-2deg)', 
            boxShadow: 0, 
            border: '1px solid #E5E7EB',
            borderRadius: '1rem'
        }}>
            <CardContent>
                {
                    note === 'New Project' ? <Chip label={note} sx={{bgcolor: '#006633', color: 'white'}}/> :
                    <JobStatus jobStatus={note}/>
                }
                <Typography pt={1}>{name}</Typography>
                <Typography pb={1} fontSize={'small'} sx={{color: '#4A5565'}}>
                    {note === 'New Project' ? budget : 'Client: ' + client}
                </Typography>
                {
                    note === 'New Project' ? <Skills skills={skills}/> :
                    <Chip 
                        label={
                            <Box>
                                <DoneIcon fontSize="small" sx={{mt: -.5, ml: -1.5}}
                            /> 
                                Delivered on time
                            </Box>
                        } 
                        sx={{color:'#006633', border: 'none'}} 
                        variant="outlined"
                    />
                }
            </CardContent>
        </Card>
    )
}