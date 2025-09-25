'use client'
import { Tabs, Tab, Container } from "@mui/material";
import React, { useState } from "react";
import { Dashboard } from "./Dashboard/Dashboard";
import { MyJobs } from "./MyJobs/MyJobs";
import { ClientProfileData } from "@/app/client-profile/page";

export const NavBar = ({data}: {data: ClientProfileData}) => {
    const [value, setValue] = useState<number>(0)
    const handleChange = (event: React.SyntheticEvent, newValue: number) =>{ 
        setValue(newValue)
    }
    const labels = ['Dashboard', 'My Jobs']
    return(
        <>
            <Container sx={{bgcolor: 'white'}} maxWidth={false}>
                <Container>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        TabIndicatorProps={{
                            style: {backgroundColor: '#006633'}
                        }}
                    >
                        {labels.map((label, index) =>
                            <Tab
                                key={`tab-${label}`}
                                label={label}
                                value={index}
                                sx={{
                                    textTransform: "none" ,
                                    "&.Mui-selected": {
                                        color: '#006633'
                                    }
                                }}
                            />
                        )}
                    </Tabs>
                </Container>
            </Container>
            <Container>
                {value === 0 && data && <Dashboard data={data} />}
                {value === 1 && data && <MyJobs data={data} />}
            </Container>
        </>
    )
}