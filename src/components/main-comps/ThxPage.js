import './Thx.css'
import React, { useState, useEffect } from "react";

export default function ThxPage({showThx, setshowThx, choseSAT, actScores, actData, actWeightage, currProblemSet, satWeightage,
    satScores, satData, firstBetaButton, log}) {
        const [email, setemail] = useState("");
        const [fEmail, setfriendEmail] = useState("");

    function ShowData() {
        
        if (choseSAT) { // SAT
            console.log("SAT");
            console.log(satScores);
            console.log(satWeightage);
        } else { // ACT
            console.log("ACT");
            console.log(actScores);
            console.log(actWeightage);
        }
        console.log(log);
        console.log("first beta button pushed:", firstBetaButton);
    }
    
    async function Enter() {
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
    

    //WAR : email
    function submitEmail() {

    }

    //WAR : fEmail for referral
    function friendEmail() {

    }

    if (showThx) {
        
        return (
            <div className='mis-top'>
                <div className='mis-text-cont'>
                    <div className='mis-text'>
                        <h1>You have completed the Beta!</h1>
                        <h1>As promised, input your email below to be in the first group of students to use the full product in early April.</h1>
                        <input type="text" id="user-email" placeholder="Your email" onChange={(e) => setemail(e.target.value)}></input>
                        <div>
                            <h4 className="ocean-submit" onClick={() => Enter()}>Submit</h4>
                        </div>
                    </div>
                </div>
                <div className='mis-beach'></div>
            </div>
        )
    }
}   