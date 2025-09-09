import SettingsIcon from "@mui/icons-material/Settings"
import { Container, Box, Typography, Chip, TextField } from "@mui/material"
import { GridLegacy as Grid } from "@mui/material"

//every data is temporary
const fields = [
    { label: "Full Name", value: "Ahmad Mohammad Al-Saadi" },
    { label: "Professional Title", value: "Full-Stack Developer & Mobile App Developer" },
    { label: "Location", value: "Gaza, Palestine" },
    { label: "Email", value: "ahmad.alsaadi@email.com" },
    { label: "Phone Number", value: "+970 59 123 4567" },
    { label: "Website", value: "www.ahmaddev.ps" },
    { label: "Hourly Rate", value: "$25-35" },
    //maybe will be menu
    { label: "Availability", value: "Available" },
    { label: "Bio", value: "Passionate full-stack developer specializing in React and Node.js with 5+ years of experience building web applications and mobile solutions. Committed to delivering innovative technical solutions that serve the Palestinian and Arab community."}
]

export const Settings = ()=> {
    return(
        <Container sx={{boxShadow: 2, borderRadius: 5, pt: 3, pb: 3, mb: 4}}>
            <Box sx={{
                display: 'flex',
                gap: .5,
                color: 'black'
            }}>
                <SettingsIcon fontSize="small" color="success"/>
                <Typography fontSize={'small'}>Account Settings</Typography>
            </Box>
            <Typography pt={3} pb={1} sx={{color: 'black'}}><b>Profile Information</b></Typography>
            <Grid container spacing={2}>
                {fields.map(({label, value}) => 
                    <Grid 
                        key={`${label}-input`} 
                        item xs={label == "Bio" ? 12 : 6} 
                        display={'grid'}
                    >
                        <Chip label={label} variant="outlined" sx={{border: 'none', justifySelf: 'start', fontWeight: 'bold'}}/>
                        <TextField 
                            value={value} 
                            size="small" 
                            multiline
                            sx={{ 
                                bgcolor: '#F9FAFB', 
                                "& .MuiOutlinedInput-notchedOutline": {
                                    border: "none"
                                }
                            }} 
                            inputProps={{ style: { fontSize: 13 } }}
                        />
                    </Grid>
                )}
            </Grid>
        </Container>
    )
}