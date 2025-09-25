'use client'
import { Header } from "./Header";
import { StepCard } from "./StepCard";
import { Container } from "@mui/material";
import { useState } from "react";

export const PostNewJob = () => {
    const [step, setStep] = useState<number>(1)
    return(
        <Container maxWidth={'md'} sx={{mt: 4}}>
            <Header step={step}/>
            <StepCard step={step} updateStep={setStep}/>
        </Container>
    )
}