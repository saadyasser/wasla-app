'use client'
import { PostNewJob } from "@/types/PostNewJob"
import { TextField } from "./TextField"
import { GridLegacy as Grid, Typography, Select, MenuItem } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useFormikContext } from "formik"

//Budget, Experience level & Deadline
export const Step3 = () => {
    const {values, setFieldValue, errors, touched} = useFormikContext<PostNewJob>()
    return(
        <>
            <TextField label="Budget Range" name="budget" placeHolder="500-1000"/>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography fontWeight={'bold'} mb={1}>Project Duration *</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                            value={values.deadline} 
                            slotProps={{
                                textField: { 
                                    fullWidth: true,
                                    error: Boolean(touched.deadline && errors.deadline),
                                    helperText: touched.deadline && errors.deadline
                                }
                            }}
                            onChange={(newValue)=> setFieldValue('deadline', newValue)}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography fontWeight={'bold'} mb={1}>Experience Level *</Typography>
                    <Select 
                        fullWidth 
                        value={values.experience_level} 
                        name="experience_level"
                        error={Boolean(touched.experience_level && errors.experience_level)}
                        onChange={(e)=> setFieldValue('experience_level', e.target.value)}
                    >
                        <MenuItem value={'Intermediate'}>Intermediate</MenuItem>
                        <MenuItem value={'Expert'}>Expert</MenuItem>
                    </Select>
                    {
                        errors.experience_level && touched.experience_level && (
                            <Typography color="error" fontSize="small">{errors.experience_level}</Typography>
                        )
                    }
                </Grid>
            </Grid>
        </>
    )
}