import ping_tree from '../../images/peng-on-tree.png';
import SatAct from './SatAct';
import EnterSat from './EnterSat';
import EnterAct from './EnterAct';
import Begin from './Begin';
import { useState, useEffect } from "react";

export default function Choose({}) {

    const [peng_text, setpengText] = useState("Hey there! What test are you preparing for?");
    const [speak, setspeak] = useState("0");
    const [showChoice, setshowChoice] = useState(true);
    const [chooseSATorACT, setchooseSATorACT] = useState('0'); // '1' for SAT, '2' for ACT, // '3' for begin page
    const [showEnterSAT, setshowEnterSAT] = useState(false);
    const [showEnterACT, setshowEnterACT] = useState(false);
    const [showStart, setshowStart] = useState(false);

    
    useEffect(() => {
        //Runs on the first render
        //And any time any dependency value changes
        if (chooseSATorACT == '1') {
            setspeak("reset");
            setpengText("Enter in your current SAT score!");
            setshowEnterSAT(true); // this is where we render in the enter SAT score component
            setTimeout(function(){
                setspeak("1");
            }, 2000);
        } else if (chooseSATorACT == '2') {
            setspeak("reset");
            setpengText("Enter in your current ACT score!");
            setshowEnterACT(true); // ACT
            setTimeout(function(){
                setspeak("1");
            }, 2000);
        } else if (chooseSATorACT == '3') {
            setspeak("reset");
            setpengText("Give it a good attempt!");
            setshowStart(true); // begin page
            setTimeout(function(){
                setspeak("1");
            }, 2000);
        } else if (chooseSATorACT == '4') { // invalid input case for SAT
            setspeak("reset");
            setpengText("Enter a valid score between 200 and 800 each!");
            setTimeout(function(){
                setspeak("1");
            }, 500);
        } else if (chooseSATorACT == '5') { // invalid input case for ACT
            setspeak("reset");
            setpengText("Enter a valid score between 1 and 36 each!");
            setTimeout(function(){
                setspeak("1");
            }, 500);
        } else if (chooseSATorACT == '6') { // time 4 problems
            setspeak("reset");
            setpengText("Have fun :)");
            setTimeout(function(){
                setspeak("2");
            }, 500);
        }
    }, [chooseSATorACT]);

    function SkipButton() {
        if (chooseSATorACT == '0') { // show on choose page
            return (
                <h2 className='start-skip' onClick={() => {setchooseSATorACT('3')}}>Skip for now</h2>
            )
        }
        if (chooseSATorACT != '3') { // show on choose page
            return (
                <h2 className='start-skip' onClick={() => {setchooseSATorACT('3')}}>Skip for now</h2>
            )
        }
    }

    return (
        <div className='start-page'>
            <h1 className='sb-top-right'>SB</h1>
            <div className='start-text'>
                <SatAct showChoice={showChoice} setshowChoice={setshowChoice} setchooseSATorACT={setchooseSATorACT} chooseSATorACT={chooseSATorACT}/>
                <EnterSat showEnterSAT={showEnterSAT} setshowEnterSAT={setshowEnterSAT} chooseSATorACT={chooseSATorACT} setchooseSATorACT={setchooseSATorACT}/>
                <EnterAct showEnterACT={showEnterACT} setshowEnterACT={setshowEnterACT} chooseSATorACT={chooseSATorACT} setchooseSATorACT={setchooseSATorACT}/>
                <Begin showStart={showStart} />
            </div>
            <div className='start-beach'></div>

            <div className='tree-container'>
                <img src={ping_tree} className="coconut-tree"/>
            </div>
            
            <div className='text-container'>
                <div className='typed-out' speak={speak}>
                    {peng_text}
                </div>
            </div>

            <SkipButton />

        </div>
    )

}

