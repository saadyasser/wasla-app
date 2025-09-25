import { PostedJob } from "./PostedJob"
import { Grid } from "@mui/material"
import { PostedJobType, Status } from "@/types/PostedJob"
import { ClientProfileProject } from "@/app/client-profile/page"

const jobs: PostedJobType[] = [
    {
        "title": "Arabic Voiceover for Videos",
        "status": Status.Open,
        "budget": 800,
        "postedDate": "2024-11-18",
        "applicationsReceived": 8,
        "description": "Need professional Arabic voiceover for educational videos",
        "skills": [
            "Voice Acting",
            "Arabic"
        ],
        "responsesReceived": 8
    },
    {
        "title": "Arabic Voiceover for Videos",
        "status": Status.Closed,
        "numberOfHired": 1,
        "budget": 800,
        "postedDate": "2024-11-18",
        "applicationsReceived": 8,
        "description": "Need professional Arabic voiceover for educational videos",
        "skills": [
            "Voice Acting",
            "Arabic"
        ],
        "completedDate": "11/5/2024"
    }
]

export const PostedJobs = ({projects}: {projects: ClientProfileProject[]}) => {
    return(
        <Grid display={'grid'} gap={4}>
            {projects.map((job, index) =>
                <PostedJob key={`posted-job-${index}`} job={job}/>
            )}
        </Grid>
    )
}