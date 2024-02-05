import './LandingPage.css'
import Hero from './lp-comps/Hero'
import Hook from './lp-comps/Hook';
import ThreePingus from './lp-comps/ThreePingus';
import SbInfo from './lp-comps/SbInfo';
import Bottom from './lp-comps/Bottom';

import { useState } from "react";

export default function LandingPage({setShowTopWave, showLP, setshowLandingPage}) {
    // fade in on scroll : https://www.freecodecamp.org/news/reveal-on-scroll-in-react-using-the-intersection-observer-api/

    if (showLP) {
        return (
            <div>
              <Hero setShowTopWave={setShowTopWave} setshowLandingPage={setshowLandingPage}/>
              <Hook />
              <ThreePingus />
              <SbInfo />
              <Bottom setShowTopWave={setShowTopWave} setshowLandingPage={setshowLandingPage}/>
            </div>
          )
    }
};
  