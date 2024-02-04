import orange_fish_right from '../../images/orange_fish_right.png';
import green_fish from '../../images/green-fish-left.png';
import orange_fish_left from '../../images/orange_fish_left.png';
import big_orange from '../../images/big_orange_fish_right.png';
import repetition_bubble from '../../images/repetition-bubble.png';
import accountability_bubble from '../../images/accountability-bubble.png';
import community_bubble from '../../images/community-bubble.png';
import useFadeIn from '../../hooks/useFadeIn';
import { useRef, useState } from "react";

export default function ThreePingus() {
    const divRef = useRef(null);
    useFadeIn(divRef);
    const divRef2 = useRef(null);
    useFadeIn(divRef2);
    const divRef3 = useRef(null);
    useFadeIn(divRef3);
    const divRef4 = useRef(null);
    useFadeIn(divRef4);
    const divRef5 = useRef(null);
    useFadeIn(divRef5);
    const divRef6 = useRef(null);
    useFadeIn(divRef6);

    return (
        <div className="seaweed-page">
            <div className="orange-fish fish2">
                <img src={orange_fish_right} />
            </div>
            <div className="big-orange">
                <img src={big_orange} />
            </div>
            <div className="green-fish">
                <img src={green_fish} />
            </div>
            <div className="fish4">
                <img src={orange_fish_left} />
            </div>
            <div className="seaweed-text">
                <div className="sea-item sea-repetition-text" ref={divRef}>
                    <div className="sea-header-text hidden">
                        <h1>Repetition</h1>
                        <h3>redo problems until you fully understand</h3>
                    </div>
                </div>
                <div className="sea-item sea-accountability-text" ref={divRef2}>
                    <div className="sea-header-text hidden2">
                        <h1>Accountability</h1>
                        <h3>build a system to solve problems regularly</h3>
                    </div>
                </div>
                <div className="sea-item sea-community-text" ref={divRef3}>
                    <div className="sea-header-text hidden3">
                        <h1>Community</h1>
                        <h3>collaborate and learn with your peers</h3>
                    </div>
                </div>
                <div className="sea-img sea-repetition-bubble" ref={divRef4}>
                    <img src={repetition_bubble} className="hidden seawweedo"/>
                </div>
                <div className="sea-img sea-accountability-bubble" ref={divRef5}>
                    <img src={accountability_bubble} className="hidden2 seawweedo2"/>
                </div>
                <div className="sea-img sea-community-bubble" ref={divRef6}>
                    <img src={community_bubble} className="hidden3 seawweedo3"/>
                </div>
            </div>
            <div className="seaweed-wave"></div>
        </div>
    )
}