import orange_fish_right from '../../images/orange_fish_right.png';
import green_fish from '../../images/green-fish-left.png';
import big_orange from '../../images/big_orange_fish_right.png';
import discord_bubble from '../../images/discord-bubble.png';
import smol_bubble from '../../images/small-bubble.png';
import closed_treasure from '../../images/small-closed-treasure.png';
import open_treasure from '../../images/open-treasure-peng-speak.png';
import book_bubble from '../../images/bubble-book-peng.png';
import grad_bubble from '../../images/bubble-grad-peng.png';
import useFadeIn from '../../hooks/useFadeIn';
import { useEffect, useRef, useState } from "react";

export default function Bottom({setShowTopWave, setshowLandingPage, setWavesFinished, setfirstBetaButton, setshowMission, overallEmail, setoverallEmail,
    overallDis, setoverallDis}) {

    const divRef = useRef(null);
    useFadeIn(divRef);
    const divRef2 = useRef(null);
    useFadeIn(divRef2);
    const divRef3 = useRef(null);
    useFadeIn(divRef3);
    const divRef4 = useRef(null);
    useFadeIn(divRef4);

    const [chestOpa, setChestOpa] = useState(0);
    const [closedchestOpa, setclosedChestOpa] = useState(1);
    const [closedchestpointer, setclosedChestPointer] = useState("pointer");
    const [email, setEmail] = useState("");
    const [dis, setdis] = useState("");
    const [emMsg, setemMsg] = useState("Know when we release:");

    function openTreasure() {
        setclosedChestOpa(0);
        setclosedChestPointer("auto");
        setChestOpa(1);
    };

    function waveTime() {
        setfirstBetaButton(false); // bottom beta button clicked
        setWavesFinished(false);
        setShowTopWave(1);
        setTimeout(function(){
            setshowLandingPage(false);
        }, 3000);
    };

    function missionTime() {
        setWavesFinished(false); // trigger the wave
        setShowTopWave(1); // indicates to c
        setTimeout(function(){
            setshowMission(true); // show mission page
            window.scrollTo(0, 0);
            setshowLandingPage(false);
        }, 2500);
    };

    async function submitEmail() {
        const ele = document.getElementById("user_email");
        if (ele.validity.valid && dis!="disabled" && ele.value != "") {
            //console.log("valid,", email);
            setoverallDis("disabled");
            setemMsg("Thank you — we will be in touch soon!");
            setoverallEmail(ele.value);
            //WAR: email is var with user email

            const data = {
                email: ele.value,
            };
    
            try {
                const response = await fetch('https://sbapidev.com/submit-email', { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
        
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
        
                const responseData = await response.json();
                // console.log(responseData.message);
        
            } catch (error) {
                // console.error('There was a problem with the fetch operation:', error);
            }
        }
    };

    useEffect(() => {
        //Runs only on the first render

        const inputField = document.getElementById("user_email");
        inputField.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                // Call your function here
                submitEmail();
            }
        });
      }, []);

      useEffect(() => {

        setEmail(overallEmail);
      }, [overallEmail]);

      useEffect(() => {

        setdis(overallDis);
      }, [overallDis]);

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
                    <h1 className="hidden">Launching in May! Stay tuned!</h1>
                    <h3 className="hidden">let's achieve your dream score.</h3>
                </div>
                <div className="ocean-img ocean-scuba-png" ref={divRef2}>
                    <img src={book_bubble} className="hidden scuba-peng seawweedo"/>
                    <div className='hidden'>
                        <h2 className='ocean-button' onClick={() => waveTime()}>Try Our Beta</h2>
                    </div>
                </div>
                <div className="ocean-img ocean-scuba-png grad-peng" ref={divRef3}>
                    <img src={grad_bubble} className="hidden2 scuba-peng seawweedo2"/>
                    <div className='hidden2'>
                        <h2 className='ocean-button' onClick={() => missionTime()}>Our Mission</h2>
                    </div>
                </div>
                <div className="ocean-text five-probs" ref={divRef4}>
                    <h2 className="hidden">{emMsg}</h2>
                    <input className="hidden" disabled={dis} type="email" id="user_email" value={email} placeholder="Your email" onChange={(e) => setEmail(e.target.value)}></input>
                    <div className="hidden"> 
                        <h4 className="ocean-submit" dis={dis} onClick={() => submitEmail()}>Submit</h4>
                    </div>
                </div>
            </div>
            <div className="ocean-bottom-beach"></div>
            <img src={closed_treasure}  style={{opacity: closedchestOpa, cursor: closedchestpointer}} onClick={() => {openTreasure()}} id="closed-treasure"/>
            <img src={open_treasure} style={{opacity: chestOpa}} id="open-treasure"/>
            <p id="ocean-footer-text">Copyright @ 2024 Scholars Beacon | Contact: scholarsbeacon@gmail.com</p>
        </div>
    )
}
