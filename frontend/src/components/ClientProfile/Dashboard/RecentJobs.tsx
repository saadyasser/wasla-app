import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Button } from '@/components/Button';
import { RecentJob, status } from '@/types/RecentJob';
import { JobCard } from './JobCard';

//temp data
const data: RecentJob[] = [
  {
    "title": "E-commerce Website Development",
    "category": "Web Development",
    "price": 2500,
    "status": status.Active,
    "proposals": 23
  },
  {
    "title": "Mobile App UI/UX Design",
    "category": "Design & Creative",
    "price": 1800,
    "status": status.InProgress,
    "proposals": 15
  },
  {
    "title": "Arabic Content Translation",
    "category": "Translation",
    "price": 500,
    "status": status.Completed,
    "proposals": 8
  }
]

export const RecentJobs = () => {
    return(
        <Card sx={{borderRadius: '14px', p: 2}}>
            <CardContent>
                <Box display={'flex'} justifyContent={'space-between'} mb={4} alignItems={'center'}>
                    <Typography fontSize={'large'} sx={{color: '#101828'}} fontWeight={'bold'}>Recent Jobs</Typography>
                    <Button content='View All' color='success' endIcon={<ArrowRightAltIcon />}/>
                </Box>
                <Grid display={'grid'} gap={3}>
                  {data.map((job, index) =>
                      <JobCard key={`recent-job-${index}`} job={job} />
                  )}
                </Grid>
            </CardContent>
        </Card>
    )
}