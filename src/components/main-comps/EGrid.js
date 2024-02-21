import './EGrid.css'
import TheNotepad from './TheNotepad';
import TheEcard from './TheEcard';

import React, { useState } from "react";

export default function EGrid({questions, notesArray, setnotesArray, bgNum, setbgNum, chosenAnswers, drawingArray, setdrawingArray}) {
    const [showEgrid, setshowEgrid] = useState(true);
    const [currQIndex, setcurrQIndex] = useState(0);

    if (bgNum >= 11) { // last question done
        setTimeout(function(){
            setshowEgrid(false); // remove qcard after everything goes away
        }, 1500);
    }

    // only show from bg 6 onwards
    if (bgNum > 5 && showEgrid) {
        return (
            <div className='explanation-grid'> {/* Used to position misc + qcards */}
                <div className='ecard-header' move={+bgNum}> 
                        <h1>Review Q.{currQIndex+1}</h1>
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
                    <TheEcard prob={questions[currQIndex]} bgNum={bgNum} setbgNum={setbgNum} currQIndex={currQIndex} setcurrQIndex={setcurrQIndex} chosenAnswers={chosenAnswers}/>
                </div>
            </div>
        )
    }
}