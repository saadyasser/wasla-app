'use client' //because we use use
import { useParams } from "next/navigation";
import jobs from '../../../data/jobs.json'
import { Typography } from "@mui/material";
import { ApplyForJob } from "@/components/FindJob/ApplyForJob";
import { ReactNode } from "react";

export default function JobApplication(): ReactNode{
    const {id} = useParams()
    const errMsg = <Typography variant="h1" color="error">Error.. job application not found</Typography>
    if(!id) return errMsg
    const job = jobs.find(job=> job.id === +id)
    if(!job) return errMsg
    return <ApplyForJob job={job}/>
}