'use client'
import { ReactNode } from "react";
import { Box, Card, Container, Chip } from "@mui/material";
import { CardContent } from "@mui/material";
import {Typography} from "@mui/material";
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import {GridLegacy as Grid} from "@mui/material";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Button } from "../Button";
import StarIcon from '@mui/icons-material/Star';
import {Button as MUIButton} from "@mui/material";
import { useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';

const data = [{
  "title": "Arabic-English Translation for Educational Content",
  "posted_time": "2 hours ago",
  "proposals": 8,
  "location": "Ramallah, Palestine",
  "description": "We need a skilled translator to translate educational materials from Arabic to English. The content focuses on Palestinian history and culture. Must be native in both languages with cultural sensitivity.",
  "budget": "$500-1000",
  "required_skills": [
    "Arabic Translation",
    "English Writing",
    "Cultural Sensitivity",
    "Education"
  ],
  "level": "Intermediate Level",
  "client": {
    "name": "Palestinian Education Initiative",
    "verified": true,
    "rating": 4.9,
    "amount_spent": "$25,000+"
  }
},
{
  "title": "Arabic-English Translation for Educational Content",
  "posted_time": "2 hours ago",
  "proposals": 8,
  "location": "Ramallah, Palestine",
  "description": "We need a skilled translator to translate educational materials from Arabic to English. The content focuses on Palestinian history and culture. Must be native in both languages with cultural sensitivity.",
  "budget": "$500-1000",
  "required_skills": [
    "Arabic Translation",
    "English Writing",
    "Cultural Sensitivity",
    "Education"
  ],
  "level": "Intermediate Level",
  "client": {
    "name": "Palestinian Education Initiative",
    "verified": true,
    "rating": 4.9,
    "amount_spent": "$25,000+"
  }
}]

const basicInfo: (keyof typeof data[0])[] = ["posted_time", "proposals", "location"]

export const WorkDetails = () : ReactNode => {
    const [isFavClicked, setIsFavClicked] = useState(false)
    return(
        <Container>
            {data.map((job, index) => 
                <Card key={`job-no${index+1}`} sx={{p: 1, mb: 3, boxShadow: 2, borderRadius: 3}}>
                    <CardContent>
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Typography color="#101828" variant="h6"><b>{job.title}</b></Typography>
                            <MUIButton onClick={()=> setIsFavClicked(old => !old)}>
                                {isFavClicked ? 
                                    <FavoriteIcon fontSize="small" sx={{color: '#99A1AF'}}/> :
                                    <FavoriteBorderOutlinedIcon fontSize="small" sx={{color: '#99A1AF'}}/>
                                }
                            </MUIButton>
                        </Box>
                        <Box display={'flex'} gap={2} mb={1} flexWrap={'wrap'}>
                            {basicInfo.map((info)  =>
                                <>
                                    <Typography
                                        color="#4A5565"
                                        fontSize={'small'}
                                    >
                                        {
                                            info === 'posted_time' ? job.posted_time :
                                            info === 'proposals' ? `${job.proposals} proposals` : 
                                            <Box display={'flex'}><RoomOutlinedIcon fontSize="small" sx={{width:'1rem', height: '18px'}}/> {job.location}</Box>
                                        }
                                    </Typography>
                                    {(info === 'proposals' || info === 'posted_time') && <Typography color="#4A5565">•</Typography>}
                                </>
                            )}
                        </Box>
                        <Typography mb={1}>{job.description}</Typography>
                        <Box display={'flex'} justifyContent={'space-between'} mb={1}>     
                           <Typography><AttachMoneyOutlinedIcon fontSize="small"/> {job.budget}</Typography>
                           <Chip label={job.level} sx={{color: '#894B00', bgcolor: '#FEF9C2', border: '1px solid #FFF085', fontWeight: 'bold'}}/>
                        </Box>
                        <Box display={'flex'} gap={1} flexWrap={'wrap'}>
                            {job.required_skills.map(skill =>
                                <Chip key={`${job.title}-${skill}`} label={skill} sx={{bgcolor: '#F5F5F5', fontWeight: 'bold'}}/>
                            )}
                        </Box>
                        <Box sx={{borderTop: '1px solid #E5E7EB', margin: '1rem 0'}}></Box>
                        <Box display={'flex'} justifyContent={'space-between'} gap={{xs: 1, sm: 0}} flexDirection={{xs: 'column', sm: 'row'}}>
                            <Box display={'flex'} gap={2}>
                                <Typography
                                    bgcolor={'#F5F5F5'}
                                    fontSize={'large'}
                                    width={'40px'}
                                    height={'40px'}
                                    borderRadius={5}
                                    sx={{color: 'black'}}
                                    textAlign={'center'}
                                    lineHeight={.6}
                                    padding={2}
                                >
                                    {job.client.name[0]}
                                </Typography>
                                <Grid display={'grid'}>
                                    <Typography>
                                        <b>{job.client.name} </b> 
                                        <Chip 
                                            label={job.client.verified && <b>Verified</b>}
                                            sx={{bgcolor: '#DCFCE7', color: '#016630'}}
                                        />
                                    </Typography>
                                    <Box display={'flex'} gap={1} sx={{lineHeight: 1}} mt={{xs: 0, sm: -1}}>
                                        <Box display={'flex'} gap={.4}>
                                            <StarIcon fontSize="small" sx={{color: '#FCC800', width:'1rem', height: '1rem'}}/>
                                            <Typography fontSize={'small'} color="#4A5565">{job.client.rating}</Typography>
                                        </Box>
                                        <Typography fontSize={'small'} color="#4A5565">•</Typography>
                                        <Typography fontSize={'small'} color="#4A5565">{job.client.amount_spent} spent</Typography>
                                    </Box> 
                                </Grid>
                            </Box>
                                <Box 
                                    display={'grid'} 
                                    justifyContent={'end'} 
                                    mt={{xs: 1, sm: 0}}
                                >
                                    <Button content="Apply Now" width="8rem" bgColor="#006633" fontColor="white"/>
                                </Box>
                        </Box>
                    </CardContent>
                </Card>
            )}
        </Container>
    )
}