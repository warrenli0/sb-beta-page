import './Main.css'
import FirstWave from './main-comps/FirstWave';
import Display from './main-comps/Display';
import Dashboard from './main-comps/Dashboard';
import ThxPage from './main-comps/ThxPage';

import React, { useState, useEffect } from "react";
import { queryAllByLabelText } from '@testing-library/react';

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
    const [qlist, setqList] = useState([]);

    useEffect(() => {
      const fetchQuestions = async () => {
        if (choseSAT) {
          //console.log("Chose SAT");

          try {
            // Specify the full URL for the backend endpoint
            // const response = await fetch('https://sbapidev.com/five-sat');
            // if (!response.ok) {
            //   throw new Error('Network response was not ok');
            // }
            let params = {};

            // prob set has changed, request new problems
            if (currProblemSet > 1) {
              // console.log(qlist); // make sure new Q ids are not in this list
              const satTypes = ['reading', 'grammar', 'math', 'calc'];
              let index = 0;
              let largest = 0;
              for(let i = 0; i < satWeightage.length; i++) {
                if (+satWeightage[i] > largest) {
                  largest = +satWeightage[i];
                  index = i;
                }
              }
              //satTypes[index] is weakest area
              // console.log(satTypes[index]);
              // qList is list of all Q ids
              //WAR
              params = {
                excludedIds: qlist.join(','),
                area: satTypes[index]
              };
            }

            let url = new URL('https://sbapidev.com/five-sat');
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

            const response = await fetch(url.toString());
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }

            const data = await response.json();
      
            // Map backend schema to the frontend schema
            const mappedQuestions = data.map(question => ({
              id: question._id,
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
              author: question.author ?? '',
            }));

            // console.log(mappedQuestions);
            // maintain list of all question idS
            const tempA = [];
            mappedQuestions.forEach((q) => (
              tempA.push(q.id)
            ));
            setqList(qlist.concat(tempA));
      
            setQuestions(mappedQuestions); // Ensure this state setter is correctly named (capitalization)
          } catch (error) {
            // console.error('Error fetching SAT questions:', error);
          }
        } else {
          //console.log("Chose ACT");
          try {
            // Specify the full URL for the backend endpoint
            // const response = await fetch('https://sbapidev.com/five-act');
            // if (!response.ok) {
            //   throw new Error('Network response was not ok');
            // }
            let params = {};

            // prob set has changed, request new problems
            if (currProblemSet > 1) {
              const actTypes = ['english', 'math', 'reading', 'science'];
              let index = 0;
              let largest = 100;
              for(let i = 0; i < actWeightage.length; i++) {
                if (+actWeightage[i] > largest) {
                  largest = +actWeightage[i];
                  index = i;
                }
              }
              //acttypes[index] is weakest area
              //WAR
              params = {
                excludedIds: qlist.join(','),
                area: actTypes[index]
              };
            }

            let url = new URL('https://sbapidev.com/five-act');
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

            const response = await fetch(url.toString());
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }

            const data = await response.json();
      
            // Map backend schema to the frontend schema
            const mappedQuestions = data.map(question => ({
              id: question._id,
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
              author: question.author ?? '',
            }));

            // console.log(mappedQuestions);
            // maintain list of all question idS
            const tempA = [];
            mappedQuestions.forEach((q) => (
              tempA.push(q.id)
            ));
            setqList(qlist.concat(tempA));
      
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
  