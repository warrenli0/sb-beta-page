import React, { useState } from "react";
import './App.css';
import LandingPage from "./components/LandingPage";
import WaveTransition from "./components/WaveTransition";
import Start from "./components/Start";

function App() {
  // Properties
  const [showLP, setshowLandingPage] = useState(true);
  const [showTopWave, setShowTopWave] = useState(0);

  /*
  if (showLandingPage) {
    return <LandingPage />;
  } else {
    return <WaveTransition />
  }*/
  return (
    <div>
      <LandingPage setShowTopWave={setShowTopWave} showLP={showLP} setshowLandingPage={setshowLandingPage}/>
      <WaveTransition showTopWave={showTopWave}/>
      <Start showLP={showLP} />
    </div>
  )
}

export default App;
