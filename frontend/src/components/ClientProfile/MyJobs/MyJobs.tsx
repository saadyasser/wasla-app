import { Header } from "../Header"
import { ClientMyJobsCard, Title } from "@/types/ClientMyJobsCard"
import { GridLegacy as Grid } from "@mui/material"
import { Card } from "./Card"
import { MiddleTabs } from "../MiddleTabs"
import { ClientProfileData, ClientProfileProject } from "@/app/client-profile/page"

//temporary numbers
const cards: ClientMyJobsCard[] = [
    {title: Title.ActiveContracts, number: 1},
    {title: Title.OpenJobs, number: 1},
    {title: Title.TotalApplications, number: 31},
    {title: Title.TotalSpent, number: 12300}
]

export const MyJobs = ({data}: {data: ClientProfileData}) => {
      // derive metrics from data.projects
        const projects: ClientProfileProject[] = data?.projects || []
    
        const activeJobs = projects.filter(p => p.status === 'open' || p.status === 'in_progress').length
        const completedProjects = projects.filter(p => p.status === 'completed').length
        // freelancers hired assumed as jobs where a freelancer has been hired: in_progress or completed
        const freelancersHired = projects.filter(p => p.status === 'in_progress' || p.status === 'completed').length
        // total spent assumed as sum of budgets for completed jobs
        const totalSpent = projects
            .filter(p => p.status === 'completed')
            .reduce((sum, p) => sum + (Number(p.budget) || 0), 0)
    
        const cards: ClientDashboardCard[] = [
            { title: Title.ActiveJobs, number: activeJobs },
            { title: Title.CompletedProjects, number: completedProjects },
            { title: Title.FreelancersHired, number: freelancersHired },
            { title: Title.TotalSpent, number: totalSpent },
        ]
    return(
        <>
            <Header
                title="My Jobs"
                subTitle="Track your posted jobs, active contracts, and hired freelancers"
                buttonContent="Post New Job"
            />
         <Grid container spacing={2} mb={5} mt={2}>
                       {cards.map((card, index) =>
                           <Grid key={`${index}`} item xs={12} sm={6} md={3}>
                               <Card title={card.title} number={card.number}/>
                           </Grid>
                       )}
                   </Grid>
            <MiddleTabs projects={data.projects} />
        </>
    )
}