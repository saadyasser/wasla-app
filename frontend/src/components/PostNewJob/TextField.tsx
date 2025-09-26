'use client'
import { TextField as TextFieldMUI, Typography, InputAdornment, Box } from "@mui/material"
import { useState } from "react"
import { useFormikContext } from "formik"
import { PostNewJob } from "@/types/PostNewJob"
import { getItem, setItem } from "@/lib/storage"

type props = {
    label: string,
    name: string, //for formik & yup
    placeHolder: string
}

export const TextField = ({label, name, placeHolder}: props) => {
    const {values, setFieldValue, errors, touched} = useFormikContext<PostNewJob>()
    const checkDescription = label === 'Project Description'
    const [numberOfCharacters, setNumberOfCharacters] = useState<number>(getItem('numOfChar') ?? 0)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(checkDescription){
            setNumberOfCharacters(event.target.value.length)
            setItem('numOfChar', event.target.value.length) //when go to another step -> we want to save the length before that
        }
        setFieldValue(name, event.target.value)
    }
    const length = 500
    return(
        <Box mb={checkDescription ? 0 : 2.5}>
            <Typography fontWeight={'bold'} mb={1}>{label} *</Typography>
            <TextFieldMUI
                variant="outlined"
                multiline={checkDescription}
                name={name}
                rows={6}
                value={values[name as keyof PostNewJob]}
                placeholder={placeHolder}
                fullWidth
                error={Boolean(touched[name as keyof PostNewJob] && errors[name as keyof PostNewJob])}
                helperText={touched[name as keyof PostNewJob] && errors[name as keyof PostNewJob]}
                InputProps={{
                    startAdornment: label === 'Budget Range' && <InputAdornment position="start">$</InputAdornment>,
                }}
                onChange={handleChange}
            />
            {
                checkDescription && 
                <Typography 
                    sx={{color: '#4A5565'}}
                    fontSize={'small'}
                    mt={1}
                    mb={-2}
                >
                    {numberOfCharacters}/{length} characters minimum
                </Typography>
            }
        </Box>
    )
}