import math from '../../images/act-math.png';
import writing from '../../images/act-writing.png';
import reading from '../../images/act-reading.png';
import science from '../../images/act-science.png';
import { useState } from "react";

export default function EnterAct({showEnterACT, setshowEnterACT, chooseSATorACT, setchooseSATorACT, setActScores, setActWeightage}) {

    // used to trigger the exit animation
    const [exit, setExit] = useState('0');
    const [validMath, setvalidMath] = useState('0'); // used to trigger shake
    const [validWriting, setvalidWriting] = useState('0');
    const [validReading, setvalidReading] = useState('0');
    const [validScience, setvalidScience] = useState('0');

    const [mathScore, setmathScore] = useState("");
    const [writingScore, setwritingScore] = useState("");
    const [readingScore, setreadingScore] = useState("");
    const [scienceScore, setscienceScore] = useState("");

    if (chooseSATorACT == '3') { //skip condition
        if (exit == '0'){ // in case someone tries to click a couple buttons
            setExit('1'); // triggers animation
            setTimeout(function(){
                setshowEnterACT(false);
            }, 2000);
        }
    }

    function contACT() {
        var mat = mathScore;
        var wri = writingScore;
        var red = readingScore;
        var sci = scienceScore;
        var c = 0;

        // +eng converts to num
        if ((wri == null || wri == "") || (isNaN(wri)) || (+wri > 36) || (+wri < 1)){
            setvalidWriting('1'); // shake input to indicate failed input
            c += 1;
            setTimeout(function(){
                setvalidWriting("0");
            }, 1500);
        } 
        if ((mat == null || mat == "") || (isNaN(mat)) || (+mat > 36) || (+mat < 1)){
            setvalidMath('1');
            c+=1;
            setTimeout(function(){
                setvalidMath("0");
            }, 1500);
        }
        if ((red == null || red == "") || (isNaN(red)) || (+red > 36) || (+red < 1)){
            setvalidReading('1');
            c+=1;
            setTimeout(function(){
                setvalidReading("0");
            }, 1500);
        }
        if ((sci == null || sci == "") || (isNaN(sci)) || (+sci > 36) || (+sci < 1)){
            setvalidScience('1');
            c+=1;
            setTimeout(function(){
                setvalidScience("0");
            }, 1500);
        }
        if (c>0) { // trigger ping error message
            if (chooseSATorACT != '5')
            {
                setchooseSATorACT('5');
            }
        } else { // next page
            if (exit == '0'){ // in case someone tries to click a couple buttons
                setActScores([+wri, +mat, +red, +sci]); // update scores
                // get weightages
                var lis = [[+wri, "English", 25],[+mat, "Math", 25],[+red, "Reading", 25],[+sci, "Science", 25]] 
                lis.sort(function(a,b){return a[0]<(b[0]);}); // sort from greatest to least
                
                // first diff
                var d1 = lis[0][0] - lis[1][0];
                if (d1 >= 10) {
                    d1 = 10; // ensures max drop off is 15%, so 25% becomes 10%
                }
                var mul = Math.floor(d1 / 2);
                lis[0][2] = lis[0][2] - (3 * mul);
                lis[1][2] = lis[1][2] + (mul);
                lis[2][2] = lis[2][2] + (mul);
                lis[3][2] = lis[3][2] + (mul);
                // second dif
                d1 = lis[1][0] - lis[2][0];
                mul = Math.floor(d1/2);
                if (lis[0][2] - (2*mul) < 10) {
                    d1 = lis[0][2] - 10;
                    mul = Math.floor(d1/2);
                }
                lis[0][2] = lis[0][2] - (2 * mul);
                lis[1][2] = lis[1][2] - (2 * mul);
                lis[2][2] = lis[2][2] + (2 * mul);
                lis[3][2] = lis[3][2] + (2 * mul);
                //third dif
                d1 = lis[2][0] - lis[3][0];
                mul = Math.floor(d1/2);
                if (lis[0][2] - (2*mul) < 10) {
                    d1 = lis[0][2] - 10;
                    mul = Math.floor(d1/2);
                }
                lis[0][2] = lis[0][2] - (mul);
                lis[1][2] = lis[1][2] - (mul);
                lis[2][2] = lis[2][2] - (mul);
                lis[3][2] = lis[3][2] + (3 * mul);

                const newWeights = [0,0,0,0];
                for (let i = 0; i < lis.length; i++) {
                    if (lis[i][1] == "English"){
                        newWeights[0] = lis[i][2];
                    } else if (lis[i][1] == "Math"){
                        newWeights[1] = lis[i][2];
                    } else if (lis[i][1] == "Reading"){
                        newWeights[2] = lis[i][2];
                    } else if (lis[i][1] == "Science"){
                        newWeights[3] = lis[i][2];
                    }
                }
                setActWeightage(newWeights);

                setExit('1'); // triggers animation
                setchooseSATorACT('3'); // bring in next page
                setTimeout(function(){
                    setshowEnterACT(false);
                }, 2000);
            }
        }
    };

    if (showEnterACT) {
        return (
            <div className='enter-act-container' exit={exit}>
                <div className='act-cen'>
                    <img src={math} id="act-math-pic"/>
                </div>

                <div className='act-cen'>
                    <input type="text" id="act-math-score" validmath={validMath} onChange={(e) => setmathScore(e.target.value)}></input>
                </div>

                <div className='act-cen'>
                    <img src={writing} id="act-writing-pic"/>
                </div>

                <div className='act-cen'>
                    <input type="text" id="act-writing-score" validwriting={validWriting} onChange={(e) => setwritingScore(e.target.value)}></input>
                </div>

                <div className='act-cen'>
                    <img src={reading} id="act-reading-pic"/>
                </div>

                <div className='act-cen'>
                    <input type="text" id="act-reading-score" validreading={validReading} onChange={(e) => setreadingScore(e.target.value)}></input>
                </div>

                <div className='act-cen'>
                    <img src={science} id="act-science-pic"/>
                </div>

                <div className='act-cen'>
                    <input type="text" id="act-science-score" validscience={validScience} onChange={(e) => setscienceScore(e.target.value)}></input>
                </div>

                <h2 className='act-con'><span onClick={() => {contACT()}}>Continue</span></h2>
            </div>
        )
    }
}

