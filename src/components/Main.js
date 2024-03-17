import './Main.css'
import FirstWave from './main-comps/FirstWave';
import Display from './main-comps/Display';
import Dashboard from './main-comps/Dashboard';
import ThxPage from './main-comps/ThxPage';

import pic from '../images/graph-prob.png';

import React, { useState, useEffect } from "react";

export default function Main({showMain, actScores, setActData, actData, setActWeightage, actWeightage, currProblemSet, setcurrProblemSet, choseSAT,
  satWeightage, setsatWeightage, satScores, satData, setsatData, firstBetaButton, log, setlog}) {
    const [showfirstwave, setshowfirstwave] = useState(true); // req T
    const [showQCards, setshowQCards] = useState(true); // req T
    const [showDashoard, setshowDashoard] = useState(false);
    const [showThx, setshowThx] = useState(false);
    const [notesArray, setnotesArray] = useState([]);
    const [drawingArray, setdrawingArray] = useState(['','','','','']);
    const [chosenAnswers, setchosenAnswers] = useState([]);

    const [questions, setQuestions] = useState([{}]);

    useEffect(() => {
      const fetchQuestions = async () => {
        if (choseSAT) {
          console.log("Chose SAT");
          try {
            // Specify the full URL for the backend endpoint
            const response = await fetch('https://sbapidev.com/five-sat');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
      
            // Map backend schema to the frontend schema
            const mappedQuestions = data.map(question => ({
              text: question.problemStatement,
              type: question.category,
              options: question.answerChoices.map((choice, index) => ({
                id: index,
                text: choice.text, 
                isCorrect: choice.isCorrect
              })),
              has_img: question.has_img ?? false,
              img_link: question.img_link ?? '',
              passage: question.passage ?? '',
              explanation: question.explanation ?? '',
            }));

            console.log(mappedQuestions);
      
            setQuestions(mappedQuestions); // Ensure this state setter is correctly named (capitalization)
          } catch (error) {
            console.error('Error fetching SAT questions:', error);
          }
        } else {
          console.log("Chose ACT");
          try {
            // Specify the full URL for the backend endpoint
            const response = await fetch('https://sbapidev.com/five-act');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
      
            // Map backend schema to the frontend schema
            const mappedQuestions = data.map(question => ({
              text: question.problemStatement,
              type: question.category === 'Writing' ? 'English' : (question.category === 'Math (no calc)' || question.category === 'Math (calc)' ? 'Math' : question.category),
              options: question.answerChoices.map((choice, index) => ({
                id: index,
                text: choice.text, 
                isCorrect: choice.isCorrect
              })),
              has_img: question.has_img ?? false,
              img_link: question.img_link ?? '',
              passage: question.passage ?? '',
              explanation: question.explanation ?? '',
            }));

            console.log(mappedQuestions);
      
            setQuestions(mappedQuestions); // Ensure this state setter is correctly named (capitalization)
          } catch (error) {
            console.error('Error fetching ACT questions:', error);
          }
        }
      };
    
      fetchQuestions();
      setnotesArray([]);
      setdrawingArray(['','','','','']);
      setchosenAnswers([]);
    }, [choseSAT, currProblemSet]);    

    if (showMain == '1') {
        return (
            <div>
                {/* Wave */}
                <FirstWave showfirstwave={showfirstwave} setshowfirstwave={setshowfirstwave} currProblemSet={currProblemSet}/>

                <h1 className='top-right-sb'>SB</h1>

                <Dashboard showDashoard={showDashoard} setshowDashoard={setshowDashoard} actScores={actScores} actData={actData} 
                actWeightage={actWeightage} currProblemSet={currProblemSet} setcurrProblemSet={setcurrProblemSet} choseSAT={choseSAT}
                satWeightage={satWeightage} satScores={satScores} satData={satData} setshowThx={setshowThx} log={log} setlog={setlog}
                firstBetaButton={firstBetaButton}/>

                <ThxPage showThx={showThx} setshowThx={setshowThx} choseSAT={choseSAT} actScores={actScores} actData={actData} 
                actWeightage={actWeightage} currProblemSet={currProblemSet} satWeightage={satWeightage} satScores={satScores} 
                satData={satData} firstBetaButton={firstBetaButton} log={log}/>

                {/* Qcards + review page + ecards all in one */}
                <Display questions={questions} showQCards={showQCards} setshowQCards={setshowQCards} notesArray={notesArray} 
                setnotesArray={setnotesArray} chosenAnswers={chosenAnswers} setchosenAnswers={setchosenAnswers} drawingArray={drawingArray} 
                setdrawingArray={setdrawingArray} setshowDashoard={setshowDashoard} setActData={setActData} actData={actData}
                setActWeightage={setActWeightage} actWeightage={actWeightage} currProblemSet={currProblemSet} choseSAT={choseSAT}
                satWeightage={satWeightage} setsatWeightage={setsatWeightage} satData={satData} setsatData={setsatData} log={log} setlog={setlog}/>

            </div>
        )
    }
};
  