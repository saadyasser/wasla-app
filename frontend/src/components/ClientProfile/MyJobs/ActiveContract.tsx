import { Box, Card, CardContent, Typography, Chip, Button, LinearProgress } from "@mui/material"
import { JobStatus } from "../Status"
import { status } from "@/types/RecentJob"
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MovingIcon from '@mui/icons-material/Moving';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { ClientProfileProject } from "@/app/client-profile/page";

type props = {contract: ClientProfileProject}

//all status are in progress
export const ActiveContract = ({contract}: props) => {
    return(
        <Card sx={{borderRadius: '14.5px'}}>
            <CardContent>
                <Box display={'flex'} mb={2} alignItems={'center'} gap={1}>
                    <Typography fontSize={'large'} fontWeight={'bold'}>{contract.title}</Typography>
                    <JobStatus jobStatus={status.InProgress}/>
                </Box>
                <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'} gap={2}>
                    {/* <Box display={'flex'} alignItems={'center'} gap={.5}>
                        <Chip color="success" label={contract.client.company_name}/>
                        <Typography fontSize={'small'} sx={{color:'#4A5565'}}>{contract.client.company_name}</Typography>
                    </Box> */}
                    <Box display={'flex'}>
                        <Typography fontSize={'small'} sx={{color:'#4A5565'}}>{contract.budget}$</Typography>
                    </Box>
                    <Box display={'flex'} alignItems={'center'} gap={.5}>
                        <CalendarTodayIcon fontSize="small" sx={{color:'#4A5565'}}/>
                        <Typography fontSize={'small'} sx={{color:'#4A5565'}}>{contract.duration}</Typography>
                    </Box>
                </Box>
                <Typography mb={1} mt={1}>{contract.description}</Typography>
                <Box display={'flex'} gap={1} mb={1}>
                    {contract.skills.map((tec: string) =>
                        <Chip 
                            key={`${tec}-techonology-for-active-project`} 
                            label={tec}
                            sx={{bgcolor: 'white', border: '1px solid #E5E7EB'}}
                        />
                    )}
                </Box>
                <Box display={'flex'} mb={2} alignItems={'center'} justifyContent={'space-between'} flexWrap={'wrap'}>
                    <Box display={'flex'} gap={2}>
                        <Box display={'flex'} gap={.5} fontSize={'small'} sx={{color:'#4A5565'}}>
                            <MovingIcon fontSize="small"/>
                            {contract.status === 'open' ? 0 : contract.status === 'in-progress' ? 50 : 100}% of completeness
                        </Box>
                        <Box display={'flex'} gap={.5} fontSize={'small'} sx={{color:'#4A5565'}}>
                            <PersonOutlineIcon fontSize="small"/>
                            Hired from {contract.proposals_count} applications
                        </Box>
                    </Box>
                </Box>
                <LinearProgress 
                    variant="determinate" 
                    value={contract.status === 'open' ? 0 : contract.status === 'in-progress' ? 50 : 100} 
                    color="success"
                    sx={{borderRadius: '14.5px', height: '.4rem'}}
                />
            </CardContent>
        </Card>
    )
}