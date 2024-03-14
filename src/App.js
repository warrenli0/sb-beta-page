import React, { useState } from "react";
import './App.css';
import LandingPage from "./components/LandingPage";
import WaveTransition from "./components/WaveTransition";
import Start from "./components/Start";
import Main from "./components/Main";
import Mission from "./components/Mission";

function App() {
  // Properties
  const [showLP, setshowLandingPage] = useState(true);
  const [showTopWave, setShowTopWave] = useState(0);
  const [wavesFinished, setWavesFinished] = useState(false);
  const [showStart, setshowwholeStart] = useState(true); // true
  const [showMain, setshowMain] = useState('0'); // 1
  const [showMission, setshowMission] = useState(false); 

  const [actScores, setActScores] = useState(["","","",""]);
  const [actWeightage, setActWeightage] = useState([25, 25, 25, 25]);
  const [satScores, setSatScores] = useState(["",""]);
  const [satWeightage, setsatWeightage] = useState([25, 25, 25, 25]);
  const [choseSAT, setchoseSAT] = useState(true);

  const [firstBetaButton, setfirstBetaButton] = useState(true); // stores if first beta button was clicked or second  
  const [currProblemSet, setcurrProblemSet] = useState(1);
  // attempted, correct, understood, total time
  // 4th field is total seconds spent in this category, average out later
  const [actData, setActData] = useState({Math: {Set1:[0, 0, 0, 0], Set2:[0, 0, 0, 0], Set3:[0, 0, 0, 0], Set4:[0, 0, 0, 0], Set5:[0, 0, 0, 0], Overall:[0, 0, 0, 0]}, 
                                          English: {Set1:[0, 0, 0, 0], Set2:[0, 0, 0, 0], Set3:[0, 0, 0, 0], Set4:[0, 0, 0, 0], Set5:[0, 0, 0, 0], Overall:[0, 0, 0, 0]}, 
                                          Reading: {Set1:[0, 0, 0, 0], Set2:[0, 0, 0, 0], Set3:[0, 0, 0, 0], Set4:[0, 0, 0, 0], Set5:[0, 0, 0, 0], Overall:[0, 0, 0, 0]}, 
                                          Science: {Set1:[0, 0, 0, 0], Set2:[0, 0, 0, 0], Set3:[0, 0, 0, 0], Set4:[0, 0, 0, 0], Set5:[0, 0, 0, 0], Overall:[0, 0, 0, 0]}, }); // 5 [] for 5 problem set cap
  
  const [satData, setsatData] = useState({Reading: {Set1:[0, 0, 0, 0], Set2:[0, 0, 0, 0], Set3:[0, 0, 0, 0], Set4:[0, 0, 0, 0], Set5:[0, 0, 0, 0], Overall:[0, 0, 0, 0]}, 
                                Writing: {Set1:[0, 0, 0, 0], Set2:[0, 0, 0, 0], Set3:[0, 0, 0, 0], Set4:[0, 0, 0, 0], Set5:[0, 0, 0, 0], Overall:[0, 0, 0, 0]}, 
                                "Math (no calc)": {Set1:[0, 0, 0, 0], Set2:[0, 0, 0, 0], Set3:[0, 0, 0, 0], Set4:[0, 0, 0, 0], Set5:[0, 0, 0, 0], Overall:[0, 0, 0, 0]}, 
                                "Math (calc)": {Set1:[0, 0, 0, 0], Set2:[0, 0, 0, 0], Set3:[0, 0, 0, 0], Set4:[0, 0, 0, 0], Set5:[0, 0, 0, 0], Overall:[0, 0, 0, 0]}, }); // 5 [] for 5 problem set cap

  const [log, setlog] = useState({
    /*
    Set1: {
      problemId1: {
        qTime: 10,
        eTime: 5,
        eThumbs: 0,
        understood: false,
        correct: true,
      },
      totalQtime: 30,
      totalEtime: 20, 
    },
    totalSolved: 5*/
  });

  return (
    <div>
      <LandingPage setShowTopWave={setShowTopWave} showLP={showLP} setshowLandingPage={setshowLandingPage} setWavesFinished={setWavesFinished} 
      setfirstBetaButton={setfirstBetaButton} setshowMission={setshowMission}/>
      <WaveTransition showTopWave={showTopWave} wavesFinished={wavesFinished} setWavesFinished={setWavesFinished}/>
      <Start showLP={showLP} setshowMain={setshowMain} showMain={showMain} showStart={showStart} setshowwholeStart={setshowwholeStart} 
      setActScores={setActScores} setSatScores={setSatScores} setActWeightage={setActWeightage} setchoseSAT={setchoseSAT}
      setsatWeightage={setsatWeightage} showMission={showMission}/>
      <Main showMain={showMain} actScores={actScores} setActData={setActData} actData={actData} setActWeightage={setActWeightage} 
      actWeightage={actWeightage} currProblemSet={currProblemSet} setcurrProblemSet={setcurrProblemSet} choseSAT={choseSAT}
      satWeightage={satWeightage} setsatWeightage={setsatWeightage} satScores={satScores} satData={satData} setsatData={setsatData}
      firstBetaButton={firstBetaButton} log={log} setlog={setlog}/>
      <Mission showMission={showMission} setshowMission={setshowMission}/>
    </div>
  )
}

export default App;
