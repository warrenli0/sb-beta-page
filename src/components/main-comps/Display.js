import QGrid from './QGrid';
import Review from './Review';
import EGrid from './EGrid';
import floatie from '../../images/ping-floatie.png';

import React, { useState, useEffect } from "react";

export default function Display({questions, showQCards, setshowQCards, notesArray, setnotesArray, 
  chosenAnswers, setchosenAnswers, drawingArray, setdrawingArray, setshowDashoard, setActData, actData, 
  setActWeightage, actWeightage, currProblemSet, choseSAT, satWeightage, setsatWeightage, satData, setsatData,
  log, setlog}) {
    const [bgNum, setbgNum] = useState(0);

    useEffect(() => {
      //Runs on the first render
      //And any time any dependency value changes
      /* close condition */
      if (bgNum == 11) {
        setshowDashoard(true); 
        setTimeout(function(){
          setshowQCards(false);
        }, 6100);
      } 
    }, [bgNum]);

    useEffect(() => {
      // 5 new problems has been selected, reset bgnum
      if (currProblemSet > 1) {
        setbgNum(0);
        setshowQCards(true);
      }
    }, [currProblemSet]);

    if (showQCards) {
        return (
            <div className='question-page'> {/* Fixed container to position off of */}

                {/* Waves for when review done */}
                <div className='dash-wave-cont' move={+bgNum}>
                  <div className='behind-dash-wave'></div>
                  <img src={floatie} className="floatie-peng"/>
                  <div className='behind-bottom'></div>
                  <div className='dash-wave'></div>
                </div>
                
                <div className='surf-wave-bottom' move={+bgNum}></div> {/* First bg that moves up */}
                <div className='second-bg' move={+bgNum}></div>
                <div className='third-bg' move={+bgNum}></div>
                <div className='fourth-bg' move={+bgNum}></div>
                <div className='fifth-bg' move={+bgNum}></div>
                
                <Review questions={questions} bgNum={bgNum} setbgNum={setbgNum} chosenAnswers={chosenAnswers}/>

                <QGrid questions={questions} notesArray={notesArray} setnotesArray={setnotesArray} bgNum={bgNum} setbgNum={setbgNum} 
                chosenAnswers={chosenAnswers} setchosenAnswers={setchosenAnswers} drawingArray={drawingArray} 
                setdrawingArray={setdrawingArray} setActData={setActData} actData={actData} setActWeightage={setActWeightage} actWeightage={actWeightage}
                currProblemSet={currProblemSet} choseSAT={choseSAT} satWeightage={satWeightage} setsatWeightage={setsatWeightage} 
                satData={satData} setsatData={setsatData} log={log} setlog={setlog}/>

                <EGrid questions={questions} notesArray={notesArray} setnotesArray={setnotesArray} bgNum={bgNum} setbgNum={setbgNum} 
                chosenAnswers={chosenAnswers} drawingArray={drawingArray} setdrawingArray={setdrawingArray} setActData={setActData} 
                actData={actData} setActWeightage={setActWeightage} actWeightage={actWeightage} currProblemSet={currProblemSet}
                choseSAT={choseSAT} satWeightage={satWeightage} setsatWeightage={setsatWeightage} satData={satData} setsatData={setsatData}
                log={log} setlog={setlog}/>

            </div>
        )
    }
};
