import { ChangeEvent, ReactNode, FocusEvent } from "react";
import { Typography, TextField, InputAdornment } from "@mui/material";

type props = {
    label: string
    name: string
    placeholder: string
    errorCondition: boolean
    helperTextCondition: string | undefined,
    handleChange: (e: ChangeEvent<any>) => void,
    handleBlur: (e: FocusEvent<any, Element>) => void
}

export const FormField = ({
    label,
    name,
    placeholder,
    errorCondition,
    helperTextCondition,
    handleChange,
    handleBlur
}: props): ReactNode=> {
    return(
        <>
            <Typography sx={{ fontWeight: 560, mb: 1, color: '#364153' }}>
                {label}
            </Typography>
            <TextField
                name={name}
                placeholder={placeholder}
                multiline={name === 'coverLetter'}
                minRows={name === 'coverLetter' ? 3 : 1}
                fullWidth
                error={errorCondition}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{
                    mb: 3,
                    bgcolor: '#F9FAFB',
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            border: "none"
                        }
                    }
                }}
                InputProps={{
                    //appear this if field name = budget
                    startAdornment: name === 'budget' && <InputAdornment position="start">$</InputAdornment>
                }}
            />
            {errorCondition && helperTextCondition && (
                <Typography sx={{ fontSize: 12, color: '#D32F2F', mt: -2}}>
                    {helperTextCondition}
                </Typography>
            )}
        </>
    )
}