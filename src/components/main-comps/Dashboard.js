import './Dashboard.css'
import beach from '../../images/mission-beach.png';
import cont from '../../images/dash-continue.png';
import stars from '../../images/starsbg.png';
import ping_tree from '../../images/peng-on-tree.png';

import React, { useState, useEffect } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Pie, Line } from 'react-chartjs-2';

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.font.size = 14;
defaults.font.weight = 500;     
defaults.font.family = 'Poppins';
defaults.color = 'white';

/* index by types[v]
{
    english: [[# attempted set1, # correct set1, # understood set1, avg time set1], [repeated set2, ...]],
    math: [],
    reading: [],
    science: [],
}*/

function ScoreChart({v, actScores, actData, choseSAT, satScores, satData, fin}) {
    const [types, settypes] = useState(['English', 'Math', 'Reading', 'Science']);
    const types2 = ['Reading', 'Writing', 'Math (no calc)', 'Math (calc)'];
    const types3 = ['Reading', 'Writing', 'No Calc', 'Calc'];
    const [colors, setcolors] = useState(['#EF6C00', '#F73508', '#08CAF7', '#00ED0B',]);
    const colors2 = ['#08CAF7', '#00FF85', '#EF4800', '#FF0000',];
    //score-cont0 for english
    const [width, setWidth] = useState('0%');
    const [width2, setWidth2] = useState('0%');
    useEffect(() => {
        //Runs only on the first render
        // actdata: [# attempted set1, # correct set1, # understood set1, avg time set1]
        setTimeout(function(){
            if (choseSAT) { // SAT
                setWidth(''+((satData[types2[v]]["Overall"][1]/satData[types2[v]]["Overall"][0])*100)+'%');
                setWidth2(''+((satData[types2[v]]["Overall"][2]/satData[types2[v]]["Overall"][0])*100)+'%');
            } else {
                setWidth(''+((actData[types[v]]["Overall"][1]/actData[types[v]]["Overall"][0])*100)+'%');
                setWidth2(''+((actData[types[v]]["Overall"][2]/actData[types[v]]["Overall"][0])*100)+'%');
            }
        }, 3100); // for animation: reduce lower
      }, []);

    if (choseSAT) { // SAT
        return (
            <div className={'score-style score-cont'+v} fin={fin}>
                <div className='score-head'>
                    <h2 style={{color: colors2[v]}}>{types3[v]}</h2> 
                </div>
                <div className='correct-chart'>
                    <h3>{satData[types2[v]]["Overall"][1]}/{satData[types2[v]]["Overall"][0]} Correct</h3>
                    <div className='correct-bar'>
                        {satData[types2[v]]["Overall"][1]
                        ? <div style={{backgroundColor: colors2[v], width: width}} className='inside-correct-bar'></div>
                        : <div></div>}
                        
                    </div>
                </div>
                <div className='correct-chart'>
                    <h3>{satData[types2[v]]["Overall"][2]}/{satData[types2[v]]["Overall"][0]} Understood</h3>
                    <div className='correct-bar'>
                        {satData[types2[v]]["Overall"][2]
                        ? <div style={{backgroundColor: colors2[v], width: width2}} className='inside-correct-bar'></div>
                        : <div></div>}
                        
                    </div>
                </div>
            </div>
        )
    } else { // ACTs
        return (
            <div className={'score-style score-cont'+v} fin={fin}>
                <div className='score-head'>
                    <h2 style={{color: colors[v]}}>{types[v]}</h2> 
                    <h2>{(actScores[v])}</h2>
                </div>
                <div className='correct-chart'>
                    <h3>{actData[types[v]]["Overall"][1]}/{actData[types[v]]["Overall"][0]} Correct</h3>
                    <div className='correct-bar'>
                        {actData[types[v]]["Overall"][1]
                        ? <div style={{backgroundColor: colors[v], width: width}} className='inside-correct-bar'></div>
                        : <div></div>}
                        
                    </div>
                </div>
                <div className='correct-chart'>
                    <h3>{actData[types[v]]["Overall"][2]}/{actData[types[v]]["Overall"][0]} Understood</h3>
                    <div className='correct-bar'>
                        {actData[types[v]]["Overall"][2]
                        ? <div style={{backgroundColor: colors[v], width: width2}} className='inside-correct-bar'></div>
                        : <div></div>}
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default function Dashboard({showDashoard, setshowDashoard, actScores, actData, actWeightage, currProblemSet, setcurrProblemSet, choseSAT,
    satWeightage, satScores, satData, setshowThx, log, setlog, firstBetaButton}) {
    const [graphID, setgraphID] = useState('1');
    const [exit, setexit] = useState('0');
    const [fin, setfin] = useState('0');

    const [email, setEmail] = useState("");
    const [dis, setdis] = useState("");

    const [pieData, setpieData] = useState({
        labels: ['English', 'Math', 'Reading', 'Science'],
        datasets: [
        {
            label: 'weightage %',
            data: actWeightage,
            backgroundColor: [
            '#EF6C00',
            '#F73508',
            '#08CAF7',
            '#00ED0B',
            ],
            borderColor: [
            '#d56000',
            '#d62800',
            '#00a8ce',
            '#00be09',
            ],
            borderWidth: 5,
        },
        ],
    });
    const [corrData, setcorrData] = useState({
        labels: [],
        datasets: [{
          label: 'English',
          data: [],
          fill: false,
          backgroundColor: '#EF6C00',
          borderColor: '#d56000',
          tension: 0.1,
          pointStyle: 'circle',
          pointRadius: 3,
          pointHoverRadius: 3
        },
        {
            label: 'Math',
            data: [],
            fill: false,
            backgroundColor: '#F73508',
            borderColor: '#d62800',
            tension: 0.1,
            pointStyle: 'circle',
          pointRadius: 4,
          pointHoverRadius: 4
        },
        {
            label: 'Reading',
            data: [],
            fill: false,
            backgroundColor: '#08CAF7',
            borderColor: '#00a8ce',
            tension: 0.1,
            pointStyle: 'circle',
          pointRadius: 5,
          pointHoverRadius: 5,
        },
        {
            label: 'Science',
            data: [],
            fill: false,
            backgroundColor: '#00ED0B',
            borderColor: '#00be09',
            tension: 0.1,
            pointStyle: 'circle',
          pointRadius: 6,
          pointHoverRadius: 6
        }]
    });
    const [uddData, setuddData] = useState({
        labels: [],
        datasets: [{
          label: 'English',
          data: [],
          fill: false,
          backgroundColor: '#EF6C00',
          borderColor: '#d56000',
          tension: 0.1,
          pointStyle: 'circle',
          pointRadius: 3,
          pointHoverRadius: 3
        },
        {
            label: 'Math',
            data: [],
            fill: false,
            backgroundColor: '#F73508',
            borderColor: '#d62800',
            tension: 0.1,
            pointStyle: 'circle',
          pointRadius: 4,
          pointHoverRadius: 4
        },
        {
            label: 'Reading',
            data: [],
            fill: false,
            backgroundColor: '#08CAF7',
            borderColor: '#00a8ce',
            tension: 0.1,
            pointStyle: 'circle',
          pointRadius: 5,
          pointHoverRadius: 5,
        },
        {
            label: 'Science',
            data: [],
            fill: false,
            backgroundColor: '#00ED0B',
            borderColor: '#00be09',
            tension: 0.1,
            pointStyle: 'circle',
          pointRadius: 6,
          pointHoverRadius: 6
        }]
    });
    const [timeData, settimeData] = useState({
        labels: [],
        datasets: [{
          label: 'English',
          data: [],
          fill: false,
          backgroundColor: '#EF6C00',
          borderColor: '#d56000',
          tension: 0.1,
          pointStyle: 'circle',
          pointRadius: 3,
          pointHoverRadius: 3
        },
        {
            label: 'Math',
            data: [],
            fill: false,
            backgroundColor: '#F73508',
            borderColor: '#d62800',
            tension: 0.1,
            pointStyle: 'circle',
          pointRadius: 4,
          pointHoverRadius: 4
        },
        {
            label: 'Reading',
            data: [],
            fill: false,
            backgroundColor: '#08CAF7',
            borderColor: '#00a8ce',
            tension: 0.1,
            pointStyle: 'circle',
          pointRadius: 5,
          pointHoverRadius: 5,
        },
        {
            label: 'Science',
            data: [],
            fill: false,
            backgroundColor: '#00ED0B',
            borderColor: '#00be09',
            tension: 0.1,
            pointStyle: 'circle',
          pointRadius: 6,
          pointHoverRadius: 6
        }]
    });

    const [corrData2, setcorrData2] = useState({
        labels: [],
        datasets: [{
          label: 'Reading',
          data: [],
          fill: false,
          backgroundColor: '#08CAF7',
          borderColor: '#00a8ce',
          tension: 0.1,
          pointStyle: 'circle',
          pointRadius: 3,
          pointHoverRadius: 3
        },
        {
            label: 'Writing',
            data: [],
            fill: false,
            backgroundColor: '#00FF85',
            borderColor: '#00B15C',
            tension: 0.1,
            pointStyle: 'circle',
          pointRadius: 4,
          pointHoverRadius: 4
        },
        {
            label: 'Math (no calc)',
            data: [],
            fill: false,
            backgroundColor: '#EF4800',
            borderColor: '#CC3D00',
            tension: 0.1,
            pointStyle: 'circle',
          pointRadius: 5,
          pointHoverRadius: 5,
        },
        {
            label: 'Math (calc)',
            data: [],
            fill: false,
            backgroundColor: '#FF0000',
            borderColor: '#CE0000',
            tension: 0.1,
            pointStyle: 'circle',
          pointRadius: 6,
          pointHoverRadius: 6
        }]
    });
    const [uddData2, setuddData2] = useState({
        labels: [],
        datasets: [{
          label: 'Reading',
          data: [],
          fill: false,
          backgroundColor: '#08CAF7',
          borderColor: '#00a8ce',
          tension: 0.1,
          pointStyle: 'circle',
          pointRadius: 3,
          pointHoverRadius: 3
        },
        {
            label: 'Writing',
            data: [],
            fill: false,
            backgroundColor: '#00FF85',
            borderColor: '#00B15C',
            tension: 0.1,
            pointStyle: 'circle',
          pointRadius: 4,
          pointHoverRadius: 4
        },
        {
            label: 'Math (no calc)',
            data: [],
            fill: false,
            backgroundColor: '#EF4800',
            borderColor: '#CC3D00',
            tension: 0.1,
            pointStyle: 'circle',
          pointRadius: 5,
          pointHoverRadius: 5,
        },
        {
            label: 'Math (calc)',
            data: [],
            fill: false,
            backgroundColor: '#FF0000',
            borderColor: '#CE0000',
            tension: 0.1,
            pointStyle: 'circle',
          pointRadius: 6,
          pointHoverRadius: 6
        }]
    });
    const [timeData2, settimeData2] = useState({
        labels: [],
        datasets: [{
          label: 'Reading',
          data: [],
          fill: false,
          backgroundColor: '#08CAF7',
          borderColor: '#00a8ce',
          tension: 0.1,
          pointStyle: 'circle',
          pointRadius: 3,
          pointHoverRadius: 3
        },
        {
            label: 'Writing',
            data: [],
            fill: false,
            backgroundColor: '#00FF85',
            borderColor: '#00B15C',
            tension: 0.1,
            pointStyle: 'circle',
          pointRadius: 4,
          pointHoverRadius: 4
        },
        {
            label: 'Math (no calc)',
            data: [],
            fill: false,
            backgroundColor: '#EF4800',
            borderColor: '#CC3D00',
            tension: 0.1,
            pointStyle: 'circle',
          pointRadius: 5,
          pointHoverRadius: 5,
        },
        {
            label: 'Math (calc)',
            data: [],
            fill: false,
            backgroundColor: '#FF0000',
            borderColor: '#CE0000',
            tension: 0.1,
            pointStyle: 'circle',
          pointRadius: 6,
          pointHoverRadius: 6
        }]
    });


    useEffect(() => {
        //console.log(satWeightage);
        if (showDashoard) {
            // when dashboard is true, calculate in the datas for graphs
            var setNum = "Set" + currProblemSet;       
            //console.log(actData);
            //console.log("sat data", satData);

            // attempted, correct, understood, total time
            // % correct
            const sections = ['English', 'Math', 'Reading', 'Science']; // ACT
            const section2 = ['Reading', 'Writing', 'Math (no calc)', 'Math (calc)']; // SAT

            if (choseSAT) {
                var cd = corrData2;
                var ud = uddData2;
                var td = timeData2;
                cd.labels.push(currProblemSet);
                ud.labels.push(currProblemSet);
                td.labels.push(currProblemSet);
                for (let i = 0; i < 4; i++) {
                    if (satData[section2[i]][setNum][0] == 0) { // no problems given in that set
                        cd.datasets[i].data.push(NaN);
                        ud.datasets[i].data.push(NaN);
                        td.datasets[i].data.push(NaN);
                    } else {
                        cd.datasets[i].data.push((satData[section2[i]][setNum][1] / satData[section2[i]][setNum][0]) * 100);
                        ud.datasets[i].data.push((satData[section2[i]][setNum][2] / satData[section2[i]][setNum][0]) * 100);
                        td.datasets[i].data.push((satData[section2[i]][setNum][3] / satData[section2[i]][setNum][0]));
                    }
                }
                setcorrData(cd);
                setuddData(ud);
                settimeData(td);
            } else {
                var cd = corrData;
                var ud = uddData;
                var td = timeData;
                cd.labels.push(currProblemSet);
                ud.labels.push(currProblemSet);
                td.labels.push(currProblemSet);
                for (let i = 0; i < 4; i++) {
                    if (actData[sections[i]][setNum][0] == 0) { // no problems given in that set
                        cd.datasets[i].data.push(NaN);
                        ud.datasets[i].data.push(NaN);
                        td.datasets[i].data.push(NaN);
                    } else {
                        cd.datasets[i].data.push((actData[sections[i]][setNum][1] / actData[sections[i]][setNum][0]) * 100);
                        ud.datasets[i].data.push((actData[sections[i]][setNum][2] / actData[sections[i]][setNum][0]) * 100);
                        td.datasets[i].data.push((actData[sections[i]][setNum][3] / actData[sections[i]][setNum][0]));
                    }
                }
                setcorrData(cd);
                setuddData(ud);
                settimeData(td);
            }

            // SAT chosen
            if (choseSAT) {
                setpieData({
                    labels: ['Reading', 'Writing', 'Math (no calc)', 'Math (calc)'],
                    datasets: [
                    {
                        label: 'weightage %',
                        data: satWeightage  ,
                        backgroundColor: [
                        '#08CAF7',
                        '#00FF85',
                        '#EF4800',
                        '#FF0000',
                        ],
                        borderColor: [
                        '#00a8ce',
                        '#00B15C',
                        '#CC3D00',
                        '#CE0000',
                        ],
                        borderWidth: 5,
                    },
                    ],
                });
            }
        }
        
    }, [showDashoard]); 

    function tryFive(){
        if (exit == '0') {
            setexit('1'); // moves bbg up
            setcurrProblemSet(currProblemSet + 1);
            setTimeout(function(){
                setshowDashoard(false);
                setexit('0');
                setgraphID('1');
            }, 6100);
        }
    };

    function finish() {
        if (fin == '0') {
            setlog({ // update elog
                ...log,
                totalSolved: (currProblemSet * 5),
            });
            //setshowThx(true);
            setfin('1');
        }
    }

     //WAR : email
     async function submitEmail() {
        const data = {
            email,
            choseSAT,
            satScores,
            satWeightage,
            actScores,
            actWeightage,
            firstBetaButton,
            "log": JSON.stringify(log),
        };
        console.log(email);
    
        try {
            const response = await fetch('https://sbapidev.com/submit-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const responseData = await response.json();
            console.log(responseData.message);
            // Handle success (e.g., show a success message or redirect the user)
    
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            // Handle errors (e.g., show an error message)
        }
    }

    //WAR : fEmail for referral
    function friendEmail() {    
        // var: fEmail
        const data = {
            email,
        };

        try {
            const response = await fetch('https://sbapidev.com/submit-referral', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const responseData = await response.json();
            console.log(responseData.message);
    
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    if (showDashoard) {
        // different version if its SAT or ACT
        return (
            <div className='dashboard-bg' exit={exit}>
                <div className='dash-stars'>
                    <img src={stars}/>
                </div>
                <div className='dash-header' fin={fin}>
                    <h1>Let's <span style={{color: "#FFB800"}}>analyze</span>  how you did...</h1>
                </div>
                <div className='eng-header' version={+(choseSAT)} fin={fin}>
                    <h2>English</h2> 
                    <h2>{(satScores[0])}</h2> 
                </div>
                <div className='mat-header' version={+(choseSAT)} fin={fin}>
                    <h2>Math</h2> 
                    <h2>{(satScores[1])}</h2>
                </div>
                <ScoreChart v={0} actScores={actScores} actData={actData} choseSAT={choseSAT} satScores={satScores} satData={satData} fin={fin}/>
                <ScoreChart v={1} actScores={actScores} actData={actData} choseSAT={choseSAT} satScores={satScores} satData={satData} fin={fin}/>
                <ScoreChart v={2} actScores={actScores} actData={actData} choseSAT={choseSAT} satScores={satScores} satData={satData} fin={fin}/>
                <ScoreChart v={3} actScores={actScores} actData={actData} choseSAT={choseSAT} satScores={satScores} satData={satData} fin={fin}/>
                <div className='line-chart' fin={fin}>
                    <form className='line-header'>
                        <label htmlFor="cars">Set vs</label>
                        <select name="cars" id="cars" onChange={(e=> setgraphID(e.target.value))}>
                            <option value = "1">Avg Solve Time</option>
                            <option value = "2">% Correct</option>
                            <option value = "3">% Understood</option>
                        </select>
                    </form>
                    <div className='line-container' version={graphID}>
                        <Line 
                        data={timeData} 
                        options= {{
                            plugins: {
                                legend: {
                                    position: "bottom",
                                    labels: {
                                        boxWidth: 20,
                                    },
                                    onHover: (event, chartElement) => {
                                        event.native.target.style.cursor = 'pointer';
                                    },
                                    onLeave: (event, chartElement) => {
                                        event.native.target.style.cursor = 'default';
                                    }
                                },
                            },
                            layout: {
                                padding: 10,
                            },
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Problem Set',
                                        align: 'center',
                                    }
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Avg Solve Time',
                                        align: 'center',
                                    },
                                    suggestedMin: 0
                                }
                            }
                        }}/>
                    </div>
                    <div className='line-container2' version={graphID}>
                        <Line 
                        data={corrData} 
                        options= {{
                            plugins: {
                                legend: {
                                    position: "bottom",
                                    labels: {
                                        boxWidth: 20,
                                    },
                                    onHover: (event, chartElement) => {
                                        event.native.target.style.cursor = 'pointer';
                                    },
                                    onLeave: (event, chartElement) => {
                                        event.native.target.style.cursor = 'default';
                                    }
                                },
                            },
                            layout: {
                                padding: 10,
                            },
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Problem Set',
                                        align: 'center',
                                    }
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: '% Correct',
                                        align: 'center',
                                    },
                                    suggestedMin: 0,
                                    suggestedMax: 100
                                }
                            },
                        }}/>
                    </div>
                    <div className='line-container3' version={graphID}>
                        <Line 
                        data={uddData} 
                        options= {{
                            plugins: {
                                legend: {
                                    position: "bottom",
                                    labels: {
                                        boxWidth: 20,
                                    },
                                    onHover: (event, chartElement) => {
                                        event.native.target.style.cursor = 'pointer';
                                    },
                                    onLeave: (event, chartElement) => {
                                        event.native.target.style.cursor = 'default';
                                    }
                                },
                            },
                            layout: {
                                padding: 10,
                            },
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Problem Set',
                                        align: 'center',
                                    }
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: '% Understood',
                                        align: 'center',
                                    },
                                    suggestedMin: 0,
                                    suggestedMax: 100
                                }
                            }
                        }}/>
                    </div>
                    <div className='line-message' version={+currProblemSet}>
                        <p>Do one more practice set to compare results!</p>
                    </div>
                </div>
                <div className='dash-pie' fin={fin}>
                    <div className='pie-text'>
                        <h2>Personalized Algorithm</h2>
                        <h4><i>This is how we determine what questions you get in the future based on your accuracy, understanding, and scores. We prioritize your weak areas and reinforce your strong ones.</i></h4>
                    </div>
                    <div className='pie-container'>
                        <Pie 
                        data={pieData} 
                        options= {{
                            plugins: {
                                legend: {
                                    display: false,
                                    position: "right",
                                    labels: {
                                        boxWidth: 20,
                                    },
                                    onClick: null,
                                },
                            },
                            layout: {
                                padding: 50,
                            }
                        }}/>
                    </div>
                    {/*<div className='pie-legend'>
                        <div className='legend-cont'>
                            <div className='pie-box english-orange'></div>
                            <h4>English</h4>
                        </div>
                        <div className='legend-cont'>
                            <div className='pie-box math-red'></div>
                            <h4>Math</h4>
                        </div>
                        <div className='legend-cont'>
                            <div className='pie-box reading-blue'></div>
                            <h4>Reading</h4>
                        </div>
                        <div className='legend-cont'>
                            <div className='pie-box science-green'></div>
                            <h4>Science</h4>
                        </div>
                    </div>*/}
                </div>
                <div className='dash-try' fin={fin}>
                    <h1 onClick={() => {tryFive()}}>Try <span style={{color: "#FFB800"}}>5 new</span> problems</h1>
                    <h4><i>adjusted to fit your algorithm!</i></h4>
                </div>
                    <div className='dash-tree-container' fin={fin}>
                    <img src={ping_tree} className="coconut-tree"/>
                </div>
                <div className='dash-done' fin={fin}>
                    <h1>You have completed the <span style={{color: '#FFB800'}}>Beta!</span></h1>
                    <h2>As promised, input your email below to be in the first group of students to use the full product in late March.</h2>
                    <input disabled={dis} type="email" id="user_email" placeholder="Your email" onChange={(e) => setEmail(e.target.value)}></input>
                    <div className=""> 
                        <h3 className="dash-submit" dis={dis} onClick={() => submitEmail()}>Submit</h3>
                    </div>
                </div>
                <div className='dash-beach'>
                    <img src={beach}/>
                </div>
                <div className='dash-cont' fin={fin}>
                    <img src={cont} onClick={() => {finish()}}/>
                </div>
            </div>
        ) 
    }
}