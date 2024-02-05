import orange_fish_right from '../../images/orange_fish_right.png';
import green_fish from '../../images/green-fish-left.png';
import big_orange from '../../images/big_orange_fish_right.png';
import scuba_peng from '../../images/scuba-peng-with-text.png';
import discord_bubble from '../../images/discord-bubble.png';
import smol_bubble from '../../images/small-bubble.png';
import closed_treasure from '../../images/small-closed-treasure.png';
import open_treasure from '../../images/open-treasure-peng-speak.png';
import useFadeIn from '../../hooks/useFadeIn';
import { useRef, useState } from "react";

export default function Bottom({setShowTopWave, setshowLandingPage}) {

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

    const [chestOpa, setChestOpa] = useState(0);
    const [closedchestOpa, setclosedChestOpa] = useState(1);
    const [closedchestpointer, setclosedChestPointer] = useState("pointer");

    function openTreasure() {
        setclosedChestOpa(0);
        setclosedChestPointer("auto");
        setChestOpa(1);
    };

    function waveTime() {
        setShowTopWave(1);
        setTimeout(function(){
            setshowLandingPage(false);
        }, 3000);
    };

    return (
        <div className="ocean-bottom">
            <div className="orange-fish fish2">
                <img src={orange_fish_right} />
            </div>
            <div className="big-orange">
                <img src={big_orange} />
            </div>
            <div className="green-fish">
                <img src={green_fish} />
            </div>
            <div className="ocean-content">
                <div className='ocean-header' ref={divRef}>
                    <h1 className="hidden">Launching in early March! Stay tuned!</h1>
                </div>
                <div className="ocean-img ocean-scuba-png" ref={divRef2} onClick={() => waveTime()}>
                    <img src={scuba_peng} className="hidden scuba-peng seawweedo"/>
                </div>
                <div className="ocean-img ocean-discord" ref={divRef3}>
                    <img src={discord_bubble} className="seawweedo2 discord-bubu hidden2"/>
                    <img src={smol_bubble} className="hidden2 small-bub seawweedo3" id="bub1"/>
                    <img src={smol_bubble} className="hidden2 small-bub seawweedo4" id="bub2"/>
                    <img src={smol_bubble} className="hidden2 small-bub seawweedo5" id="bub3"/>
                    <img src={smol_bubble} className="hidden2 small-bub seawweedo6" id="bub4"/>
                </div>
                <div className="ocean-text five-probs" ref={divRef4}>
                    <h3 className="hidden">5 problems, give it your best shot!</h3>
                </div>
                <div className="ocean-text join-disc" ref={divRef5}>
                    <h3 className="hidden2">join our discord for updates and resources</h3>
                </div>
            </div>
            <div className="ocean-bottom-beach"></div>
            <img src={closed_treasure}  style={{opacity: closedchestOpa, cursor: closedchestpointer}} onClick={() => {openTreasure()}} id="closed-treasure"/>
            <img src={open_treasure} style={{opacity: chestOpa}} id="open-treasure"/>
            <p id="ocean-footer-text">Copyright @ 2024 Scholars Beacon | Contact: scholarsbeacon@gmail.com</p>
        </div>
    )
}