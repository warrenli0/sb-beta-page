import note from "../../images/note-icon.png"
import draw from "../../images/draw-icon.png"
import ping from "../../images/ping-icon.png"
import calc_icon from "../../images/calc-icon.png"
import trashcan from "../../images/trashcan.png"
import eraser from "../../images/eraser.png"
import pen from "../../images/pen.png"
import beach from "../../images/ping-beach.png"
import beach_peng from "../../images/main-peng.png"
import beach_ball from "../../images/beach-ball.png"
import beach_umbrella from "../../images/beach-umbrella.png"

import Whiteboard from "./Whiteboard";
import React, { useState, useEffect, useRef } from "react";

function Content({version, calc, currQIndex, notesArray, setnotesArray, bgNum, drawingArray, setdrawingArray}) {
    const [noteText, setnoteText] = useState('');
    const [drawChoice, setdrawChoice] = useState('1');
    const [drawColor, setDrawColor] = useState('black');
    const [drawWidth, setdrawWidth] = useState(5);
    const [trash, setTrash] = useState('0');
    const [story1, setstory1] = useState(["Nice to meet you!", "I'm just your", "Except that I am a", "I learned it all", "She used to teach", "I remember this", "I got a geometry", "She drew out a", "It was almost as", "and I learned", "and what it", "to be a penguin.", "In the days of ice,", "We were primitive", "Our species is", "and we began to", "the World. It is", "Knowledge is", "We penguins", "In order to not", "savage, primal", "We wrote", "and made the", "and we test", "and make them", "to determine their", 'Just like you I', "Anyways, I'll let", "Thanks for"]);
    const [story2, setstory2] = useState(["I am Coco.", "average penguin", "master of SAT", "from my mom", "me right here", "one time", "problem wrong", "circle in the sand", "big as my head", "about geometry...", "means to be...", "", "we would swim", "& hunted to live", "now civilized...", "learn about...", "truly incredible.", "power", "devised a plan.", "revert to our ...", "ways...", "textbooks...", "education system", "young penguins", "all take the SAT", "colleges...", "suppose!", "you get back to it", "listening, i <3 u"]);
    const [storyindex, setstoryindex] = useState(-1);
    const [showStory, setshowStory] = useState('0');
    const calculatorRef = useRef(null);

    useEffect(() => {
        if (calculatorRef.current) {
            const calculator = window.Desmos.GraphingCalculator(calculatorRef.current, {"keypad": false, "border": false});
        }
    }, []);

    function penClick() {
        setdrawChoice('1');
        setDrawColor('black');
        setdrawWidth(5);
    }
    function eraserClick() {
        setdrawChoice('2');
        setDrawColor('white');
        setdrawWidth(10);
    }
    function trashClick(v) {
        setTrash(v);
        setTimeout(function(){
            setTrash('0'); 
        }, 100);
    }
    function pingClick() {
        if (storyindex == (story1.length - 1)) {
            setshowStory('fin');
            return;
        }
        setshowStory('0'); // opacity down
        setTimeout(function(){
            setstoryindex(storyindex + 1);
            setshowStory('1');
            /*
            setTimeout(function(){
                setshowStory('2'); // opacity down
            }, 5000); */
        }, 10);
    }

    useEffect(() => {
        //Runs on the first render And any time any dependency value changes
        // want to update arrays when q index is 1-5 (indicating next question)
        if (bgNum > 5) { // display old note for ecard
            setnoteText(notesArray[currQIndex]);
        }
        if (currQIndex != 0) { // update notes array before going to next question (this also saves for changes in ecard notes)
            setnotesArray([ // curently just appending to array, so list gets duplicated duing ecard section
                ...notesArray,
                noteText
            ]);
            if (bgNum <= 5) {
                setnoteText('');  
                trashClick('2'); // clear canvas before next question (only for qcards)
            }
        }
      }, [currQIndex]);

    return (
        <div>
            <div className="note-text-cont" version={version}>
                <textarea className="note-input" placeholder="Notes..." onChange={(e) => setnoteText(e.target.value)} value={noteText}></textarea>
            </div>
            <div className="note-draw-cont" version={version}>
                <div className="note-cont icon-pen" onClick={() => {penClick()}} chosen={drawChoice}><img src={pen}/></div>
                <div className="note-cont icon-eraser" onClick={() => {eraserClick()}} chosen={drawChoice}><img src={eraser}/></div>
                <div className="note-cont icon-trash" onClick={() => {trashClick('1')}} chosen={trash}><img src={trashcan}/></div>
                <div className="the-notepad-line"><div className="the-real-line" format="draw"></div></div>
                <div className="whiteboard">
                    <Whiteboard drawColor={drawColor} drawWidth={drawWidth} trash={trash} drawingArray={drawingArray} setdrawingArray={setdrawingArray} currQIndex={currQIndex} bgNum={bgNum}/>
                </div>
            </div>
            <div className="note-ping-cont" version={version}>
                <div>
                    <img src={beach_umbrella} className="beach-umbrella"/>
                    <div className='beach-text-container' story={showStory}>
                        <h3 version={version} story={showStory}>{story1[storyindex]}</h3>
                        <h3 version={version} story={showStory}>{story2[storyindex]}</h3>
                    </div>
                </div>
                <div className="note-ping-beach-cont">
                    <img src={beach} className="ping-beach"/>
                    <img src={beach_peng} className="ping-on-beach" onClick={() => {pingClick()}}/>
                    <img src={beach_ball} className="beach-ball"/>
                </div>
            </div>
            {/* desmos calculator */}
            <div className="note-calc-cont" ref={calculatorRef} version={version.toString()}/>
        </div>
    )
}

export default function TheNotepad({currQIndex, notesArray, setnotesArray, calc, bgNum, drawingArray, setdrawingArray}) {
    const [selectedChoice, setselectedChoice] = useState('1');

    if (selectedChoice == '4' && calc == 'false') {
        setselectedChoice('1');
    }

    return (
        <div className="the-notepad" calculator={calc} move={+bgNum} version={selectedChoice}>
            <div className="note-cont icon-note" onClick={() => {setselectedChoice('1')}} chosen={selectedChoice} calculator={calc}><img src={note}/></div>
            <div className="note-cont draw-note" onClick={() => {setselectedChoice('2')}} chosen={selectedChoice} calculator={calc}><img src={draw}/></div>
            <div className="note-cont ping-note" onClick={() => {setselectedChoice('3')}} chosen={selectedChoice} calculator={calc}><img src={ping}/></div>
            <div className="note-cont calc-note" onClick={() => {setselectedChoice('4')}} chosen={selectedChoice} calculator={calc}><img src={calc_icon}/></div>
            <div className="the-notepad-line" calculator={calc}><div className="the-real-line"></div></div>
            <div className="notepad-content" calculator={calc}>
                <Content version={selectedChoice} calc={calc} currQIndex={currQIndex} notesArray={notesArray} setnotesArray={setnotesArray} bgNum={bgNum} drawingArray={drawingArray} setdrawingArray={setdrawingArray}/>
            </div>
        </div>
    )
}