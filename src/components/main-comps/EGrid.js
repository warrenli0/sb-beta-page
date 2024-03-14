import './EGrid.css'
import TheNotepad from './TheNotepad';
import TheEcard from './TheEcard';

import React, { useState, useEffect } from "react";

export default function EGrid({questions, notesArray, setnotesArray, bgNum, setbgNum, chosenAnswers, 
    drawingArray, setdrawingArray, setActData, actData, setActWeightage, actWeightage, currProblemSet,
    choseSAT, satWeightage, setsatWeightage, satData, setsatData, log, setlog}) {
    const [showEgrid, setshowEgrid] = useState(true);
    const [currQIndex, setcurrQIndex] = useState(0);
    const [seconds, setSeconds] = useState(-3);

    if (bgNum >= 11) { // last question done
        setTimeout(function(){
            setshowEgrid(false); // remove qcard after everything goes away
        }, 1500);
    }

    setTimeout(function(){
        setSeconds(seconds + 1); // timer lol
      }, 1000);

    useEffect(() => {
        // set seconds to 0, time to show ecards
        if (bgNum == 6) {
            setSeconds(-1);
            console.log("done");
        }
    }, [bgNum]);

    useEffect(() => {
        // 5 new problems has been selected, reset vars
        if (currProblemSet > 1) {
          setcurrQIndex(0);
          setshowEgrid(true);
        }
      }, [currProblemSet]);

    // only show from bg 6 onwards
    if (bgNum > 5 && showEgrid) {
        return (
            <div className='explanation-grid'> {/* Used to position misc + qcards */}
                <div className='ecard-header' move={+bgNum}> 
                        <h1>Review Q.{((currProblemSet - 1) * 5) + currQIndex+1}</h1>
                        <h3><i>{questions[currQIndex].type}</i></h3>
                </div>
                <div className='ecard-question-type' move={+bgNum}>
                      <h3><i>{questions[currQIndex].type}</i></h3>
                </div>
                <div className='ecard-misc' move={+bgNum}> 
                    <h3>Question by: <b>SB</b></h3>
                </div>
                <div className='ecard-version-note' move={+bgNum}>
                      <h3>experience the full version on a larger screen</h3>
                    </div>
                <div className='ecard-notepad' move={+bgNum}> 
                    <TheNotepad currQIndex={currQIndex} notesArray={notesArray} setnotesArray={setnotesArray} calc={''+(questions[currQIndex].type == 'Math (calc)')} bgNum={bgNum} drawingArray={drawingArray} setdrawingArray={setdrawingArray}/>
                </div>
                <div className='ecard-container'> {/* ecard */}
                    <TheEcard prob={questions[currQIndex]} bgNum={bgNum} setbgNum={setbgNum} 
                    currQIndex={currQIndex} setcurrQIndex={setcurrQIndex} chosenAnswers={chosenAnswers} 
                    setActData={setActData} actData={actData} setActWeightage={setActWeightage} actWeightage={actWeightage}
                    currProblemSet={currProblemSet} choseSAT={choseSAT} satWeightage={satWeightage} setsatWeightage={setsatWeightage} 
                    satData={satData} setsatData={setsatData} log={log} setlog={setlog} seconds={seconds}/>
                </div>
            </div>
        )
    }
}