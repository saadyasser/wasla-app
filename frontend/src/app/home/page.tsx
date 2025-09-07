'use client';

import Header from '@/components/header';

//section1 icons
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import TurnSlightRightOutlinedIcon from '@mui/icons-material/TurnSlightRightOutlined';
import LanguageIcon from '@mui/icons-material/Language';

//section2 icons
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
//people icon imported before
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import { LandingFeatures } from '@/components/LandingFeatures';
import {Container} from '@mui/material';
import {Typography} from '@mui/material';
import {GridLegacy as Grid} from '@mui/material';
interface section {
  icon: React.ReactNode,
  title: string,
  subTitle: string
}

//titles will be changed in future
const section1: section[] = [
  {
    icon: <PeopleAltOutlinedIcon fontSize="medium"/>,
    title: '2,500+',
    subTitle: 'Active Freelancers'
  },
  {
    icon: <WorkOutlineOutlinedIcon fontSize="medium"/>,
    title: '5,000+',
    subTitle: 'Active Freelancers'
  },
  {
    icon: <TurnSlightRightOutlinedIcon fontSize="medium"/>,
    title: '94%',
    subTitle: 'Success Rate'
  },
  {
    icon: <LanguageIcon fontSize="medium"/>,
    title: '50+',
    subTitle: 'Countries Served'
  }
]

const section2: section[] = [
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

export default function Home() {
  return(
    <Grid bgcolor={'white'} height={'100vh'}>
      <Header />
      <Container 
        maxWidth={false} 
        sx={{
          backgroundColor: '#F9FAFB', 
          p: 2
        }}>
        <Container
          sx={{
            display: 'flex', 
            justifyContent: 'space-around', 
            textAlign:'center',
            mt: 1
          }}
        >
          {section1.map(section =>
            <LandingFeatures
              key={`section1-${section.subTitle}`}
              icon={section.icon}
              title={section.title}
              subTitle={section.subTitle}
              sectionNumber={1}
            />
          )}
        </Container>
      </Container>
      <Container 
        maxWidth={false} 
        sx={{
          textAlign: 'center', 
          backgroundColor: '#F9FAFB',
          p: 7,
          //this will be removed soon
          mt: 2
        }}>
        <Typography color="#101828" fontWeight={'bold'} variant='h5'>Why Choose Palestine Work?</Typography>
        <Typography color='#4A5565' variant='subtitle1'>We provide a secure, efficient platform that benefits everyone involved</Typography>
        <Container 
          sx={{
            display: 'flex', 
            justifyContent: 'space-around', 
            textAlign:'center',
            mt: 1
          }}>
          {section2.map(section =>
            <LandingFeatures
              key={`section2-${section.subTitle}`}
              icon={section.icon}
              title={section.title}
              subTitle={section.subTitle}
              sectionNumber={2}
            />
          )}
        </Container>
      </Container>
    </Grid>
  )
}
