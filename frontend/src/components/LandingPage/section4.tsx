import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import {GridLegacy as Grid} from "@mui/material"

import { FeatureType } from '@/types/Feature';
import { Feature } from '@/components/LandingPage/Feature';
import { SectionHeader } from './SectionHeader';
import { Container } from '@mui/material';

const section: FeatureType[] = [
  {
    icon: <ShieldOutlinedIcon fontSize="large"/>,
    title: 'Secure Payments',
    subTitle: 'Milestone-based payments with escrow protection for both clients and freelancers.'
  },
  {
    icon: <PeopleAltOutlinedIcon fontSize="large"/>,
    title: 'Vetted Talent',
    subTitle: 'All freelancers go through a careful screening process to ensure quality.'
  },
  {
    icon: <QueryBuilderOutlinedIcon fontSize="large"/>,
    title: '24/7 Support',
    subTitle: 'Round-the-clock customer support in Arabic and English.'
  },
  {
    icon: <FavoriteBorderOutlinedIcon fontSize="large"/>,
    title: 'Social Impact',
    subTitle: 'Every project contributes to Palestinian economic development.'
  }
]

export const Section4 = () => {
  return(
    <Container maxWidth={false} sx={{backgroundColor: '#F9FAFB'}}>
      <Container
          sx={{
            textAlign: 'center',
            p: 7,
            //this will be removed soon
            mt: 2,
          }}>
              <SectionHeader
                  title = "Why Choose Palestine Work?"
                  subTitle = "We provide a secure, efficient platform that benefits everyone involved"
              />
              <Grid container spacing={2}
                display={'flex'}
                mt={2}
                alignItems={'start'}
              >
                  {section.map(sec =>
                      <Feature
                          key={`section4-${sec.subTitle}`}
                          icon={sec.icon}
                          title={sec.title}
                          subTitle={sec.subTitle}
                          sectionNumber={2}
                      />
                  )}
              </Grid>
        </Container>
    </Container>
  )
}
