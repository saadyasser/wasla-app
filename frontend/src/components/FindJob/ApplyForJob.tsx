"use client"
import { Job } from "@/types/Job"
import { ReactNode } from "react"
import { Header } from "./Header"
import { Card, CardContent, Box, Typography, Container, Grid } from "@mui/material"
import { Budget } from "./Budget"
import { Level } from "./Level"
import { Skills } from "./Skills"
import TodayIcon from '@mui/icons-material/Today';
import { ApplyForm } from "./ApplyForm"
import { Button } from "../Button"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useRouter } from "next/navigation"

type props = {job: Job}

export const ApplyForJob = ({job}: props): ReactNode => {
    const router = useRouter()
    return(
        <Container>
            <Button onClick={()=> router.push('/jobs')} fontColor="#1A1A1A" startIcon={<KeyboardBackspaceIcon />} content="Back to Jobs"/>
            <Card sx={{p: 1, mb: 4, boxShadow: 2, borderRadius: 3}}>
                <CardContent>
                    <Header
                        title={job.title}
                        posted_time={job.posted_time}
                        proposals={job.proposals}
                        location={job.location}
                    />
                    <Box display={'flex'} flexWrap={'wrap'} gap={2} mb={2} mt={2}>
                        <Budget budget={job.budget}/>
                        <Level label={job.level}/>
                        <Typography sx={{color:"#4A5565"}}><TodayIcon fontSize="small"/>{job.time}</Typography>
                    </Box>
                    <Skills skills={job.required_skills} title={job.title}/>
                </CardContent>
            </Card>
            <Card sx={{p: 3, mb: 4, boxShadow: 2, borderRadius: 3, color: '#364153'}}>
                <Typography variant="h6" sx={{fontWeight: 'bold'}} pb={1}>Job Description</Typography>
                <Typography pb={2}>{job.description}</Typography>
                <Typography variant="h6" sx={{fontWeight: 'bold'}} pb={1}>**Project Requirements:**</Typography>
                <Grid display={'grid'} gap={1}>
                    {job.requirenments.map((req, index) =>
                        <Typography key={`req-${index}`}>- {req}</Typography>
                    )}
                </Grid>
            </Card>
            <ApplyForm />
        </Container>
    )
}