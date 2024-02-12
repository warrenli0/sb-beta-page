import React, { useState } from "react";
import './App.css';
import LandingPage from "./components/LandingPage";
import WaveTransition from "./components/WaveTransition";
import Start from "./components/Start";
import Main from "./components/Main";

function App() {
  // Properties
  const [showLP, setshowLandingPage] = useState(true);
  const [showTopWave, setShowTopWave] = useState(0);
  const [wavesFinished, setWavesFinished] = useState(true);
  const [showStart, setshowwholeStart] = useState(true);
  const [showMain, setshowMain] = useState('0');

  /*
  if (showLandingPage) {
    return <LandingPage />;
  } else {
    return <WaveTransition />
  }*/
  return (
    <div>
      <LandingPage setShowTopWave={setShowTopWave} showLP={showLP} setshowLandingPage={setshowLandingPage} setWavesFinished={setWavesFinished}/>
      <WaveTransition showTopWave={showTopWave} wavesFinished={wavesFinished} setWavesFinished={setWavesFinished}/>
      <Start showLP={showLP} setshowMain={setshowMain} showMain={showMain} showStart={showStart} setshowwholeStart={setshowwholeStart}/>
      <Main showMain={showMain}/>
    </div>
  )
}

export default App;
