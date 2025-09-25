'use client'
import { Header } from "./Header";
import { StepCard } from "./StepCard";
import { Container } from "@mui/material";
import { useState } from "react";

export const PostNewJob = ({token}: {token: string}) => {
    const [step, setStep] = useState<number>(1)
    return(
        <Container maxWidth={'md'} sx={{mt: 4}}>
            <Header step={step}/>
            <StepCard step={step} token={token} updateStep={setStep}/>
        </Container>
    )
}