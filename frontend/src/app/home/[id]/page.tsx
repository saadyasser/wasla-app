import { Typography } from "@mui/material";
import { ApplyForJob } from "@/components/FindJob/ApplyForJob";
import { ReactNode } from "react";
import { fetchProjects } from "../page";
import { auth } from "../../../../auth";
import { SessionWithToken } from "../../freelancer-profile/page";
import { Job } from "@/types/Job";

export default async function JobApplication(): Promise<ReactNode> {
    const errMsg = <Typography variant="h1" color="error">Error.. job application not found</Typography>

    const session = await auth();
    const accessToken = (session as SessionWithToken | null)?.accessToken;

    const projects = await fetchProjects(undefined, accessToken);
    if (!projects || projects.length === 0) return errMsg;

    const p = projects[0];

    const job: Job = {
        id: p.id,
        title: p.title,
        posted_time: p.created_at_human,
        proposals: p.proposals_count ?? 0,
        location: p.client.company_name || "Unknown client",
        description: p.description,
        budget: String(p.budget),
        required_skills: p.skills || [],
        level: p.experience_level,
        client: {
            name: p.client.company_name || "Unknown client",
            verified: false,
            rating: p.rating ?? 0,
            amount_spent: "N/A",
        },
        time: p.duration,
        requirenments: [],
    };

    return <ApplyForJob job={job} accessToken={accessToken}/>;
}