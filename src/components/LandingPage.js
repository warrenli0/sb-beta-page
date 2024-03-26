import './LandingPage.css'
import Hero from './lp-comps/Hero'
import Hook from './lp-comps/Hook';
import ThreePingus from './lp-comps/ThreePingus';
import SbInfo from './lp-comps/SbInfo';
import Bottom from './lp-comps/Bottom';

import { useEffect } from "react";

export default function LandingPage({setShowTopWave, showLP, setshowLandingPage, setWavesFinished, setfirstBetaButton, setshowMission,
  overallEmail, setoverallEmail, overallDis, setoverallDis}) {
    // fade in on scroll : https://www.freecodecamp.org/news/reveal-on-scroll-in-react-using-the-intersection-observer-api/
    
    useEffect(() => {
      //Runs only on the first render
      window.scroll(0,0);
    }, []);

    if (showLP) {
        return (
            <div>
              <Hero setShowTopWave={setShowTopWave} setshowLandingPage={setshowLandingPage} setWavesFinished={setWavesFinished}/>
              <Hook />
              <ThreePingus />
              <SbInfo />
              <Bottom setShowTopWave={setShowTopWave} setshowLandingPage={setshowLandingPage} setWavesFinished={setWavesFinished} 
              setfirstBetaButton={setfirstBetaButton} setshowMission={setshowMission} overallEmail={overallEmail} setoverallEmail={setoverallEmail}
              overallDis={overallDis} setoverallDis={setoverallDis}/>
            </div>
          )
    }
};
  