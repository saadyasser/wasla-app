import { ActiveContract } from "./ActiveContract"
import { status } from "@/types/RecentJob"
import { ActiveContractType } from "@/types/ActiveContract"
import { Grid } from "@mui/material"
import { ClientProfileProject } from "@/app/client-profile/page"

//temporary
const contracts: ActiveContractType[] = [
    {
        "projectTitle": "Palestinian Cultural App Development",
        "status": status.InProgress,
        "client": "Anmad Hassan",
        "budget": 4500,
        "dueDate": "2025-01-15",
        "description": "Developing an app to showcase Palestinian culture and history",
        "technologies": [
            "ReactNative",
            "Firebase",
            "UI/UX"
        ],
        "progress": 30,
         "applicationsReceived": 15,
    }
]

export const ActiveContracts = ( {projects}: {projects: ClientProfileProject[]}) => {
    return(
        <Grid display={'grid'} gap={4}>
            {projects.filter(p => p.status === 'open' || p.status === 'in-progress')?.map((project, index) =>
                <ActiveContract key={`contract-${index}`} contract={project}/>
            )}
        </Grid>
    )
}