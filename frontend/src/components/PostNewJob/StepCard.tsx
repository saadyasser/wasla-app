import { Card, CardContent, Button, Box } from "@mui/material"
import { StepTitle } from "./StepTitle"
import { Dispatch, SetStateAction, useState } from "react"
import { useRouter } from "next/navigation"
import { Formik, Form } from "formik"
import { PostNewJob } from "@/types/PostNewJob"
import { Step2 } from "./Step2"
import { Step1 } from "./Step1"
import { Step3 } from "./Step3"
import { removeItem } from "@/lib/storage"
import { FeedbackAlert } from "../FeedbackAlert"
import dayjs from "dayjs"
import { jobValidationSchema } from "@/lib/jobValidator"

type props = {step: number, token: string, updateStep: Dispatch<SetStateAction<number>>}

const initialValues: PostNewJob = {
    "title": '',
    "description": '',
    "budget": '',
    "deadline": dayjs(),
    "experience_level": "Intermediate",
    "skills": []
}

const validationSchema = jobValidationSchema

export const StepCard = ({step, token, updateStep}: props) => {
    const [alertMessage, setAlertMessage] = useState<string>('Post added successfully')
const [alertSeverity, setAlertSeverity] = useState<'error' | 'warning' | 'info' | 'success'>('success')
const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
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
{({setTouched, validateForm, values, resetForm}) => {                        const toggleNext = async() => {
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
                                try {
                                    setIsSubmitting(true)
                                    const payload = {
                                      title: values.title,
                                      description: values.description,
                                      budget: Number(values.budget),
                                      deadline: values.deadline ? dayjs(values.deadline).format('YYYY-MM-DD') : null,
                                      experience_level: values.experience_level.toLowerCase(),
                                      skills: values.skills
                                    }
                                
                                    const res = await fetch('http://127.0.0.1:6565/api/v1/projects', {
                                      method: 'POST',
                                      headers: {
                                        'Content-Type': 'application/json',
                                        // If your API needs auth, uncomment and provide a token:
                                        Authorization: `Bearer ${token}`,
                                      },
                                      body: JSON.stringify(payload)
                                    })
                                
                                    if (!res.ok) {
                                      const msg = await res.text().catch(() => '')
                                      throw new Error(msg || `Failed to post job (${res.status})`)
                                    }
                                
                                    setAlertSeverity('success')
                                    setAlertMessage('Job posted successfully')
                                    setIsFormSubmitted(true)
                                
                                    // cleanup and redirect
                                    removeItem('skills')
                                    removeItem('numOfChar')
                                    resetForm()
                                    setTimeout(() => router.push('/client-profile'), 1000)
                                  } catch (e: any) {
                                    setAlertSeverity('error')
                                    setAlertMessage(e?.message || 'Failed to post job')
                                    setIsFormSubmitted(true)
                                  } finally {
                                    setIsSubmitting(false)
                                  }
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
                                    sx={{ textTransform: 'none', bgcolor: '#006633' }}
                                    variant="contained"
                                    onClick={toggleNext}
                                    disabled={isSubmitting}
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