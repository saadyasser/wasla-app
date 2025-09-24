import { Tabs, Tab, Container, GridLegacy as Grid } from "@mui/material";
import { useState } from "react";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { ActiveContracts } from "./MyJobs/ActiveContracts";
import { PostedJobs } from "./MyJobs/PostedJobs";

export const MiddleTabs = () => {
    const [value, setValue] = useState<number>(0)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }
    const labels: {Icon: React.ElementType, title: string, number: number}[] = [
        {Icon: WorkOutlineIcon, title: 'Active Contracts', number: 1},
        {Icon: DescriptionOutlinedIcon, title: 'Posted Jobs', number: 2}
    ]
    return(
        <>
            <Container sx={{bgcolor: '#F5F5F5', borderRadius: '3rem', mb: 3}}>
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
                                key={`label-${label}`}
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
            {value === 0 && <ActiveContracts />}
            {value === 1 && <PostedJobs />}
        </>
    )
}