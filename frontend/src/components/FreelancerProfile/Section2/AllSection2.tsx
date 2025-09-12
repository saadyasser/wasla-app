'use client'
import { NavBar } from "./Navbar"
import { Projects } from "./Projects"
import { Settings } from "./Settings"
import { Reviews } from "./Reviews"
import { Container } from "@mui/material"
import { useState } from "react"

export const AllSection2 = () => {
    const [visibleSection, setVisibleSection] = useState<'Projects' | 'Reviews' | 'Settings'>('Projects')
    return(
        <>
            <NavBar visibleSection={visibleSection} setVisibleSection={setVisibleSection}/>
            {   
                <>
                    {visibleSection !== 'Reviews' ?
                        <Container sx={{boxShadow: 2, borderRadius: 5, pt: 3, pb: 3, mb: 4}}>
                            {visibleSection === 'Projects' && <Projects />}
                            {visibleSection === 'Settings' && <Settings />}
                        </Container> : <Reviews />
                    }
                </>
            }
        </>
    )
}