import './WaveTransition.css'
import { useState } from "react";

export default function WaveTransition({showTopWave}) {
    // credit to https://codepen.io/tedmcdo/pen/PqxKXg
    //<h1 onClick={() => setWobble(1)}>hello</h1>

    return (
        <div className='out'>
            
            <div className="ocean" wobble={showTopWave}>
                <div className='wave-placeholder'></div>
                <div className='wave'></div>
                <div className='wave2'></div>
                <div className='bottom-wave'>

                </div>
            </div>
        </div>
    )
};
  