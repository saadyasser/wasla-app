import { TextField } from "./TextField"

//Title & Description
export const Step1 = () => {
    return(
        <>
            <TextField 
                label="Job Title" 
                name="title"
                placeHolder="e.g. Build a responsive website for my business"
            />
            <TextField
                label="Project Description"
                name="description"
                placeHolder="Describe your project in detail. Include objectives, requirements, deliverables, and any specific preferences..."
            />
        </>
    )
}