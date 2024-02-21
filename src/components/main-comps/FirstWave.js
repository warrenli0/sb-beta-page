import React, { useEffect } from "react";
import surfer from '../../images/surfing-peng.png';

export default function FirstWave({showfirstwave, setshowfirstwave}) {

    useEffect(() => {
        //Runs only on the first render
        setTimeout(function(){
            setshowfirstwave(false);
        }, 6100);
      }, []);

    if (showfirstwave) {
        return (
            <div className='first-wave-out'>

                <div className='first-wave-container'>
                    <div className='first-wave'></div>
                    <div className='first-wave-bottom'></div>
                    <img src={surfer} className="cool-peng"/>
                </div>

                <div className='surf-wave-container'>
                    <div className='surf-wave'></div>
                </div>
            </div>
        )
    } 
};
  