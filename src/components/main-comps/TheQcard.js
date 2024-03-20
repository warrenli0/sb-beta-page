import arrow from "../../images/Arrow.png"
import React, { useState, useRef } from "react";

export default function TheQcard({prob, bgNum, setbgNum, currQIndex, setcurrQIndex, chosenAnswers, setchosenAnswers, setActData, actData, 
    setActWeightage, actWeightage, seconds, currProblemSet, choseSAT, satWeightage, setsatWeightage, satData, setsatData, log, setlog}) {
    const [showCard, setshowCard] = useState(true);
    const [selectedChoice, setselectedChoice] = useState('0');
    const [exit, setexit] = useState('0');
    const [currseconds, setcurrseconds] = useState(0);

    function nextQ() {
        var setNum = "Set" + currProblemSet;
        console.log(log);

        if (!log[setNum]) {
            log[setNum] = {}; // Initialize it as an empty object
        }            

        if (exit == '0' || exit == '2') {
            setexit('1');
            setbgNum(bgNum + 1);

            // overall log
            setlog({
                ...log,
                [setNum]: {
                    ...log[setNum],
                    [prob.id]: {
                        //...log[setNum][prob.id], should not be getting repeat problems
                        qTime: (seconds - currseconds),
                        eTime: 0,
                        eThumbs: 0,
                        understood: false,
                        correct: prob.options[(+selectedChoice)-1].isCorrect,
                    }
                }
            });

            if (prob.options[(+selectedChoice)-1].isCorrect) { // correct answer
                setchosenAnswers([
                    ...chosenAnswers,
                    ['1',selectedChoice] // [T/F, chosen prob 1-indexed]
                ]);
                if (choseSAT) { // SAT
                    setsatData({
                        ...satData, // copy other fields
                        [prob.type]: {
                            ...satData[prob.type],
                            [setNum]: [satData[prob.type][setNum][0] + 1, satData[prob.type][setNum][1] + 1, satData[prob.type][setNum][2], satData[prob.type][setNum][3] + (seconds - currseconds)],
                            Overall: [satData[prob.type].Overall[0] + 1, satData[prob.type].Overall[1] + 1, satData[prob.type].Overall[2], satData[prob.type].Overall[3] + (seconds - currseconds)]
                        }
                    });
                } //ACT
                else {
                    if (prob.type.substring(0, 4) == "Math") {
                        setActData({
                            ...actData, // copy other fields
                            Math: {
                                ...actData.Math,
                                [setNum]: [actData.Math[setNum][0] + 1, actData.Math[setNum][1] + 1, actData.Math[setNum][2], actData.Math[setNum][3] + (seconds - currseconds)] ,
                                Overall: [actData.Math.Overall[0] + 1, actData.Math.Overall[1] + 1, actData.Math.Overall[2], actData.Math.Overall[3] + (seconds - currseconds)]
                                // 4th field is total seconds spent in this category, average out later
                            }
                        });
                    } else {
                        setActData({
                            ...actData, // copy other fields
                            [prob.type]: {
                                ...actData[prob.type],
                                [setNum]: [actData[prob.type][setNum][0] + 1, actData[prob.type][setNum][1] + 1, actData[prob.type][setNum][2], actData[prob.type][setNum][3] + (seconds - currseconds)],
                                Overall: [actData[prob.type].Overall[0] + 1, actData[prob.type].Overall[1] + 1, actData[prob.type].Overall[2], actData[prob.type].Overall[3] + (seconds - currseconds)]
                            }
                        });
                    }
                }
                setcurrseconds(seconds);
            } else { // wrong answer
                setchosenAnswers([
                    ...chosenAnswers,
                    ['0',selectedChoice]
                ]);
                if (choseSAT) { // SAT
                    setsatData({
                        ...satData, // copy other fields
                        [prob.type]: {
                            ...satData[prob.type],
                            [setNum]: [satData[prob.type][setNum][0] + 1, satData[prob.type][setNum][1], satData[prob.type][setNum][2], satData[prob.type][setNum][3] + (seconds - currseconds)],
                            Overall: [satData[prob.type].Overall[0] + 1, satData[prob.type].Overall[1], satData[prob.type].Overall[2], satData[prob.type].Overall[3] + (seconds - currseconds)]
                        }
                    });
                    setcurrseconds(seconds);

                    if (prob.type == "Reading") {
                        if (satWeightage[0]+3 <= 60 && satWeightage[1]-1 >= 10 && satWeightage[2]-1 >= 10 && satWeightage[3]-1 >= 10) {
                            setsatWeightage([satWeightage[0]+3, satWeightage[1]-1, satWeightage[2]-1, satWeightage[3]-1]);
                        }
                    } else if (prob.type == "Writing") {
                        if (satWeightage[0]-1 >= 10 && satWeightage[1]+3 <= 60 && satWeightage[2]-1 >= 10 && satWeightage[3]-1 >= 10) {
                            setsatWeightage([satWeightage[0]-1, satWeightage[1]+3, satWeightage[2]-1, satWeightage[3]-1]);
                        }
                    } else if (prob.type == "Math (no calc)") {
                        if (satWeightage[0]-1 >= 10 && satWeightage[1]-1 >= 10 && satWeightage[2]+3 <= 60 && satWeightage[3]-1 >= 10) {
                            setsatWeightage([satWeightage[0]-1, satWeightage[1]-1, satWeightage[2]+3, satWeightage[3]-1]);
                        }
                    } else if (prob.type == "Math (calc)") {
                        if (satWeightage[0]-1 >= 10 && satWeightage[1]-1 >= 10 && satWeightage[2]-1 >= 10 && satWeightage[3]+3 <= 60) {
                            setsatWeightage([satWeightage[0]-1, satWeightage[1]-1, satWeightage[2]-1, satWeightage[3]+3]);
                        }
                    }
                } else { // ACT
                    if (prob.type.substring(0, 4) == "Math") {
                        setActData({
                            ...actData, // copy other fields
                            Math: {
                                ...actData.Math,
                                [setNum]: [actData.Math[setNum][0] + 1, actData.Math[setNum][1], actData.Math[setNum][2], actData.Math[setNum][3] + (seconds - currseconds)],
                                Overall: [actData.Math.Overall[0] + 1, actData.Math.Overall[1], actData.Math.Overall[2], actData.Math.Overall[3] + (seconds - currseconds)]
                            }
                        });
                        setcurrseconds(seconds);
                        // only change weightage if problem is wrong
                        // eng, mat, red, sci
                        // check if doesnt go below 10 / above 60   
                        if (actWeightage[0]-1 >= 10 && actWeightage[1]+3 <= 60 && actWeightage[2]-1 >= 10 && actWeightage[3]-1 >= 10) {
                            setActWeightage([actWeightage[0]-1, actWeightage[1]+3, actWeightage[2]-1, actWeightage[3]-1]);
                        }
                    } else {
                        setActData({
                            ...actData, // copy other fields
                            [prob.type]: {
                                ...actData[prob.type],
                                [setNum]: [actData[prob.type][setNum][0] + 1, actData[prob.type][setNum][1], actData[prob.type][setNum][2], actData[prob.type][setNum][3] + (seconds - currseconds)],
                                Overall: [actData[prob.type].Overall[0] + 1, actData[prob.type].Overall[1], actData[prob.type].Overall[2], actData[prob.type].Overall[3] + (seconds - currseconds)]
                            }
                        });
                        setcurrseconds(seconds);
                        if (prob.type == "English") {
                            if (actWeightage[0]+3 <= 60 && actWeightage[1]-1 >= 10 && actWeightage[2]-1 >= 10 && actWeightage[3]-1 >= 10) {
                                setActWeightage([actWeightage[0]+3, actWeightage[1]-1, actWeightage[2]-1, actWeightage[3]-1]);
                            }
                        } else if (prob.type == "Reading") {
                            if (actWeightage[0]-1 >= 10 && actWeightage[1]-1 >= 10 && actWeightage[2]+3 <= 60 && actWeightage[3]-1 >= 10) {
                                setActWeightage([actWeightage[0]-1, actWeightage[1]-1, actWeightage[2]+3, actWeightage[3]-1]);
                            }
                        } else if (prob.type == "Science") {
                            if (actWeightage[0]-1 >= 10 && actWeightage[1]-1 >= 10 && actWeightage[2]-1 >= 10 && actWeightage[3]+3 <= 60) {
                                setActWeightage([actWeightage[0]-1, actWeightage[1]-1, actWeightage[2]-1, actWeightage[3]+3]);
                            }
                        }
                    }
                }
            }
            if (currQIndex == 4) { // last question
                // update log
                setlog({
                    ...log,
                    [setNum]: {
                        ...log[setNum],
                        [prob.id]: {
                            //...log[setNum][prob.id], should not be getting repeat problems
                            qTime: (seconds - currseconds),
                            eTime: 0,
                            eThumbs: 0,
                            understood: false,
                            correct: prob.options[(+selectedChoice)-1].isCorrect,
                        },
                        totalQtime: seconds, // store total qcard time
                    }
                });

                setTimeout(function(){
                    setcurrQIndex(1); //needed for notepad to work to trigger useeffuect
                    setshowCard(false); // remove qcard after scrolls up
                }, 1100);
            } else {
                setTimeout(function(){
                    setcurrQIndex(currQIndex + 1);
                    setselectedChoice('0');
                    setexit('2'); // reset card to bottom of screen
                }, 1010);
            }
        }
    }

    // check here to see which format to display qcard in
    // question + 4 answer choices
    if (showCard) {
        if (prob.type == 'Reading') {
            return (
                <div className='the-qcard' exit={exit} format={prob.type}>
                    <div className="the-passage" format={prob.type}>
                        <h2>{prob.passage}</h2>
                    </div>
                    <div className="the-line" format={prob.type}><div className="the-real-line" format={prob.type}></div></div>
                    <div className="the-question" format={prob.type}>
                        <h2>{prob.text}</h2>
                    </div>
                    <div className="the-2line"><div className="the-real-line" format={prob.type}></div></div>
                    <div className="answer-choice" id="the-choice1" format={prob.type}> 
                        <button className="the-button" id="choice1" onClick={() => {setselectedChoice('1')}} chosen={selectedChoice}><p>{prob.options[0].text}</p></button>
                    </div>
                    <div className="answer-choice" id="the-choice2" format={prob.type}>
                        <button className="the-button" id="choice2" onClick={() => {setselectedChoice('2')}} chosen={selectedChoice}><p>{prob.options[1].text}</p></button>
                    </div>
                    <div className="answer-choice" id="the-choice3" format={prob.type}>
                        <button className="the-button" id="choice3" onClick={() => {setselectedChoice('3')}} chosen={selectedChoice}><p>{prob.options[2].text}</p></button>
                    </div>
                    <div className="answer-choice" id="the-choice4" format={prob.type}>
                        <button className="the-button" id="choice4" onClick={() => {setselectedChoice('4')}} chosen={selectedChoice}><p>{prob.options[3].text}</p></button>
                    </div>
                    <div className="the-arrow" format={prob.type}><img src={arrow} chosen={selectedChoice} exit={exit} onClick={() => {nextQ()}}/></div>
                </div>
            )
        } else if (prob.has_img) { // has sameish format as reading
            return (
                <div className='the-qcard' exit={exit} format='Image'> 
                   <div className="the-question" format='Image'>
                        <h2>{prob.text}</h2>
                    </div>
                    <div className="the-image" format='Image'>
                        <img src={prob.img_link} format='Image'/>
                    </div>
                    <div className="the-line" format='Image'><div className="the-real-line"></div></div>
                    <div className="answer-choice" id="the-choice1" format='Image'>
                        <button className="the-button" id="choice1" onClick={() => {setselectedChoice('1')}} chosen={selectedChoice}><p>{prob.options[0].text}</p></button>
                    </div>
                    <div className="answer-choice" id="the-choice2" format='Image'>
                        <button className="the-button" id="choice2" onClick={() => {setselectedChoice('2')}} chosen={selectedChoice}><p>{prob.options[1].text}</p></button>
                    </div>
                    <div className="answer-choice" id="the-choice3" format='Image'>
                        <button className="the-button" id="choice3" onClick={() => {setselectedChoice('3')}} chosen={selectedChoice}><p>{prob.options[2].text}</p></button>
                    </div>
                    <div className="answer-choice" id="the-choice4" format='Image'>
                        <button className="the-button" id="choice4" onClick={() => {setselectedChoice('4')}} chosen={selectedChoice}><p>{prob.options[3].text}</p></button>
                    </div>
                    {/* on click triggers move up and the removal make sure click can only happen max onc*/}
                    <div className="the-arrow"><img src={arrow} chosen={selectedChoice} exit={exit} onClick={() => {nextQ()}}/></div>
                </div>
            )
        } else { // default format
            return (
                <div className='the-qcard' exit={exit}>
                    <div className="the-question">
                        <h2>{prob.text}</h2>
                    </div>
                    <div className="the-line"><div className="the-real-line"></div></div>
                    <div className="answer-choice" id="the-choice1">
                        <button className="the-button" id="choice1" onClick={() => {setselectedChoice('1')}} chosen={selectedChoice}><p>{prob.options[0].text}</p></button>
                    </div>
                    <div className="answer-choice" id="the-choice2">
                        <button className="the-button" id="choice2" onClick={() => {setselectedChoice('2')}} chosen={selectedChoice}><p>{prob.options[1].text}</p></button>
                    </div>
                    <div className="answer-choice" id="the-choice3">
                        <button className="the-button" id="choice3" onClick={() => {setselectedChoice('3')}} chosen={selectedChoice}><p>{prob.options[2].text}</p></button>
                    </div>
                    <div className="answer-choice" id="the-choice4">
                        <button className="the-button" id="choice4" onClick={() => {setselectedChoice('4')}} chosen={selectedChoice}><p>{prob.options[3].text}</p></button>
                    </div>
                    {/* on click triggers move up and the removal make sure click can only happen max onc*/}
                    <div className="the-arrow"><img src={arrow} chosen={selectedChoice} exit={exit} onClick={() => {nextQ()}}/></div>
                </div>
            )
        }
    }
};
  