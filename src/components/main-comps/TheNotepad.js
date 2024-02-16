import note from "../../images/note-icon.png"
import draw from "../../images/draw-icon.png"
import ping from "../../images/ping-icon.png"
import calc_icon from "../../images/calc-icon.png"
import trashcan from "../../images/trashcan.png"
import eraser from "../../images/eraser.png"
import pen from "../../images/pen.png"

import Whiteboard from "./Whiteboard";
import React, { useState, useEffect } from "react";

function Content({version, calc, currQIndex, notesArray, setnotesArray, bgNum, drawingArray, setdrawingArray}) {
    const [noteText, setnoteText] = useState('');
    const [drawChoice, setdrawChoice] = useState('1');
    const [drawColor, setDrawColor] = useState('black');
    const [drawWidth, setdrawWidth] = useState(5);
    const [trash, setTrash] = useState('0');

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

    useEffect(() => {
        //Runs on the first render And any time any dependency value changes
        // want to update arrays when q index is 1-5 (indicating next question)

        if (bgNum > 5) { // display old note for ecard
            setnoteText(notesArray[currQIndex]);
        }
        if (currQIndex != 0) { // update notes array before going to next question (this also saves for changes in ecard notes)
            setnotesArray([
                ...notesArray,
                noteText
            ]);
            setnoteText('');  
            console.log("Curr drawing array:", drawingArray);
            if (bgNum <= 5) {
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
                <h1>ping time</h1>
            </div>
            <div className="note-calc-cont" version={version}>
                <h1>calc time</h1>
            </div>
        </div>
    )
}

export default function TheNotepad({currQIndex, notesArray, setnotesArray, calc, bgNum, drawingArray, setdrawingArray}) {
    const [selectedChoice, setselectedChoice] = useState('1');

    if (selectedChoice == '4' && calc == 'false') {
        setselectedChoice('1');
    }

    return (
        <div className="the-notepad" calculator={calc} move={+bgNum}>
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