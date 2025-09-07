'use client';
import {GridLegacy as Grid} from '@mui/material';
import Header from '@/components/header';
import { Section2 } from '@/components/LandingPage/section2';
import { Section3 } from '@/components/LandingPage/section3';
import { Section4 } from '@/components/LandingPage/section4';

export default function Home() {
  return(
    <Grid bgcolor={'white'} height={'100vh'}>
      <Header />
      <Section2 />
      <Section3 />
      <Section4 />
    </Grid>
  )
}
