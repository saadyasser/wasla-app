import { Box, Typography, IconButton } from "@mui/material"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import jobs from '../../data/jobs.json'

type props = {
    title: string,
    "posted_time": string, 
    proposals: number, 
    location: string
}

export const Header = ({title, posted_time, proposals, location}: props)=> {
    const basicInfo: (keyof typeof jobs[0])[] = ["posted_time", "proposals", "location"]
    return(
        <>
            <Box display={'flex'} justifyContent={'space-between'}>
            <Typography color="#101828" variant="h6"><b>{title}</b></Typography>
            <IconButton>
                <FavoriteBorderOutlinedIcon fontSize="small" sx={{color: '#99A1AF'}}/>
            </IconButton>
            </Box>
            <Box display={'flex'} gap={2} mb={1} flexWrap={'wrap'}>
                {basicInfo.map((info)  =>
                    <>
                        <Typography
                            color="#4A5565"
                            fontSize={'small'}
                        >
                            {
                                info === 'posted_time' ? posted_time :
                                info === 'proposals' ? `${proposals} proposals` :
                                <Box>
                                    <RoomOutlinedIcon fontSize="small" sx={{width:'1rem', mt: -.5}}/>
                                    {location}
                                </Box>
                            }
                        </Typography>
                        {(info === 'proposals' || info === 'posted_time') && <Typography color="#4A5565">•</Typography>}
                    </>
                )}
            </Box>
        </>
    )
}