import { Box, Card, CardContent, Chip, Typography } from "@mui/material"
import { RecentJob, status } from "@/types/RecentJob"

type props = {
    job: RecentJob
}

export const JobCard = ({job}: props) => {
    return(
        <Card sx={{borderRadius: '14px', p: 2, boxShadow: 0, border: '1px solid #F3F4F6'}}>
            <CardContent>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography fontWeight={'bold'} sx={{color: '#101828'}}>{job.title}</Typography>
                    <Chip 
                        label={job.status}
                        sx={{
                            color: job.status === status.Active ? '#006633' :
                                   job.status === status.InProgress ? '#155DFC' : 
                                   '#00A63E',
                            bgcolor: job.status === status.Active ? '#E8F5E8' :
                                     job.status === status.InProgress ? '#EFF6FF' : 
                                    '#F0FDF4',
                            border: job.status === status.Active ? '1px solid #00663333' :
                                     job.status === status.InProgress ? '1px solid #BEDBFF' : 
                                    '1px solid #B9F8CF',
                            fontWeight: 'bold'
                        }}
                    />
                </Box>
                <Typography sx={{color: '#4A5565'}}>{job.category}</Typography>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography sx={{color: '#6A7282'}} fontSize={'small'}>${job.price.toLocaleString()}</Typography>
                    <Typography sx={{color: '#6A7282'}} fontSize={'small'}>{job.proposals} proposals</Typography>
                </Box>
            </CardContent>
        </Card>
    )
}