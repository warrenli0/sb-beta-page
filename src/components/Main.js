import './Main.css'
import FirstWave from './main-comps/FirstWave';
import Display from './main-comps/Display';

import React, { useState, useEffect } from "react";

export default function Main({showMain}) {
    const [showfirstwave, setshowfirstwave] = useState(true);
    const [showQCards, setshowQCards] = useState(true);
    const [notesArray, setnotesArray] = useState([]);
    const [drawingArray, setdrawingArray] = useState(['','','','','']);
    const [chosenAnswers, setchosenAnswers] = useState([]);
    

    {/* Request for 5 questions here, replace the questions array, will adapt for 5 new questions once dashboard done */}
    const [questions, setQuestions] = useState([{}]);

    useEffect(() => {
      const fetchQuestions = async () => {
        try {
          // Specify the full URL for the backend endpoint
          const response = await fetch('/five-sat');
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
      };
    
      fetchQuestions();
    }, []);    

    if (showMain == '1') {
        return (
            <div>
                {/* Wave */}
                <FirstWave showfirstwave={showfirstwave} setshowfirstwave={setshowfirstwave} />

                <h1 className='top-right-sb'>SB</h1>

                {/* Qcards + review page + ecards all in one */}
                <Display questions={questions} showQCards={showQCards} setshowQCards={setshowQCards} notesArray={notesArray} setnotesArray={setnotesArray} chosenAnswers={chosenAnswers} setchosenAnswers={setchosenAnswers} drawingArray={drawingArray} setdrawingArray={setdrawingArray}/>

            </div>
        )
    }
};
  