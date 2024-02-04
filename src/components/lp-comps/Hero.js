import peng from '../../images/cute-hero-penguin.png';
import useFadeIn from '../../hooks/useFadeIn';
import { useRef } from "react";

export default function Hero({setShowTopWave, setshowLandingPage}) {
    const divRef = useRef(null);
    useFadeIn(divRef);

    function waveTime() {
        setShowTopWave(1);
        setTimeout(function(){
            setshowLandingPage(false);
        }, 3000);
    };

    return (
        <div className="hero-page" ref={divRef}>
            <div className="hero-text">
                <div className="hero-centering hidden">
                    <h1>Scholars Beacon</h1>
                    <h2><span style={{color: '#025B9B'}}>Stand out</span> from the crowd — let’s improve your SAT/ACT score!</h2>
                    <h4>Digital SAT {"&"} ACT preparation with analytics-driven learning and a student-powered community</h4>
                    <button onClick={() => waveTime()}>try the beta!</button>
                    <p>learn more below...</p>
                </div>
            </div>
            <img src={peng}/>
            <div className="beach"></div>
        </div>
    )
}