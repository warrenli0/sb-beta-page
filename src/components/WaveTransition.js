import './WaveTransition.css'
import peng from '../images/ping-bubble.png';

import { useEffect } from "react";

export default function WaveTransition({showTopWave, wavesFinished, setWavesFinished, setShowTopWave}) {
    // credit to https://codepen.io/tedmcdo/pen/PqxKXg
    //<h1 onClick={() => setWobble(1)}>hello</h1>

    useEffect(() => {
        // turn off waves    
        if (showTopWave == 1) {
            //console.log('waves coming!', Math.floor(Date.now() / 1000));
            setTimeout(() => {
                setWavesFinished(true);
                //console.log('waves gone!', Math.floor(Date.now() / 1000));
                setShowTopWave(0);
            }, 5000);
        }
      }, [showTopWave]);

    if (!wavesFinished) {
        return (
            <div className='out'>
    
                <div wobble={showTopWave} className='wave1-container'>
                    <div className='wave1'></div>
                    <div className='wave1-bottom'></div>
                </div>
    
                <div wobble={showTopWave} className='wave2-container'>
                    <div className='wave2'></div>
                    <div className='wave2-bottom'></div>
                </div>
                
                <div wobble={showTopWave} className='wave3-container'>
                    <div className='wave3'></div>
                    <div className='wave3-bottom'></div>
                </div>
    
                <div wobble={showTopWave} className='wave4-container'>
                    <div className='wave4'></div>
                    <div className='wave4-bottom'></div>
    
                    <img src={peng} id="peng" wobble={showTopWave}/>
                </div>
    
            </div>
        )
    }

};
  