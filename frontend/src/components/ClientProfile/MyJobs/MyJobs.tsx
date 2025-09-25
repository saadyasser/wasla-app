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
    return(
        <>
            <Header
                title="My Jobs"
                subTitle="Track your posted jobs, active contracts, and hired freelancers"
                buttonContent="Post New Job"
            />
            <Grid container spacing={2} mb={5} mt={2}>
                {cards.map(card =>
                    <Grid key={`${card.title}`} item xs={12} sm={6} md={3}>
                        <Card title={card.title} number={card.number}/>
                    </Grid>
                )}
            </Grid>
            <MiddleTabs />
        </>
    )
}