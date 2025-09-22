import { Header } from "../Header"
import { RecentJobs } from "./RecentJobs"
import { GridLegacy as Grid } from "@mui/material"
import { ClientDashboardCard, Title } from "@/types/ClientDashboardCard"
import { Card } from "./Card"

//temporary numbers
const cards: ClientDashboardCard[] = [
    {title: Title.ActiveJobs, number: 12},
    {title: Title.CompletedProjects, number: 45},
    {title: Title.FreelancersHired, number: 38},
    {title: Title.TotalSpent, number: 24500}
]

export const Dashboard = ()=> {
    return(
        <>
            <Header
                title="Client Dashboard"
                subTitle="Manage your projects and find talented freelancers"
                buttonContent="Post New Job"
            />
            <Grid container spacing={2} mb={5} mt={2}>
                {cards.map(card =>
                    <Grid key={`${card.title}`} item xs={12} sm={6} md={3}>
                        <Card title={card.title} number={card.number}/>
                    </Grid>
                )}
            </Grid>
            <RecentJobs />
        </>
    )
}