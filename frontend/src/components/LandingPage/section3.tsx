import { Container } from "@mui/material"
import { SectionHeader } from "./SectionHeader"
import { Card, CardContent, CardActions, Button, Typography } from "@mui/material"
import { FeatureType } from "@/types/Feature"
import {GridLegacy as Grid} from "@mui/material"
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

//temporary data ---> it will be changed soon
const section: FeatureType[] = [
  {
    icon: <LaptopMacIcon fontSize="large"/>,
    title: 'Web Development',
    subTitle: '150+ jobs'
  },
  {
    icon: <LaptopMacIcon fontSize="large"/>,
    title: 'Web Development',
    subTitle: '150+ jobs'
  },
  {
    icon: <LaptopMacIcon fontSize="large"/>,
    title: 'Web Development',
    subTitle: '150+ jobs'
  },
  {
    icon: <LaptopMacIcon fontSize="large"/>,
    title: 'Web Development',
    subTitle: '150+ jobs'
  },
  {
    icon: <LaptopMacIcon fontSize="large"/>,
    title: 'Web Development',
    subTitle: '150+ jobs'
  },
  {
    icon: <LaptopMacIcon fontSize="large"/>,
    title: 'Web Development',
    subTitle: '150+ jobs'
  }
]

export const Section3 = () => {
    return(
        <Container sx={{textAlign: 'center', p: 3}}>
            <SectionHeader 
                title="Browse Popular Categories"
                subTitle="Find skilled professionals across all major industries and skills"
            />
            <Grid container spacing={3} mt={1} sx={{textAlign: 'start'}}>
                {section.map((sec, index) =>
                    <Grid item xs={12} sm={6} md={4} key={`category-${index}`}>
                        <Card
                            sx={{
                                border: '1.4px solid #E5E7EB',
                                borderRadius: 2,
                                boxShadow: 'none'
                            }}
                        >
                            <CardContent>
                                <Grid container alignContent={'center'}>
                                    <Grid item xs={2}>{sec.icon}</Grid>
                                    <Grid item xs={10}>
                                        {sec.title}
                                        <br />
                                        <Typography variant="body2" color='#4A5565'>{sec.subTitle}</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                {/* this will go to category jobs in the future */}
                                <Button color="success">Explore Jobs <ArrowRightAltIcon /></Button>
                            </CardActions>
                        </Card>
                    </Grid>
                )}
            </Grid>
        </Container>
    )
}