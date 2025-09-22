import { Card, CardContent, Typography, Box, Chip } from "@mui/material"
import { PostedJobType, Status } from "@/types/PostedJob"
import { PostStatus } from "./PostStatus"
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { PostedJobButton } from "./PostedJobButton";
import TaskAltIcon from '@mui/icons-material/TaskAlt';

type props = {job: PostedJobType}

export const PostedJob = ({job}: props) => {
    return(
        <Card sx={{borderRadius: '14.5px', boxShadow: 0, border: '1px solid #E5E7EB80'}}>
            <CardContent sx={{ml: 2, mr: 2}}>
                <Box display={'flex'} mb={2} alignItems={'center'} gap={1}>
                    <Typography fontSize={'large'} fontWeight={'bold'}>{job.title}</Typography>
                    <PostStatus postStatus={job.status}/>
                </Box>
                <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'} gap={2} mb={1}>
                    <Box display={'flex'} alignItems={'center'} gap={.5} sx={{color:'#4A5565'}}>
                        <AttachMoneyOutlinedIcon fontSize="small"/>
                        <Typography fontSize={'small'}>${job.budget}</Typography>
                    </Box>
                    <Box display={'flex'} alignItems={'center'} gap={.5} sx={{color:'#4A5565'}}>
                        <CalendarTodayIcon fontSize="small"/>
                        <Typography fontSize={'small'}>Posted {job.postedDate}</Typography>
                    </Box>
                    <Box display={'flex'} alignItems={'center'} gap={.5} sx={{color:'#4A5565'}}>
                        <PersonOutlineIcon fontSize="small"/>
                        <Typography fontSize={'small'}>{job.applicationsReceived} applications</Typography>
                    </Box>
                    {
                        job.status === Status.Closed && 
                        <Box display={'flex'} alignItems={'center'} gap={.5} sx={{color:'#4A5565'}}>
                            <TaskAltIcon fontSize="small"/>
                            <Typography fontSize={'small'}>{job.numberOfHired} hired</Typography>
                        </Box>
                    }
                </Box>
                <Typography mb={1} mt={1}>{job.description}</Typography>
                <Box display={'flex'} gap={1} mb={1}>
                    {job.skills.map((skill: string) =>
                        <Chip 
                            key={`${skill}-skill-for-posted-project`} 
                            label={skill}
                            sx={{bgcolor: 'white', border: '1px solid #E5E7EB'}}
                        />
                    )}
                </Box>
                <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} justifyContent={'space-between'}>
                    <Typography mt={{xs:0, md: 3}} sx={{color: '#4A5565'}} fontSize={'small'}>
                        {job.status === Status.Open ?
                            <>
                                {job.applicationsReceived} responses received
                            </> :
                            <>
                                Completed {job.completedDate}
                            </>
                        }
                    </Typography>
                    <Box display={'flex'} gap={1} flexWrap={'wrap'}>
                        <PostedJobButton content="View proposals" Icon={VisibilityIcon}/>
                        {
                            job.status === Status.Open && 
                            <PostedJobButton content="Edit Job" Icon={DescriptionOutlinedIcon}/>
                        }
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}