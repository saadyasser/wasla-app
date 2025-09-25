import StarIcon from '@mui/icons-material/Star';
import { Box, Card, CardContent, Grid, Typography, Chip, Container } from '@mui/material';

//temporary data
const reviews = [
    {
        client: 'Palestinian Heritage Company',
        completed: new Date(2024, 1, 15),
        stars: 5,
        description: 'Comprehensive e-commerce platform showcasing Palestinian products with integrated payment solutions and international shipping.',
        project: 'Palestinian E-commerce Platform',
        budget: 3500
    },
    {
        client: 'Palestinian Heritage Company',
        completed: new Date(2024, 1, 15),
        stars: 5,
        description: 'Comprehensive e-commerce platform showcasing Palestinian products with integrated payment solutions and international shipping.',
        project: 'Palestinian E-commerce Platform',
        budget: 3500
    }
]

//temporary
const evaluation = 4
const reviewsNumber = 47

export const Reviews = () => {
    return(
        <>
            <Container sx={{display: 'grid', mb: 5, textAlign: 'center'}}>
                <Card>
                    <CardContent sx={{p: 2}}>
                        <Typography sx={{color: '#006633'}} variant='h3'><b>{evaluation}</b></Typography>
                        <Box display={'flex'} justifySelf={'center'}>
                            {new Array(evaluation).fill(0).map((x, index) =>
                                <StarIcon key={`review-star-${index}`} fontSize="medium" sx={{color: '#FCC800'}}/>
                            )}
                        </Box>
                        <Typography color='textSecondary'>Based on {reviewsNumber} reviews</Typography>
                    </CardContent>
                </Card>
            </Container>
            {reviews.map((review, index) =>
                <Container key={`review-${index}`} sx={{mb: 5}}>
                    <Card>
                        <CardContent>
                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={2}>
                                <Box display={'flex'} gap={2}>
                                    <Typography
                                        bgcolor={'#006633'}
                                        fontSize={'large'}
                                        width={'25%'}
                                        height={'50%'}
                                        borderRadius={10}
                                        sx={{color: 'white'}}
                                        textAlign={'center'}
                                        lineHeight={3}
                                    >
                                        {review.client[0]}
                                    </Typography>
                                    <Grid display={'grid'}>
                                        <b>{review.client}</b>
                                        <Typography color='textDisabled' fontSize={'small'}>{review.completed.toDateString()}</Typography>
                                    </Grid>
                                </Box>
                                <Box display={'flex'}>
                                    {new Array(review.stars).fill(0).map((x, index) =>
                                        <StarIcon key={`reviewStar-${index}`} fontSize="small" sx={{color: '#FCC800'}}/>
                                    )}
                                </Box>
                            </Box>
                            <Typography color='textSecondary' mb={2}><em>{`"${review.description}"`}</em></Typography>
                            <Box display={'flex'} gap={1} flexWrap={'wrap'}>
                                <Chip label={`Project: ${review.project}`}/>
                                <Chip label={`Budget: $${review.budget}`}/>
                            </Box>
                        </CardContent>
                    </Card>
                </Container>
            )}
        </>
    )
}