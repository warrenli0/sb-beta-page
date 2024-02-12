import note from "../../images/note-icon.png"
import draw from "../../images/draw-icon.png"
import ping from "../../images/ping-icon.png"
import calc_icon from "../../images/calc-icon.png"
import React, { useState, useEffect } from "react";

function Content({version, calc, currQIndex, notesArray, setnotesArray}) {
    const [noteText, setnoteText] = useState('');

    useEffect(() => {
        //Runs on the first render And any time any dependency value changes
        // want to update arrays when q index is 1-5 (indicating next question)
        if (currQIndex != 0) {
            setnotesArray([
                ...notesArray,
                noteText
            ]);
            setnoteText('');    
        }
      }, [currQIndex]);

    if (version == '1'){
        return (
            <textarea className="note-input" placeholder="Notes..." onChange={(e) => setnoteText(e.target.value)} value={noteText}></textarea>
        )
    } else if (version == '2') {
        return (
            <h1>drawing time</h1>
        )
    } else if (version == '3') {
        return (
            <h1>ping time</h1>
        )
    } else if (version == '4') {
        return (
            <h1>calc time</h1>
        )
    }
}

export default function TheNotepad({currQIndex, notesArray, setnotesArray, calc, bgNum}) {
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
                <Content version={selectedChoice} calc={calc} currQIndex={currQIndex} notesArray={notesArray} setnotesArray={setnotesArray} />
            </div>
        </div>
    )
}