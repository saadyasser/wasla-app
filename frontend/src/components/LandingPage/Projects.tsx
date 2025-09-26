import { ProjectCard } from "./ProjectCard"
import { status } from "@/types/RecentJob"
import { props } from "./ProjectCard"
import { Grid } from "@mui/material"

const projects: props[] = [
    {
        note: 'New Project',
        name: 'React Developer Needed',
        budget : '$2,000 - $4,000',
        skills: ['React','Node.js']
    },
    {
        note: status.Completed,
        name: 'Logo Design Project',
        client : 'Tech Startup',
    }
]

export const Projects = () => {
    return(
        <Grid display={'flex'} gap={2} pt={3}>
            {projects.map((project,index) =>
                <ProjectCard 
                    key={`landingpage-project-${index}`} 
                    note={project.note}
                    name={project.name}
                    budget={project.budget}
                    client={project.client}
                    skills={project.skills}
                />
            )}
        </Grid>
    )
}