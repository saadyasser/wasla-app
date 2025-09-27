'use client'
import { Button, Container, Box, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import { Dispatch, SetStateAction, useState } from "react"
import { Form, Formik } from "formik"
import { FeedbackAlert } from "@/components/FeedbackAlert"
import { Step2 } from "@/components/PostNewJob/Step2"
import { Step3 } from "@/components/PostNewJob/Step3"
import { Step1 } from "@/components/PostNewJob/Step1"
import { PostNewJob } from "@/types/PostNewJob"
import { jobValidationSchema } from "@/lib/jobValidator"

//these initial values you need to change it to contain job that was clicked to edit
//like 'title': job.title / description: job.description
const initialValues: PostNewJob = {
    "title": 'Mobile App for Food Delivery',
    "description": 'Works on mobile or cross-platform apps but with strong frontend skills (React Native, Expo, or Flutter for web).',
    "budget": '500',
    "deadline": null,
    "experience_level": "Intermediate",
    "skills": ['PHP', 'Laravel']
}

const validationSchema = jobValidationSchema

type props ={isEditClicked: boolean, setIsEditClicked: Dispatch<SetStateAction<boolean>>}

//you need to pass post id prop
export const EditFormDialog = ({isEditClicked, setIsEditClicked}: props) => {
    const [isSuccessSubmitted, setIsSuccessSubmitted] = useState<boolean>(false)
    const [isFailedSubmitted, setIsFailedSubmitted] = useState<boolean>(false)

    const handleSubmit = () => {
        try{
            setIsSuccessSubmitted(true) //to show success feedback alert
            //save edits for this project in db
            //.................
        }catch(error){
            setIsFailedSubmitted(true) //to show error feedback alert
        }
        setIsEditClicked(false) //to close form dialog
    }
    
    return(      
        <>     
            <Dialog open={isEditClicked} onClose={()=> setIsEditClicked(false)}>
                <DialogTitle><b>Edit Job Details</b></DialogTitle>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <>
                                <DialogContent>
                                    <Container>
                                        <Form id="edit-job-form">
                                            <Box mb={4}><Step1 /></Box>
                                            <Box mb={3}>
                                                <Typography><b>Skills *</b></Typography>
                                                <Step2 />
                                            </Box>
                                            <Box mb={3}><Step3 /></Box>
                                        </Form>
                                   </Container>
                                </DialogContent>
                                <DialogActions sx={{ p: 2 }}>
                                    <Button
                                        sx={{ textTransform: 'none', bgcolor: '#006633' }}
                                        type="submit"
                                        form="edit-job-form" //linked to the form
                                        variant="contained"
                                        disabled={isSubmitting}
                                    >
                                        Save Changes
                                    </Button>
                                    <Button
                                        sx={{ textTransform: 'none' }}
                                        variant="contained"
                                        color="error"
                                        onClick={() => setIsEditClicked(false)}
                                        disabled={isSubmitting}
                                    >
                                              Cancel
                                    </Button>
                                </DialogActions>
                            </>
                        )}
                    </Formik>
            </Dialog>
            <FeedbackAlert 
                open={isSuccessSubmitted} 
                onClose={()=> setIsSuccessSubmitted(false)} 
                severity="success" 
                message="Job Edited Successfully"
            />
            <FeedbackAlert 
                open={isFailedSubmitted} 
                onClose={()=> setIsFailedSubmitted(false)} 
                severity="error" 
                message="Fail To Edit Job"
            />
        </>
    )
}