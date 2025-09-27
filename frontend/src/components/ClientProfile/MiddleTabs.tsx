import { Tabs, Tab, Container, GridLegacy as Grid } from "@mui/material";
import { useState } from "react";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import { ActiveContracts } from "./MyJobs/ActiveContracts";
import { PostedJobs } from "./MyJobs/PostedJobs";
import { ClientProfileProject } from "@/app/client-profile/page";
import { ReadyApplications } from "./MyJobs/ReadyApplications";

export const MiddleTabs = ({projects}: {projects: ClientProfileProject[]}) => {
    const [value, setValue] = useState<number>(0)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }
    const labels: {Icon: React.ElementType, title: string, number: number}[] = [
        {Icon: WorkOutlineIcon, title: 'Active Contracts', number: 1},
        {Icon: DescriptionOutlinedIcon, title: 'Posted Jobs', number: 2},
        {Icon: AssignmentTurnedInOutlinedIcon, title: 'Ready Applications', number: 2}
    ]
    return(
        <>
            <Container  sx={{bgcolor: '#F5F5F5', marginBlock: "30px", borderRadius: '3rem', mb: 3}}>
                <Grid>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="fullWidth" //tabs will fill every piece of container
                        TabIndicatorProps={{ style: { display: "none" } }} //hide the line under tab
                        sx={{p: .5, ml: -3, mr: -3}}
                    >
                        {labels.map((label, index) => {
                            const Icon = label.Icon
                            return <Tab
                                key={`label-${index}`}
                                value={index}
                                label={
                                    <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                        <Icon fontSize={'small'} sx={{mt: -1}}/>
                                        {label.title} ({label.number})
                                    </span>
                                }
                                sx={{
                                    textTransform: 'none',
                                    bgcolor: value === index ? 'white' : '',
                                    borderRadius: '3rem',
                                    "&.Mui-selected": {
                                        color: '#1A1A1A'
                                    }
                                }}
                            />
                        })}
                    </Tabs>
                </Grid>
            </Container>
            {value === 0 && <ActiveContracts projects={projects} />}
            {value === 1 && <PostedJobs projects={projects} />}
            {value === 2 && <ReadyApplications projects={projects} />}
        </>
    )
}