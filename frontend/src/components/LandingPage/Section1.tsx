import { Box, Button, Chip, Container, GridLegacy as Grid, Typography } from "@mui/material"
import { ReviewsComment } from "./ReviewsComment"
import SearchIcon from '@mui/icons-material/Search';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { Projects } from "./Projects";

const title = ['Where Palestinian', 'Talent', 'Meets Global', 'Opportunity']

export const Section1 = () => {
    return(
        <Container sx={{pb: 6, pt: 5}}>
            <Grid container spacing={2} alignItems={'center'}>
                <Grid item xs={12} sm={6}>
                    <Chip 
                        sx={{
                            color: '#006633', 
                            bgcolor: '#0066331A', 
                            border: '1px solid #00663333',
                            fontWeight: 'bold',
                            mb: 2
                        }} 
                        label="Supporting Palestinian Talent Worldwide"
                    />
                    {title.map((section, index) =>
                        <Typography 
                            key={`title-sextion-${index}`}
                            sx={{
                                color: index%2 === 0 ? '#101828' : '#006633'}} 
                                variant="h3" 
                                fontWeight={'bold'}
                            >
                                {section}
                        </Typography>
                    )}
                    <Typography sx={{color: '#4A5565'}} mt={2}>
                        Connect with skilled Palestinian freelancers and forward-thinking clients. 
                        Build meaningful projects that create impact while supporting economic empowerment.
                    </Typography>
                    <Box display={'flex'} gap={2} mt={2}>
                        <Button variant="contained" startIcon={<SearchIcon />} sx={{bgcolor: '#006633', color: 'white', textTransform: 'none'}}>Find Talent</Button>
                        <Button variant="contained" startIcon={<WorkOutlineIcon />} sx={{bgcolor: '#FFFFFF', border: '1px solid #006633', color: '#006633', textTransform: 'none'}}>Find Work</Button>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <ReviewsComment />
                    <Projects />
                </Grid>
            </Grid>
        </Container>
    )
}