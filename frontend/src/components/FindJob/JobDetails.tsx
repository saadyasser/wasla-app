'use client'
import { ReactNode } from "react";
import { Box, Card, Container, Chip } from "@mui/material";
import { CardContent } from "@mui/material";
import {Typography} from "@mui/material";
import {GridLegacy as Grid} from "@mui/material";
import { Button } from "../Button";
import StarIcon from '@mui/icons-material/Star';
import jobs from '../../data/jobs.json'
import { useRouter } from "next/navigation";
import { Header } from "./Header";
import { Budget } from "./Budget";
import { Level } from "./Level";
import { Skills } from "./Skills";
import { Job } from "@/types/Job";

const data: Job[] = jobs

export const JobDetails = () : ReactNode => {
    const router = useRouter()
    return(
        <Container>
            {data.map((job, index) => 
                <Card key={`job-no${index+1}`} sx={{p: 1, mb: 3, boxShadow: 2, borderRadius: 3}}>
                    <CardContent>
                        <Header 
                            title={job.title}
                            posted_time={job.posted_time}
                            proposals={job.proposals}
                            location={job.location}
                        />
                        <Typography mb={1}>{job.description}</Typography>
                        <Box display={'flex'} justifyContent={'space-between'} mb={1}>     
                           <Budget budget={job.budget}/>
                           <Level label={job.level}/>
                        </Box>
                        <Skills skills={job.required_skills} title={job.title}/>
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
                                    <Box display={'flex'} gap={1}>
                                        <b>{job.client.name} </b> 
                                        <Chip 
                                            label={job.client.verified && <b>Verified</b>}
                                            sx={{bgcolor: '#DCFCE7', color: '#016630'}}
                                        />
                                    </Box>
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
                                    <Button 
                                        content="Apply Now" 
                                        width="8rem" 
                                        bgColor="#006633" 
                                        fontColor="white" 
                                        onClick={()=> router.push(`jobs/${job.id}`)}
                                    />
                                </Box>
                        </Box>
                    </CardContent>
                </Card>
            )}
        </Container>
    )
}