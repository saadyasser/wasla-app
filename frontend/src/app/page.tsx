'use client';
import {GridLegacy as Grid} from '@mui/material';
import { Section1 } from '@/components/LandingPage/Section1';
import { Section2 } from '@/components/LandingPage/section2';
import { Section3 } from '@/components/LandingPage/section3';
import { Section4 } from '@/components/LandingPage/section4';
import { Footer } from '@/components/LandingPage/Footer';

export default function Home() {
  return(
    <Grid bgcolor={'white'} height={'100%'}>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Footer />
    </Grid>
  )
}
