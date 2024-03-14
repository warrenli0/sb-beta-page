import './Start.css'
import Choose from './start-comps/Choose';

export default function Start({showLP, setshowMain, showMain, showStart, setshowwholeStart, setActScores, setSatScores, setActWeightage, setchoseSAT,
    setsatWeightage, showMission}) {

    if (!showLP && showStart && !showMission) {
        return (
            <Choose setshowMain={setshowMain} showMain={showMain} setshowwholeStart={setshowwholeStart} setActScores={setActScores} 
            setSatScores={setSatScores} setActWeightage={setActWeightage} setchoseSAT={setchoseSAT} setsatWeightage={setsatWeightage}/>
        )
    }
};
  