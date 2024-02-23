import './Main.css'
import FirstWave from './main-comps/FirstWave';
import Display from './main-comps/Display';
import Dashboard from './main-comps/Dashboard';

import React, { useState, useEffect } from "react";

export default function Main({showMain, actScores, setActData, actData}) {
    const [showfirstwave, setshowfirstwave] = useState(true); // req T
    const [showQCards, setshowQCards] = useState(true); // req T
    const [showDashoard, setshowDashoard] = useState(false);
    const [notesArray, setnotesArray] = useState([]);
    const [drawingArray, setdrawingArray] = useState(['','','','','']);
    const [chosenAnswers, setchosenAnswers] = useState([]);
    

    {/* Request for 5 questions here, replace the questions array, will adapt for 5 new questions once dashboard done */}
    const [questions, setquestions] = useState([{}]);
    useEffect(() => {
        //Runs only on when ready to get batch of questions
        if (showMain == '2') {
          // if actScores[0] == '', means to request SAT questions, otherwise do ACT
          setquestions([
            {
              text: "Maria is staying at a hotel that charges $99.95 per night plus tax for a room. A tax of 8% is applied to the room rate, and an additional onetime untaxed fee of $5.00 is charged by the hotel. Which of the following represents Maria’s total charge, in dollars, for staying x nights?",
              options: [
                { id: 0, text: "(99.95 + 0.08x) + 5", isCorrect: false },
                { id: 1, text: "1.08(99.95x) + 5", isCorrect: true },
                { id: 2, text: "1.08(99.95x + 5)", isCorrect: false },
                { id: 3, text: "1.08(99.95 + 5)x", isCorrect: false },
              ],
              type: "Math (no calc)",
              has_img: false,
              explanation: "The room rate is $99.95 for every night. Since you stay for x nights, the price becomes 99.95x. However, there is a tax of 8% on the room rate, so the price is 0.08(99.95x). Lastly, with the addition of a one time untaxed fee of $5, the answer is the second option: 1.08(99.95x) + 5.",
            },
            {
              text: "What is the real name of You-Know-Who?",
              options: [
                { id: 0, text: "Voldemort", isCorrect: true },
                { id: 1, text: "Warren-san", isCorrect: false },
                { id: 2, text: "Arun Gotnomani", isCorrect: false },
                { id: 3, text: "CTC Enthusiast", isCorrect: false },
              ],
              type: "Reading",
              has_img: false,
              passage: "Mr. and Mrs. Dursley, of number four, Privet Drive, wereproud to say that they were perfectly normal, thankyou very much. They were the last people you’d expect to be in-volved in anything strange or mysterious, because they just didn’thold with such nonsense.Mr. Dursley was the director of a firm called Grunnings, whichmade drills. He was a big, beefy man with hardly any neck, al-though he did have a very large mustache. Mrs. Dursley was thinand blonde and had nearly twice the usual amount of neck, whichcame in very useful as she spent so much of her time craning overgarden fences, spying on the neighbors. The Dursleys had a smallson called Dudley and in their opinion there was no finer boyanywhere.",
              explanation: "Read the first book of the world of witchcraft and wizardry.",
            },
            {
              text: "At Luffy's High School, approximately 7 percent of enrolled juniors and 5 percent of enrolled seniors were inducted into the National Pirate Society last year. If there were 562 juniors and 602 seniors enrolled at Luffy's High School last year, which is closest to the total number of juniors and seniors at Luffy's High School last year who were inducted into the National Pirate Society?",
              options: [
                { id: 0, text: "140", isCorrect: false },
                { id: 1, text: "30", isCorrect: false },
                { id: 2, text: "69", isCorrect: true },
                { id: 3, text: "39", isCorrect: false },
              ],
              type: "Math (calc)",
              explanation: "Since 7 percent of the 562 juniors is 0.07(562) and 5 percent of the 602 seniors is 0.05(602), the expression 0.07(562) + 0.05(602) can be evaluated to determine the total number of juniors and seniors inducted into the National Pirate Society. Of the given choices, 69 is closest to the value of the expression.",
              has_img: true,
              img_link: "https://i.pinimg.com/736x/92/9f/b5/929fb508fc6c76f8df83486b87e74e6e.jpg",
            },
              {
                text: "Greek yogurt business have found many methods of controlling and eliminating most environmental threats. Given these solutions as well as the many health benefits of the food, the advantages of Greek yogurt 'outdo' the potential drawbacks of its production. Since I love this problem so much and I am having so much fun, let me give you the problem not once, but twice! Greek yogurt business have found many methods of controlling and eliminating most environmental threats. Given these solutions as well as the many health benefits of the food, the advantages of Greek yogurt 'outdo' the potential drawbacks of its production. Did you know that I am typing this as a form of procrastination?",
                options: [
                  { id: 0, text: "NO CHANGE", isCorrect: false },
                  { id: 1, text: "defeat", isCorrect: false },
                  { id: 2, text: "outperform", isCorrect: false },
                  { id: 3, text: "outweigh", isCorrect: true },
                ],
                type: "English",
                has_img: false,
                explanation: "“Outweigh” is the only choice between “advantages” and “drawbacks.” Choices 1, 2, and 3 are incorrect because each implies a competitive relationship that is inappropriate in this context.",
              },
              {
                text: "Yogurt manufacturers, food '/*scientists; and/*' government officials are also working together to develop additional solutions for reusing whey.",
                options: [
                  { id: 0, text: "NO CHANGE", isCorrect: false },
                  { id: 1, text: "scientists: and", isCorrect: false },
                  { id: 2, text: "scientists, and", isCorrect: true },
                  { id: 3, text: "scientists, and,", isCorrect: false },
                ],
                type: "Science",
                has_img: false,
                explanation: "Choice 3 is the best answer because it utilizes proper punctuation for items listed in a series. In this case those items are nouns: “Yogurt manufacturers, food scientists, and government officials. Choices 1 and 2 are incorrect because both fail to recognize that the items are a part of a series. Since a comma is used after “manufacturers,” a semicolon or colon should not be used after “scientists.” Choice 4 is incorrect because the comma after “and” is unnecessary and deviates from grammatical conventions for presenting items in a series.",
              },
              {
                text: "At a lunch stand, each hamburger has 50 more calories than each order of fries. If 2 hamburgers and 3 orders of fries have a total of 1700 calories, how many calories does a hamburger have?",
                options: [
                  { id: 0, text: "320", isCorrect: false },
                  { id: 1, text: "370", isCorrect: true },
                  { id: 2, text: "270", isCorrect: false },
                  { id: 3, text: "warren", isCorrect: false },
                ],
                type: "Math (no calc)",
                has_img: false,
                explanation: "The equation 2h + 3f = 1700 represents the fact that 2 hamburgers and 3 orders of fries contain a total of 1700 calories, and the equation h = f + 50 represents the fact that one hamburger contains 50 more calories than an order of fries. Substituting f + 50 for h in 2h + 3f = 1700 gives 2(f + 50) + 3f = 1700, meaning f = 320. Therefore, h = 370.",
              },
              {
                text: "Which choice most effectively combines the two sentences at the quoted portion? Typically, the ice sheet begins to show evidence of thawing in late ‘summer. This’ follows several weeks of higher temperatures.",
                options: [
                  { id: 0, text: "summer, following", isCorrect: true },
                  { id: 1, text: "summer, and this thawing follows", isCorrect: false },
                  { id: 2, text: "summer, and such thawing follows", isCorrect: false },
                  { id: 3, text: "summer and this evidence follows", isCorrect: false },
                ],
                type: "English",
                has_img: false,
                explanation: "Choice 1 is the best answer because it concisely combines the two sentences while maintaining the original meaning. Choices 2, 3, and 4 are incorrect because each is unnecessarily wordy, thus undermining one purpose of combining two sentences: to make the phrasing more concise.",
              },
              {
                text: "Because consumers reap the nutritional benefits of Greek yogurt and support those who make and sell ‘it, therefore farmers’ and businesses should continue finding safe and effective methods of producing the food.",
                options: [
                  { id: 0, text: "NO CHANGE", isCorrect: false },
                  { id: 1, text: "it, farmers", isCorrect: true },
                  { id: 2, text: "it, so farmers", isCorrect: false },
                  { id: 3, text: "it: farmers", isCorrect: false },
                ],
                type: "English",
                has_img: false,
                explanation: "Choice 2 is the best answer because it provides a syntactically coherent and grammatically correct sentence. Choices 1 and 3 are incorrect because the adverbial conjunctions “therefore” and “so,” respectively, are unnecessary following “Because.” Choice 4 is incorrect because it results in a grammatically incomplete sentence (the part of the sentence before the colon must be an independent clause).",
              },
              {
                text: "Neal walks 25 meters in 13.7 seconds. If he walks at this same rate, which of the following is closest to the distance he will walk in 4 minutes?",
                options: [
                  { id: 0, text: "150 meters", isCorrect: false },
                  { id: 1, text: "450 meters", isCorrect: true },
                  { id: 2, text: "700 meters", isCorrect: false },
                  { id: 3, text: "1000 meters", isCorrect: false },
                ],
                type: "Math (calc)",
                has_img: false,
                explanation: "25 meters in 13.7 seconds is a rate of about 1.82 m/s. He walks for 4 minutes which is 240 seconds. The total distance is then (1.82 m/s) * (240 s) = 436.8 m, which is closest to 450 meters.",
              },
              {
                text: "Having become frustrated trying to solve difficult problems, ‘no colleagues were nearby to share ideas’.",
                options: [
                  { id: 0, text: "NO CHANGE", isCorrect: false },
                  { id: 1, text: "colleagues were important for sharing ideas.", isCorrect: false },
                  { id: 2, text: "ideas couldn’t be shared with colleagues.", isCorrect: false },
                  { id: 3, text: "I missed having colleagues nearby to consult.", isCorrect: true },
                ],
                type: "English",
                has_img: false,
                explanation: "Choice 4 is the best answer because it is the only choice that provides a grammatically standard and coherent sentence. The participial phrase “Having become frustrated. . .” functions as an adjective modifying “I,” the writer.",
              },
          ]);
        }
        
      }, [showMain]);

    if (showMain == '1') {
        return (
            <div>
                {/* Wave */}
                <FirstWave showfirstwave={showfirstwave} setshowfirstwave={setshowfirstwave} />

                <h1 className='top-right-sb'>SB</h1>

                <Dashboard showDashoard={showDashoard} setshowDashoard={setshowDashoard} actScores={actScores} actData={actData}/>

                {/* Qcards + review page + ecards all in one */}
                <Display questions={questions} showQCards={showQCards} setshowQCards={setshowQCards} notesArray={notesArray} setnotesArray={setnotesArray} chosenAnswers={chosenAnswers} setchosenAnswers={setchosenAnswers} drawingArray={drawingArray} setdrawingArray={setdrawingArray} setshowDashoard={setshowDashoard} setActData={setActData} actData={actData}/>

            </div>
        )
    }
};
  