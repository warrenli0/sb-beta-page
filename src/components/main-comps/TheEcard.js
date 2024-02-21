import arrow from "../../images/Arrow.png"
import disc from "../../images/blue-discord.png"
import thumbs_up from "../../images/thumbs-up.png"
import green_thumbs_up from "../../images/green-thumbs-up.png"
import thumbs_down from "../../images/thumbs-down.png"
import red_thumbs_down from "../../images/red-thumbs-down.png"
import React, { useState, useRef } from "react";

export default function TheEcard({prob, bgNum, setbgNum, currQIndex, setcurrQIndex, chosenAnswers}) {
    const [showCard, setshowCard] = useState(true);
    const [exit, setexit] = useState('0');
    const [thumbUp, setthumbUp] = useState('0');
    const [thumbDown, setthumbDown] = useState('0');
    const [checked, setchecked] = useState(false);
    const [mobile, setmobile] = useState('0');

    function nextQ() {
        if (exit == '0' || exit == '2') {
            setexit('1');
            setbgNum(bgNum + 1);
            if (currQIndex == 4) { // last question
                setTimeout(function(){
                    setshowCard(false); // remove qcard after scrolls up
                }, 1500);
            } else {
                setTimeout(function(){
                    setmobile('0');
                    setthumbUp('0');
                    setthumbDown('0');
                    setchecked(false);
                    setcurrQIndex(currQIndex + 1);
                    setexit('2'); // reset card to bottom of screen
                }, 1010);
            }
        }
    }
    function clickThumbs() {
        // v:0 black thumbs up to green
        if (thumbUp == '0') {
            setthumbUp('1');
            if (thumbDown == '1') {
                setthumbDown('0');
            }
        }
        else if (thumbUp == '1') {
            setthumbUp('0');
        }
    }
    function clickThumbsDown() {
        if (thumbDown == '0') {
            setthumbDown('1');
            if (thumbUp == '1') {
                setthumbUp('0');
            }
        }
        else if (thumbDown == '1') {
            setthumbDown('0');
        }
    }
    function clickMobile() {
        // see explanation
        if (mobile == '0') {
            setmobile('1');
        } else if (mobile == '1') { // back
            setmobile('0');
        }
    }
    function clickBack() {
        if (mobile == '1') { // back
            setmobile('0');
        }
    }

    // check here to see which format to display qcard in
    // question + 4 answer choices
    if (showCard) {
        if (prob.type == 'Reading') {
            return (
                <div className='the-ecard' exit={exit} mobile={mobile} format={prob.type}>
                    <div className="the-e-passage" mobile={mobile}>
                        <h2>{prob.passage}</h2>
                    </div>
                    <div className="the-left-e-line" format={prob.type}><div className="the-left-e-real-line"></div></div>
                    <div className="the-e-question" mobile={mobile} format={prob.type}>
                        <h2>{prob.text}</h2>
                    </div>
                    <div className="the-2left-e-line" mobile={mobile} format={prob.type}><div className="the-left-e-real-line"></div></div>
                    <div className="answer-choice" id="e-choice1" mobile={mobile} format={prob.type}>
                        <button className="the-e-button" choice="c1" chosen={+(chosenAnswers[0][1])} bg={""+(prob.options[0].isCorrect)}><p>{prob.options[0].text}</p></button>
                    </div>
                    <div className="answer-choice" id="e-choice2" mobile={mobile} format={prob.type}>
                        <button className="the-e-button" choice="c2" chosen={+(chosenAnswers[0][1])} bg={""+(prob.options[1].isCorrect)}><p>{prob.options[1].text}</p></button>
                    </div>
                    <div className="answer-choice" id="e-choice3" mobile={mobile} format={prob.type}>
                        <button className="the-e-button" choice="c3" chosen={+(chosenAnswers[0][1])} bg={""+(prob.options[2].isCorrect)}><p>{prob.options[2].text}</p></button>
                    </div>
                    <div className="answer-choice" id="e-choice4" mobile={mobile} format={prob.type}>
                        <button className="the-e-button" choice="c4" chosen={+(chosenAnswers[0][1])} bg={""+(prob.options[3].isCorrect)}><p>{prob.options[3].text}</p></button>
                    </div>
                    <div className="the-e-line" format={prob.type}><div className="the-e-real-line"></div></div>
                    <div className="the-e-explanation" mobile={mobile} format={prob.type}>
                        <h2><b>Explanation</b></h2>
                        <h2>{prob.explanation}</h2> 
                        <img src={thumbs_up} className="thumbs-up" version={thumbUp} mobile={mobile} onClick={() => {clickThumbs()}}/>
                        <img src={green_thumbs_up} className="green-thumbs-up" version={thumbUp} onClick={() => {clickThumbs()}}/>
                        <img src={thumbs_down} className="thumbs-down" version={thumbDown} onClick={() => {clickThumbsDown()}}/>
                        <img src={red_thumbs_down} className="red-thumbs-down" version={thumbDown} onClick={() => {clickThumbsDown()}}/>
                    </div>
                    <div className="the-e-check" mobile={mobile} format={prob.type}>
                        <input type="checkbox" id="e-understood" name="check" checked={checked} onChange={() => {setchecked(!checked)}}/>
                        <label><h2>I understand this problem</h2></label>
                    </div>
                    <div className="the-e-help" mobile={mobile} format={prob.type}>
                        <h4>Don't understand? Skip {"&"} ask for help in the discord!</h4>
                        <img src={disc} />
                        <img src={arrow} id="the-e-arrow" onClick={() => {nextQ()}}/>
                    </div>
                    <div className="the-e-see" mobile={mobile} format={prob.type}>
                        <h3 onClick={() => {clickMobile()}}>See Explanation</h3>
                    </div>
                    <div className="the-e-back" mobile={mobile} format={prob.type}>
                        <h3 onClick={() => {clickBack()}}>Back</h3>
                        <img src={arrow} id="the-e-arrow" onClick={() => {nextQ()}}/>
                    </div>
                </div>
            )
        } else if (prob.has_img) { // has sameish format as reading
            return (
                <div className='the-ecard' exit={exit} mobile={mobile} format='Image'>
                    <div className="the-e-question" mobile={mobile} format='Image'>
                        <h2>{prob.text}</h2>
                    </div>
                    <div className="the-left-e-line" format='Image'><div className="the-left-e-real-line"></div></div>
                    <div className="answer-choice" id="e-choice1" mobile={mobile} format='Image'>
                        <button className="the-e-button" choice="c1" chosen={+(chosenAnswers[0][1])} bg={""+(prob.options[0].isCorrect)}><p>{prob.options[0].text}</p></button>
                    </div>
                    <div className="answer-choice" id="e-choice2" mobile={mobile} format='Image'>
                        <button className="the-e-button" choice="c2" chosen={+(chosenAnswers[0][1])} bg={""+(prob.options[1].isCorrect)}><p>{prob.options[1].text}</p></button>
                    </div>
                    <div className="answer-choice" id="e-choice3" mobile={mobile} format='Image'>
                        <button className="the-e-button" choice="c3" chosen={+(chosenAnswers[0][1])} bg={""+(prob.options[2].isCorrect)}><p>{prob.options[2].text}</p></button>
                    </div>
                    <div className="answer-choice" id="e-choice4" mobile={mobile} format='Image'>
                        <button className="the-e-button" choice="c4" chosen={+(chosenAnswers[0][1])} bg={""+(prob.options[3].isCorrect)}><p>{prob.options[3].text}</p></button>
                    </div>
                    <div className="the-e-line" format='Image'><div className="the-e-real-line"></div></div>
                    <div className="the-e-image" mobile={mobile} format='Image'>
                        <img src={prob.img_link} mobile={mobile} format='Image'/>
                    </div>
                    <div className="the-e-explanation" mobile={mobile} format="Image">
                        <h2><b>Explanation</b></h2>
                        <h2>{prob.explanation}</h2> 
                        <img src={thumbs_up} className="thumbs-up" format="Image" version={thumbUp} mobile={mobile} onClick={() => {clickThumbs()}}/>
                        <img src={green_thumbs_up} className="green-thumbs-up" format="Image" version={thumbUp} onClick={() => {clickThumbs()}}/>
                        <img src={thumbs_down} className="thumbs-down" format="Image" version={thumbDown} onClick={() => {clickThumbsDown()}}/>
                        <img src={red_thumbs_down} className="red-thumbs-down" format="Image" version={thumbDown} onClick={() => {clickThumbsDown()}}/>
                    </div>
                    <div className="the-right-e-line" format="Image"><div className="the-left-e-real-line"></div></div>
                    <div className="the-e-check" mobile={mobile} format="Image">
                        <input type="checkbox" id="e-understood" name="check" checked={checked} onChange={() => {setchecked(!checked)}}/>
                        <label><h2>I understand this problem</h2></label>
                    </div>
                    <div className="the-e-help" mobile={mobile} format="Image">
                        <h4>Don't understand? Skip {"&"} ask for help in the discord!</h4>
                        <img src={disc} />
                        <img src={arrow} id="the-e-arrow" onClick={() => {nextQ()}}/>
                    </div>
                    <div className="the-e-see" mobile={mobile}>
                        <h3 onClick={() => {clickMobile()}}>See Explanation</h3>
                    </div>
                    <div className="the-e-back" mobile={mobile}>
                        <h3 onClick={() => {clickBack()}}>Back</h3>
                        <img src={arrow} id="the-e-arrow" onClick={() => {nextQ()}}/>
                    </div>
                </div>
            )
        } else { // default format
            return (
                <div className='the-ecard' exit={exit} mobile={mobile}>
                    <div className="the-e-question" mobile={mobile}>
                        <h2>{prob.text}</h2>
                    </div>
                    <div className="the-left-e-line"><div className="the-left-e-real-line"></div></div>
                    <div className="answer-choice" id="e-choice1" mobile={mobile}>
                        <button className="the-e-button" choice="c1" chosen={+(chosenAnswers[0][1])} bg={""+(prob.options[0].isCorrect)}><p>{prob.options[0].text}</p></button>
                    </div>
                    <div className="answer-choice" id="e-choice2" mobile={mobile}>
                        <button className="the-e-button" choice="c2" chosen={+(chosenAnswers[0][1])} bg={""+(prob.options[1].isCorrect)}><p>{prob.options[1].text}</p></button>
                    </div>
                    <div className="answer-choice" id="e-choice3" mobile={mobile}>
                        <button className="the-e-button" choice="c3" chosen={+(chosenAnswers[0][1])} bg={""+(prob.options[2].isCorrect)}><p>{prob.options[2].text}</p></button>
                    </div>
                    <div className="answer-choice" id="e-choice4" mobile={mobile}>
                        <button className="the-e-button" choice="c4" chosen={+(chosenAnswers[0][1])} bg={""+(prob.options[3].isCorrect)}><p>{prob.options[3].text}</p></button>
                    </div>
                    <div className="the-e-line"><div className="the-e-real-line"></div></div>
                    <div className="the-e-explanation" mobile={mobile}>
                        <h2><b>Explanation</b></h2>
                        <h2>{prob.explanation}</h2> 
                        <img src={thumbs_up} className="thumbs-up" version={thumbUp} mobile={mobile} onClick={() => {clickThumbs()}}/>
                        <img src={green_thumbs_up} className="green-thumbs-up" version={thumbUp} onClick={() => {clickThumbs()}}/>
                        <img src={thumbs_down} className="thumbs-down" version={thumbDown} onClick={() => {clickThumbsDown()}}/>
                        <img src={red_thumbs_down} className="red-thumbs-down" version={thumbDown} onClick={() => {clickThumbsDown()}}/>
                    </div>
                    <div className="the-right-e-line"><div className="the-left-e-real-line"></div></div>
                    <div className="the-e-check" mobile={mobile}>
                        <input type="checkbox" id="e-understood" name="check" checked={checked} onChange={() => {setchecked(!checked)}}/>
                        <label><h2>I understand this problem</h2></label>
                    </div>
                    <div className="the-e-help" mobile={mobile}>
                        <h4>Don't understand? Skip {"&"} ask for help in the discord!</h4>
                        <img src={disc} />
                        <img src={arrow} id="the-e-arrow" onClick={() => {nextQ()}}/>
                    </div>
                    <div className="the-e-see" mobile={mobile}>
                        <h3 onClick={() => {clickMobile()}}>See Explanation</h3>
                    </div>
                    <div className="the-e-back" mobile={mobile}>
                        <h3 onClick={() => {clickBack()}}>Back</h3>
                        <img src={arrow} id="the-e-arrow" onClick={() => {nextQ()}}/>
                    </div>
                </div>
            )
        }
    }
};
  