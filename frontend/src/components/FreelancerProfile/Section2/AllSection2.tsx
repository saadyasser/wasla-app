'use client'
import { NavBar } from "./Navbar"
import { Projects } from "./Projects"
import { Settings } from "./Settings"
import { Reviews } from "./Reviews"
import { Container } from "@mui/material"
import { useState } from "react"
import { FreelancerProfile } from "@/types/profile"

export const AllSection2 = ({profile, token}: {profile: FreelancerProfile | null, token?: string}) => {
    const [visibleSection, setVisibleSection] = useState<'Projects' | 'Reviews' | 'Settings'>('Projects')
    console.log(profile, 'Settings')
    return(
        <div id="section2">
            <NavBar visibleSection={visibleSection} setVisibleSection={setVisibleSection}/>
            {   
                <>
                    {visibleSection !== 'Reviews' ?
                        <Container sx={{boxShadow: 2, borderRadius: 5, pt: 3, pb: 3, mb: 4}}>
                            {visibleSection === 'Projects' && profile &&   (    profile.projects.length > 0 ? <Projects projects={profile.projects}/> : <p className="text-center text-gray-500 text-sm">No projects found</p>)}
                            {visibleSection === 'Settings' && profile && <Settings profile={profile} token={token}/>}
                        </Container> : <Reviews />
                    }
                </>
            }
        </div>
    )
}