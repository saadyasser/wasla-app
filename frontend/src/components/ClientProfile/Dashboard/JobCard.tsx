import { Box, Card, CardContent, Typography } from "@mui/material"
import { RecentJob } from "@/types/RecentJob"
import { JobStatus } from "../Status"
import { ClientProfileProject } from "@/app/client-profile/page"

type props = {
    job: ClientProfileProject
}

export const JobCard = ({job}: props) => {
    return(
        <Card sx={{borderRadius: '14px', p: 2, boxShadow: 0, border: '1px solid #F3F4F6'}}>
            <CardContent>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography fontWeight={'bold'} sx={{color: '#101828'}}>{job.title}</Typography>
                    <JobStatus jobStatus={job.status} />
                </Box>
                <Typography sx={{color: '#4A5565'}}>{job.experience_level}</Typography>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography sx={{color: '#6A7282'}} fontSize={'small'}>${job.budget.toLocaleString()}</Typography>
                    <Typography sx={{color: '#6A7282'}} fontSize={'small'}>{job.proposals_count} proposals</Typography>
                </Box>
            </CardContent>
        </Card>
    )
}