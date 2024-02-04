import green_fish_right from '../../images/green-fish-right.png';
import green_fish from '../../images/green-fish-left.png';
import orange_fish_left from '../../images/orange_fish_left.png';
import big_orange from '../../images/big_orange_fish_right.png';
import orange_whale from '../../images/big-orange-whale.png';
import database from '../../images/database.png';
import dashboard from '../../images/old-dashboard.png';
import discord from '../../images/temp-discord.png';
import practice_problem from '../../images/prac-prob.png';
import useFadeIn from '../../hooks/useFadeIn';
import { useRef, useState } from "react";

export default function SbInfo() {
    const divRef = useRef(null);
    useFadeIn(divRef);
    const divRef2 = useRef(null);
    useFadeIn(divRef2);
    const divRef3 = useRef(null);
    useFadeIn(divRef3);
    const divRef4 = useRef(null);
    useFadeIn(divRef4);
    const divRef5 = useRef(null);
    useFadeIn(divRef5);
    const divRef6 = useRef(null);
    useFadeIn(divRef6);
    const divRef7 = useRef(null);
    useFadeIn(divRef7);
    const divRef8 = useRef(null);
    useFadeIn(divRef8);
    const divRef9 = useRef(null);
    useFadeIn(divRef9);

    return (
        <div className="sb-page">
            <div className="fish5">
                <img src={orange_fish_left} />
            </div>
            <div className="green-fish-right">
                <img src={green_fish_right} />
            </div>
            <div className="green-fish2">
                <img src={green_fish} />
            </div>
            <div className="big-orange">
                <img src={big_orange} />
            </div>
            <div className="big-orange-whale">
                <img src={orange_whale} />
            </div>
            <div className="sb-grid">
                <div className="sb-header-text" ref={divRef}>
                    <div className='hidden'>
                        <h1>so... what is Scholars Beacon?</h1>
                        <h3>a SAT/ACT online prep platform that incorporates all values mentioned above to increase your score</h3>
                    </div>
                </div>
                <div className="sb-item-text" ref={divRef2}>
                    <div className='hidden'>
                        <h3>Question list of <b style={{color: '#FFB800'}}>1000+ problems</b> ranging in all topics – categorized by <b style={{color: '#FFB800'}}>subtopics {'&'} difficulty</b></h3>
                    </div>
                </div>
                <div className="sb-img" ref={divRef3}>
                    <img src={database} className="hidden2" id="database-pic"/>
                </div>
                <div className="sb-img" ref={divRef4}>
                    <img src={dashboard} className="hidden2"/>
                </div>
                <div className="sb-item-text" ref={divRef5}>
                    <div className='hidden'>
                        <h3><b style={{color: '#FFB800'}}>Analytics dashboard</b> to highlight your strong and weak areas</h3>
                    </div>
                </div>
                <div className="sb-item-text" ref={divRef6}>
                    <div className='hidden'>
                        <h3>The fastest growing SAT/ACT <b style={{color: '#FFB800'}}>online community</b> — study and learn together!</h3>
                    </div>
                </div>
                <div className="sb-img" ref={divRef7}>
                    <img src={discord} className="hidden2"/>
                </div>
                <div className="sb-img" ref={divRef8}>
                    <img src={practice_problem} className="hidden2"/>
                </div>
                <div className="sb-item-text" ref={divRef9}>
                    <div className='hidden'>
                        <h3>Daily <b style={{color: '#FFB800'}}>personalized</b> practice problems determined by your performance</h3>
                    </div>
                </div>
              </div> 
        </div>
    )
}