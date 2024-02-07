import sat from '../../images/SAT.png';
import act from '../../images/ACT.png';
import { useState, useEffect } from "react";

export default function SatAct({showChoice, setshowChoice, setchooseSATorACT, chooseSATorACT}) {

    // used to trigger the exit animation
    const [exit, setExit] = useState('0');

    function clickSAT() {
        if (exit == '0'){ // in case someone tries to click a couple buttons
            setExit('1'); // triggers animation
            setchooseSATorACT('1');
            setTimeout(function(){
                setshowChoice(false);
            }, 2000);
        }
    };

    useEffect(() => {
        // gotta zoom out
        if (chooseSATorACT == '3') {
            if (exit == '0'){ // in case someone tries to click button again
                setExit('1'); // triggers animation
                setTimeout(function(){
                    setshowChoice(false);
                }, 2000);
            }
        }
    }, [chooseSATorACT]);

    function clickACT() {
        if (exit == '0'){ // in case someone tries to click a couple buttons
            setExit('1'); // triggers animation
            setchooseSATorACT('2');
            setTimeout(function(){
                setshowChoice(false);
            }, 2000);
        }
    };

    if (showChoice) {
        return (
            <div className='choose'>
                <img src={sat} exit={exit} onClick={() => {clickSAT()}}/>
                <img src={act} exit={exit} onClick={() => {clickACT()}}/>
            </div>
        )
    }
}

