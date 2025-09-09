import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import TurnSlightRightOutlinedIcon from '@mui/icons-material/TurnSlightRightOutlined';
import LanguageIcon from '@mui/icons-material/Language';

import { FeatureType } from '@/types/Feature';
import { Feature } from '@/components/LandingPage/Feature';
import { Container } from '@mui/material';

//these titles are temporary -- titles will be dynamic
const section: FeatureType[] = [
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

export const Section2 = () => {
    return(
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
          {section.map(sec =>
            <Feature
              key={`section2-${sec.subTitle}`}
              icon={sec.icon}
              title={sec.title}
              subTitle={sec.subTitle}
              sectionNumber={1}
            />
          )}
        </Container>
      </Container>
    )
}