import './Start.css'
import Choose from './start-comps/Choose';
import { useState, useEffect } from "react";

export default function Start({showLP, setshowMain, showMain, showStart, setshowwholeStart, setActScores, setSatScores}) {

    if (!showLP && showStart) {
        return (
            <Choose setshowMain={setshowMain} showMain={showMain} setshowwholeStart={setshowwholeStart} setActScores={setActScores} setSatScores={setSatScores}/>
        )
    }
};
  