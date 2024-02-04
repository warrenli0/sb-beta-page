import orange_fish_right from '../../images/orange_fish_right.png';
import orange_fish_right_text from '../../images/orange_fish_right_text.png';
import orange_fish_left from '../../images/orange_fish_left.png';
import big_orange from '../../images/big_orange_fish_right.png';
import useFadeIn from '../../hooks/useFadeIn';
import { useRef, useState } from "react";

export default function Hook() {
    const divRef = useRef(null);
    useFadeIn(divRef);
    const divRef2 = useRef(null);
    useFadeIn(divRef2);

    const [textOpa, setTextOpa] = useState(0);

    function fishOneSpeak() {
        setTextOpa(1);
        setTimeout(function(){
            setTextOpa(0);
        }, 5000);
    };

    return (
        <div className="hook-page">
            <div className="orange-fish fish1">
                <img src={orange_fish_right} onClick={() => {fishOneSpeak()}} id="orange-fish-right"/>
                <img src={orange_fish_right_text} id="fish1-text" style={{opacity: textOpa}}/>
            </div>
            <div className="orange-fish fish2">
                <img src={orange_fish_right} />
            </div>
            <div className="orange-fish fish3">
                <img src={orange_fish_right} />
            </div>
            <div className="fish4">
                <img src={orange_fish_left} />
            </div>
            <div className="big-orange">
                <img src={big_orange} />
            </div>
            <div className="hook-text">
                <div className="main-hook">
                    <div ref={divRef}>
                        <h1 className='hidden' style={{zIndex: '1'}}>One of our co-founders improved their ACT score from <span style={{color: '#FFD979'}}>31 to 36</span> just by self-studying. You can too!</h1>
                    </div>
                </div>   
                <div ref={divRef2}>
                    <h1 style={{color: '#FFD979', fontWeight: 500, textAlign: 'center', position: 'relative', zIndex: '1'}} className="hidden heres-how">here's how...</h1>
                </div>
            </div>
            <div className="hook-wave"></div>
        </div>
    )
}