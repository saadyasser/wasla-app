import { Card, CardContent, Button, Box } from "@mui/material"
import { StepTitle } from "./StepTitle"
import { Dispatch, SetStateAction, useState } from "react"
import { useRouter } from "next/navigation"
import { Formik, Form } from "formik"
import * as Yup from 'yup'
import { PostNewJob } from "@/types/PostNewJob"
import { Step2 } from "./Step2"
import { Step1 } from "./Step1"
import { Step3 } from "./Step3"
import { removeItem } from "@/lib/storage"
import { FeedbackAlert } from "../FeedbackAlert"
import dayjs from "dayjs"

type props = {step: number, updateStep: Dispatch<SetStateAction<number>>}

const initialValues: PostNewJob = {
    "title": '',
    "description": '',
    "budget": '',
    "deadline": dayjs(),
    "experience_level": "Intermediate",
    "skills": []
}

const validationSchema = Yup.object({
    "title": Yup.string().required('Enter Job Title'),
    "description": Yup.string().required('Enter Description').min(500),
    "budget": Yup.string().required('Enter Budget'),
    "deadline": Yup.string().required('Enter deadline'),
    "experience_level": Yup.string().required('Select experience level'),
    "skills": Yup.array().min(1, 'Select at least one option')
})

export const StepCard = ({step, updateStep}: props) => {
    const router =useRouter()
    const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false)
    return(
        <Card sx={{p: 5}}>
            <CardContent>
                <StepTitle step={step}/>
                <Formik 
                    initialValues={initialValues} 
                    validationSchema={validationSchema} 
                    onSubmit={(values)=> console.log(values)}
                >
                    {({setTouched, validateForm}) => {
                        const toggleNext = async() => {
                            const errors = await validateForm()
                            if(step === 1){
                                console.log(step)
                                setTouched({
                                    title: true,
                                    description: true
                                })
                                if(errors.title || errors.description) return
                            }else if(step === 2){
                                setTouched({skills: true})
                                if(errors.skills) return
                            }else{
                                setTouched({
                                    budget: true,
                                    experience_level: true,
                                    deadline: true
                                })
                                if(errors.budget || errors.deadline || errors.experience_level) return
                            }
                            if(step === 3){ //post new job was clicked
                                removeItem('skills')
                                removeItem('numOfChar')
                                setIsFormSubmitted(true)
                                setTimeout(()=> router.push('/client-profile'), 1000)
                            }
                            else updateStep(old => old+1)
                        }
                        return(
                            <Form>
                                {step === 1 && <Step1 />}
                                {step === 2 && <Step2 />}
                                {step === 3 && <Step3 />}
                                <Box display={'flex'} mt={4} justifyContent={step > 1 ? 'space-between' : 'end'} width={'100%'}>
                                    {
                                        step > 1 &&
                                        <Button
                                            sx={{textTransform: 'none', bgcolor: '#006633'}}
                                            variant="contained"
                                            onClick={()=> updateStep(old => old-1)}
                                        >
                                            Previous Step
                                        </Button>
                                    }
                                    <Button
                                        sx={{textTransform: 'none', bgcolor: '#006633'}}
                                        variant="contained"
                                        onClick={toggleNext}
                                    >
                                        {step === 3 ? 'Post Job' : 'Next Step'}
                                    </Button>
                                </Box>
                            </Form>
                        )
                    }}
                </Formik>
                <FeedbackAlert 
                    open={isFormSubmitted}
                    onClose={()=> setIsFormSubmitted(false)}
                    severity="success"
                    message="Post added successfully"
                />
            </CardContent>
        </Card>
    )
}