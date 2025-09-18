'use client'
import { NavBar } from "./Navbar"
import { Projects } from "./Projects"
import { Settings } from "./Settings"
import { Reviews } from "./Reviews"
import { Container } from "@mui/material"
import { useState } from "react"
import { FreelancerProfile } from "@/types/profile"

export const AllSection2 = ({profile}: {profile: FreelancerProfile | null}) => {
    const [visibleSection, setVisibleSection] = useState<'Projects' | 'Reviews' | 'Settings'>('Projects')
    return(
        <>
            <NavBar visibleSection={visibleSection} setVisibleSection={setVisibleSection}/>
            {   
                <>
                    {visibleSection !== 'Reviews' ?
                        <Container sx={{boxShadow: 2, borderRadius: 5, pt: 3, pb: 3, mb: 4}}>
                            {visibleSection === 'Projects' && profile && <Projects projects={profile.projects}/>}
                            {visibleSection === 'Settings' && profile && <Settings profile={profile}/>}
                        </Container> : <Reviews />
                    }
                </>
            }
        </>
    )
}