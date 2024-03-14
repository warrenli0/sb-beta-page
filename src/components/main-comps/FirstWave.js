import React, { useEffect } from "react";
import surfer from '../../images/surfing-peng.png';

export default function FirstWave({showfirstwave, setshowfirstwave, currProblemSet}) {

    useEffect(() => {
        //Runs only on the first render
        setTimeout(function(){
            setshowfirstwave(false);
        }, 6100);
      }, []);

    useEffect(() => {
        if (currProblemSet > 1) {
          setshowfirstwave(true);

          setTimeout(function(){
            setshowfirstwave(false);
        }, 6100);
        }
    }, [currProblemSet]);

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
  