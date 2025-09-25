import { 
    Card, 
    Box, 
    Button, 
    Typography, 
    GridLegacy as Grid, 
} from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { ReactNode, useState, useRef } from "react"
import { Formik, Form } from "formik"
import * as Yup from 'yup'
import { FeedbackAlert } from "../FeedbackAlert"
import { FormField } from "./FormField"

const initialValues = {
    coverLetter: '',
    budget: '',
    timeline: '',
    attachment: null,
}

const validationSchema = Yup.object({
    coverLetter: Yup.string().required('Cover letter is required'),
    budget: Yup.number().required('Budget is required'),
    timeline: Yup.string().required('Timeline is required'),
    attachment: Yup.mixed().required("CV is required")
    .test("fileFormat", ("CV format"), (value: any) => 
        value && ["image/png", "image/jpg", "application/pdf"].includes(value.type)
    )
    .test("fileSize", "File size must not exceed 10 MB", (value: any) =>
      value && value.size <= 10 * 1024 * 1024
    )
})

export const ApplyForm = ({accessToken}: {accessToken?: string}): ReactNode => {
    const [showSuccessSubmession, setShowSuccessSubmession] = useState<boolean>(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [fileName, setFileName] = useState<string>("")
    return(
        <Card sx={{p: 3, mb: 3, boxShadow: 2, borderRadius: 3}}>
            <Typography variant="h6" sx={{fontWeight: 'bold', color: '#364153'}} pb={3}>
                Submit Your Proposal
            </Typography>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true)
                    try {
                        const formData = new FormData()
                        formData.append('cover_letter', values.coverLetter)
                        formData.append('budget', String(values.budget))
                        formData.append('timeline', values.timeline)
                        if (values.attachment) {
                            formData.append('attachment', values.attachment as File)
                        }

                        const res = await fetch('http://127.0.0.1:6565/api/v1/projects/16/apply', {
                            method: 'POST',
                            mode: 'cors',
                            headers: {
                                'Authorization': `Bearer ${accessToken}`,
                            },
                            body: formData,
                        })

                        if (!res.ok) {
                            const text = await res.text().catch(() => '')
                            throw new Error(text || `Request failed with status ${res.status}`)
                        }

                        setShowSuccessSubmession(true)
                    } catch (error) {
                        console.error('Failed to submit application:', error)
                        alert('Failed to submit application. Please try again.')
                    } finally {
                        setSubmitting(false)
                    }
                }}
            >
                {({ errors, touched, isSubmitting, setFieldValue, handleChange, handleBlur }) => (
                    <Form>
                        <FormField 
                            label='Cover Letter *'
                            name="coverLetter"
                            placeholder="Describe your approach to this project..."
                            errorCondition={Boolean(touched.coverLetter && errors.coverLetter)}
                            helperTextCondition={errors.coverLetter}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                        />
                        <Typography sx={{ fontWeight: 560, mb: 1, mt: 1.5, color: '#364153' }}>Attachment</Typography>
                        <Box
                            sx={{
                                border: '1px dashed #CBD5E1',
                                borderRadius: 2,
                                p: 3,
                                mb: 2,
                                textAlign: 'center',
                                bgcolor: '#F8FAFC',
                                cursor: 'pointer'
                            }}
                            onClick={()=> fileInputRef.current?.click()}
                        >
                            <input 
                                type="file"
                                ref={fileInputRef}
                                style={{display:'none'}}
                                onChange={(event)=> {
                                    const file = event.currentTarget.files?.[0]
                                    setFieldValue("attachment",file)
                                    if(file) setFileName(file.name)
                                }}
                            />
                            {!fileName ? <div>
                                <CloudUploadIcon sx={{color: '#006633'}} fontSize="large" />
                                <Typography sx={{ mt: 1, color: "#64748B" }}>
                                    Click to upload or drag and drop
                                </Typography>
                                <Typography sx={{ fontSize: 13, color: "#94A3B8" }}>
                                    PDF, JPG, PNG up to 10MB each
                                </Typography>
                            </div>: <Typography>{fileName}</Typography>}
                        </Box>
                        <Typography mb={2} mt={'-.6rem'} sx={{ fontSize: 13, color: "#6A7282" }}>
                            Upload your CV (PDF, JPG, PNG)
                        </Typography>
                        <Grid container spacing={2} sx={{ mb: 3, mt: 3 }}>
                            <Grid item xs={12} sm={6}>
                                <FormField 
                                    label='Your Budget *'
                                    name="budget"
                                    placeholder="500"
                                    errorCondition={Boolean(touched.budget && errors.budget)}
                                    helperTextCondition={errors.budget}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormField 
                                    label='Timeline *'
                                    name="timeline"
                                    placeholder="2 weeks"
                                    errorCondition={Boolean(touched.timeline && errors.timeline)}
                                    helperTextCondition={errors.timeline}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />
                            </Grid>
                        </Grid>
                        <Box justifySelf={'end'}>
                            <Button variant="contained" sx={{bgcolor: '#006633'}} type="submit" disabled={isSubmitting}>
                                Submit Proposal
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
            <FeedbackAlert 
                open={showSuccessSubmession}
                onClose={()=> setShowSuccessSubmession(false)}
                severity="success"
                message="Form Submitted Successfully"
            />
        </Card>
    )
}
