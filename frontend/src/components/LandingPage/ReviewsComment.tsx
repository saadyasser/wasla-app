import { Box, Card, CardContent, Chip, Grid, Rating, Typography } from "@mui/material"

//just 2 
const reviewrs = [{
    id: 1,
    name: "Sara A.",
    career: "Web Developer",
    comment: "Found my dream project in just 2 days!"
},
{
    id: 2,
    name: "Omer K.",
    career: "Designer",
    comment: "Excellent clients, timely payments!"
}]

const splitReview1 = reviewrs[0].name.split(" ")
const photo1 = splitReview1[0][0] + splitReview1[1][0]
const splitReview2 = reviewrs[1].name.split(" ")
const photo2 = splitReview2[0][0] + splitReview2[1][0]

export const ReviewsComment = () => {
    return(
        <Grid display={'flex'} gap={2}>
            {reviewrs.map(review =>{
                const photo = review.id === 1 ? photo1 : photo2
                return( 
                    <Card 
                        key={`landing-page-review-${review.id}`} 
                        sx={{
                            transform: review.id === 1 ? 'rotate(-4deg)' : 'rotate(2deg) translateY(14px)', 
                            boxShadow: 0, 
                            border: '1px solid #E5E7EB',
                            borderRadius: '1rem'
                        }}>
                        <CardContent>
                            <Grid>
                                <Box display={'flex'} gap={1} alignItems={'center'} mb={1}>
                                    <Chip 
                                        label={`${photo}`} 
                                        sx={{
                                            height: '3rem', 
                                            width: '3rem', 
                                            borderRadius: '5rem', 
                                            fontSize: '1rem'
                                        }}/>
                                    <Grid>
                                        <Typography>{review.name}</Typography>
                                        <Typography sx={{color: '#4A5565'}} fontSize="small">{review.career}</Typography>
                                    </Grid>
                                </Box>
                                <Typography mb={1} fontSize={'small'} sx={{color: '#364153'}}>{`"${review.comment}"`}</Typography>
                                <Rating value={5} size="small"/>
                            </Grid>
                        </CardContent>
                    </Card>
                )
            })}
        </Grid>
    )
} 