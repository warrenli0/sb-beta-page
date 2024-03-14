import math from '../../images/sat-math.png';
import english from '../../images/sat-english.png';
import { useState } from "react";

export default function EnterSat({showEnterSAT, setshowEnterSAT, chooseSATorACT, setchooseSATorACT, setSatScores, setsatWeightage}) {

    const [exit, setExit] = useState('0'); // used to trigger the exit animation
    const [validMath, setvalidMath] = useState('0'); // used to trigger shake
    const [validEnglish, setvalidEnglish] = useState('0');
    const [mathScore, setmathScore] = useState("");
    const [englishScore, setenglishScore] = useState("");

    if (chooseSATorACT == '3') { //skip condition
        if (exit == '0'){ // in case someone tries to click a couple buttons
            setExit('1'); // triggers animation
            setTimeout(function(){
                setshowEnterSAT(false);
            }, 2000);
        }
    }

    function contSAT() {
        var eng = englishScore;
        var mat = mathScore;
        var c = 0;
        // +eng converts to num
        if ((eng == null || eng == "") || (isNaN(eng)) || (+eng > 800) || (+eng < 200)){
            setvalidEnglish('1'); // shake input to indicate failed input
            c += 1;
            setTimeout(function(){
                setvalidEnglish("0");
            }, 1500);
        } 
        if ((mat == null || mat == "") || (isNaN(mat)) || (+mat > 800) || (+mat < 200)){
            setvalidMath('1');
            c+=1;
            setTimeout(function(){
                setvalidMath("0");
            }, 1500);
        }
        if (c>0) { // trigger ping error message
            if (chooseSATorACT != '4')
            {
                setchooseSATorACT('4')
            }
        } else { // next page
            if (exit == '0'){ // in case someone tries to click a couple buttons
                setSatScores([+eng, +mat]); // update scores
                // set weightages
                eng = +eng;
                mat = +mat;
                var mathWeight = 50;
                var englishWeight = 50;

                if (eng > mat) {
                    var dif = eng - mat;
                    dif = Math.floor(dif/50);
                    dif = Math.min(dif, 6)  //max diff is 300 -> 80:20 -> 6 iterations of 5%
                    englishWeight = 50 - (dif*5);
                    mathWeight = 50 + (dif * 5);
                } else if (eng < mat) {
                    var dif = mat - eng;
                    dif = Math.floor(dif/50);
                    dif = Math.min(dif, 6)  //max diff is 300 -> 80:20 -> 6 iterations of 5%
                    englishWeight = (50 + (dif*5));
                    mathWeight = (50 - (dif*5));
                }

                setsatWeightage([englishWeight/2, englishWeight/2, mathWeight/2, mathWeight/2]);
                setExit('1'); // triggers animation
                setchooseSATorACT('3'); // bring in next page
                setTimeout(function(){
                    setshowEnterSAT(false);
                }, 2000);
            }
        }
    };

    if (showEnterSAT) {
        return (
            <div className='enter-sat-container' exit={exit}>
                <div className='sat-cen'>
                    <img src={math} id="math-pic"/>
                </div>

                <div className='sat-cen'>
                    <input type="text" id="math-score" validmath={validMath} onChange={(e) => setmathScore(e.target.value)}></input>
                </div>

                <div className='sat-cen'>
                    <img src={english} id="english-pic"/>
                </div>

                <div className='sat-cen'>
                    <input type="text" id="english-score" validenglish={validEnglish} onChange={(e) => setenglishScore(e.target.value)}></input>
                </div>

                <h2 className='sat-con'><span onClick={() => {contSAT()}}>Continue</span></h2>
            </div>
        )
    }
}

