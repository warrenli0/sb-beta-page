import QGrid from './QGrid';
import Review from './Review';
import EGrid from './EGrid';

import React, { useState } from "react";

export default function Display({questions, showQCards, setshowQCards, notesArray, setnotesArray, chosenAnswers, setchosenAnswers, drawingArray, setdrawingArray}) {
    const [bgNum, setbgNum] = useState(0);

    /* close condition
    if (bgNum == 5) {
      setTimeout(function(){
        setshowQCards(false);
      }, 1500);
    } */

    if (showQCards) {
        return (
            <div className='question-page'> {/* Fixed container to position off of */}
                
                <div className='surf-wave-bottom' move={+bgNum}></div> {/* First bg that moves up */}
                <div className='second-bg' move={+bgNum}></div>
                <div className='third-bg' move={+bgNum}></div>
                <div className='fourth-bg' move={+bgNum}></div>
                <div className='fifth-bg' move={+bgNum}></div>
                
                <Review questions={questions} bgNum={bgNum} setbgNum={setbgNum} chosenAnswers={chosenAnswers}/>

                <QGrid questions={questions} notesArray={notesArray} setnotesArray={setnotesArray} bgNum={bgNum} setbgNum={setbgNum} chosenAnswers={chosenAnswers} setchosenAnswers={setchosenAnswers} drawingArray={drawingArray} setdrawingArray={setdrawingArray}/>

                <EGrid questions={questions} notesArray={notesArray} setnotesArray={setnotesArray} bgNum={bgNum} setbgNum={setbgNum} chosenAnswers={chosenAnswers} drawingArray={drawingArray} setdrawingArray={setdrawingArray}/>

            </div>
        )
    }
};
