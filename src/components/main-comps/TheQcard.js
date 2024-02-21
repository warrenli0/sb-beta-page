import arrow from "../../images/Arrow.png"
import React, { useState, useRef } from "react";

export default function TheQcard({prob, bgNum, setbgNum, currQIndex, setcurrQIndex, chosenAnswers, setchosenAnswers}) {
    const [showCard, setshowCard] = useState(true);
    const [selectedChoice, setselectedChoice] = useState('0');
    const [exit, setexit] = useState('0');

    function nextQ() {
        if (exit == '0' || exit == '2') {
            setexit('1');
            setbgNum(bgNum + 1);
            if (prob.options[(+selectedChoice)-1].isCorrect) { // correct answer
                setchosenAnswers([
                    ...chosenAnswers,
                    ['1',selectedChoice] // [T/F, chosen prob 1-indexed]
                ]);
            } else {
                setchosenAnswers([
                    ...chosenAnswers,
                    ['0',selectedChoice]
                ]);
            }
            if (currQIndex == 4) { // last question
                setTimeout(function(){
                    setcurrQIndex(currQIndex + 1);
                    setshowCard(false); // remove qcard after scrolls up
                }, 1500);
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
  