import * as Yup from 'yup'

export const jobValidationSchema = Yup.object({
    "title": Yup.string().required('Enter Job Title'),
    "description": Yup.string().required('Enter Description').min(500),
    "budget": Yup.string().required('Enter Budget'),
    "deadline": Yup.string().required('Enter deadline'),
    "experience_level": Yup.string().required('Select experience level'),
    "skills": Yup.array().min(1, 'Select at least one option')
})