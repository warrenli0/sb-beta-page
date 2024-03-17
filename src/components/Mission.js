import './Mission.css'
import React, { useState, useEffect } from "react";

import cool from '../images/cool-peng.png';
import brown from '../images/brown.png';
import yale from '../images/yale.png';
import pur from '../images/purdue.png';
import geo from '../images/georgia.png';
import mit from '../images/mit.png';
import ani from '../images/ani.png';
import war from '../images/war.png';
import aru from '../images/aru.png';
import fb from '../images/fb.png';
import disc from '../images/gray-disc.png';
import insta from '../images/insta.png';

import sleep from '../images/ping-sleep.png';
import handup from '../images/hand-up-ping.png';
import lying from '../images/lying-ping.png';


export default function Mission({showMission, setshowMission}) {
    const [showStory, setshowStory] = useState('0');
    const [emMsg, setemMsg] = useState("Know when we release:");
    const [friendMsg, setfriendMsg] = useState("Share this with friends:");
    const [email, setEmail] = useState("");
    const [friendEmail, setfriendEmail] = useState("");
    const [dis, setdis] = useState("");
    const [personType, setpersonType] = useState("Parent");

    function buttonOne() {

    }

    // WAR
    async function submitEmail() {
        const ele = document.getElementById("user_email");
        if (ele.validity.valid && dis!="disabled" && email != "") {
            setdis("disabled");
            setemMsg("Thank you — we will be in touch soon!");
        }

        const data = {
            email: document.getElementById("user_email"),
        };

        try {
            const response = await fetch('https://sbapidev.com/submit-email', { // Make sure the URL matches your backend's address
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

    // WAR
    function submitFriendEmail() {
        const ele = document.getElementById("friend_email");
        if (ele.validity.valid && dis!="disabled" && friendEmail != "") {
            //console.log("friend", friendEmail);
            setfriendMsg("Share with more friends!");
            setfriendEmail("");
        }
    }

    useEffect(() => {
        if (showMission) {
            setTimeout(function(){
                setshowStory('1'); // show text
            }, 2000);
        }
    }, [showMission]);

    if (showMission) {
        return (
            <div className='mission-cont'>
                <h1 className='mis-top-right'>SB</h1>
                <div className='mis-top'>
                    <div className='mis-text-cont'>
                        <div className='mis-text'>
                            <h1><b>We give students the motivation to score well.</b> Scholars Beacon provides the tools and guidance students need to conquer the SAT & ACT.</h1>
                            <div>
                                <h2 className='mis-button' onClick={() => buttonOne()}>I'm interested!</h2>
                            </div>
                            <h4>Read about our mission below</h4>
                        </div>
                    </div>
                    <div className='mis-beach'></div>
                    <div className='cool-cont'>
                        <div>
                            <div className='mis-text-container' story={showStory}>
                                <h3 story={showStory}>Mission: Crack</h3>
                                <h3 story={showStory}>the SAT / ACT</h3>
                            </div>
                        </div>
                        <img src={cool} className="mis-peng"/>
                    </div>
                </div>
                <div className='mis-main'>
                    <div className='mis-cont-part'>
                        <img src={sleep} className="sleep-peng"/>
                        <img src={handup} className="hand-peng"/>
                        <div className='mission-text'>
                            <h2>We all know the SAT/ACT is important, but why are the vast majority of students so unmotivated to prepare for it?</h2>
                            <h2>Well, test prep is boring. It's tedious. It's lonely having to take exam after exam by yourself for hours on end.</h2>
                            <h2>More-so, standardized test scores correlate with family income. Most students can't afford to pay exuberant pricing for one-on-one tutoring.</h2>
                            <h2><b>We want to change all of that. We will make SAT/ACT preparation fun, engaging and affordable for every single student.</b></h2>
                            <h2>This is Scholars Beacon. The only SAT/ACT online prep platform you will need to achieve your dream score.</h2>
                            <h2>Made by students, for students.</h2>
                        </div>
                    </div>
                    <div className='mis-divider'></div>
                    <div className='mis-imp'>
                        <h1>These tests are more important now than ever.</h1>
                        <h2>Schools are <b>REINSTATING REQUIREMENTS</b> for the SAT & ACT!</h2>
                        <div className='mis-imgs'>
                            <img src={brown} className=""/>
                            <img src={yale} className=""/>
                        </div>
                        <div className='mis-imgs2'>
                            <img src={pur} className=""/>
                            <img src={geo} className=""/>
                            <img src={mit} className=""/>
                        </div>
                        <div></div>
                        <h2>The SAT & ACT is <b>7x more indicative</b> of college success than high school GPA. Studies have shown that higher test scores lead to higher first-year college GPAs.</h2>
                        <h3>According to Dartmouth’s study: “Role of Standardized Test Scores in Undergraduate Admissions”</h3>
                        <div className='mis-but-cont'>
                            <h2 className='mis-button' onClick={() => buttonOne()}>I'm interested!</h2>
                        </div>
                    </div>
                    <div className='mis-divider'></div>
                    <div className='mis-story-cont'>
                        <h1>Our Story</h1>
                        <div className='mis-story'>
                            <div className='mis-story-text'>
                                <h2>One of our co-founders, Aniket, was stuck at a score of 31 on the ACT. Like many students, he absolutely hated going to test prep and would pretend to complete his practice tests. Two weeks before his exam date, he came to the realization: <b>you can't expect the result if you don't put in the effort.</b></h2>
                                <h2><b>Aniket got a 36.</b></h2>
                                <h2>This is the most important factor in succeeding on these tests. Many students and parents go searching for “new strategies”, but the missing piece is simple - <i> full dedication.</i></h2>
                                <h2>His friends, Arun and Warren, scored in the top 1% of the SAT also by changing their mindset.</h2>
                            </div>
                            <div className='mis-story-img'>
                                <div className='mis-img-cont'>
                                    <img src={ani} className=""/>
                                    <div className='mis-img-txt'>
                                        <h2><b>Aniket Nayak</b></h2>
                                        <ul>
                                            <li>UMD CS Degree in 2 Years</li>
                                            <li>Tutoring since middle school</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='mis-img-cont'>
                                    <img src={war} className=""/>
                                    <div className='mis-img-txt'>
                                        <h2><b>Warren Li</b></h2>
                                        <ul>
                                            <li>UIUC & UCSD CS</li>
                                            <li>2 SWE Internships</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='mis-img-cont'>
                                    <img src={aru} className=""/>
                                    <div className='mis-img-txt'>
                                        <h2><b>Arun Khemani</b></h2>
                                        <ul>
                                            <li>Bentley Finance</li>
                                            <li>Taught 1,000+ students across various subjects</li>
                                            <li>Interned at 3 VC firms</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mis-divider'></div>
                    <div className='mis-cont-part'>
                        <img src={lying} className="lying-peng"/>
                        <div className='mission-text'>
                            <h1>We know what students need to succeed.</h1>
                            <h2>After talking to <b>hundreds</b> of students, tutors, and parents, we learned that:</h2>
                            <h2><b>Students</b> say they struggle to find the motivation to study on their own.</h2>
                            <h2><b>Tutors</b> say it is difficult getting students to consistently do practice problems/exams in between sessions.</h2>
                            <h2><b>Parents</b> say they want to be regularly updated to know if their child is truly improving.</h2>
                            <h2>We decided to tackle these issues by making a platform that incorporates the three main components that will help any student achieve their dream score: <b>repetition, accountability, community.</b></h2>
                            <div className='mis-but-cont'>
                                <h2 className='mis-button' onClick={() => buttonOne()}>I'm interested!</h2>
                            </div>
                        </div>
                    </div>
                    <div className='mis-divider'></div>
                    <div className='mission-text'>
                        <h1>All the tools needed for success.</h1>
                        <div>
                            <h2><b>Repetition:</b> The best way for students to learn from their mistakes is thoroughly reviewing what they didn't understand and repeating the problem until they get it correct.</h2>
                            <h2><b>We Provide:</b></h2>
                            <ul>
                                <li><h2>Daily personalized practice sets</h2></li>
                                <li><h2>Weekly proctored mock exams</h2></li>
                                <li><h2>Questions written by top academies</h2></li>
                            </ul>
                        </div>
                        <div>
                            <h2><b>Accountability:</b> Staying consistent is the most important part of success, so we establish systems to ensure students are constantly improving.</h2>
                            <h2><b>We Provide:</b></h2>
                            <ul>
                                <li><h2>Analytics dashboard that highlights strong and weak areas</h2></li>
                                <li><h2>Customizable performance updates for parents, tutors, friends, and the student themselves</h2></li>
                                <li><h2>Virtual pet — grows with your progress!</h2></li>
                            </ul>
                        </div>
                        <div>
                            <h2><b>Community:</b> Being surrounded by driven peers, <b>receiving personalized support from tutors within an hour,</b> and accessing the best resources are just a few benefits of being part of an active community of students all looking to improve their test scores.</h2>
                            <h2><b>We Provide:</b></h2>
                            <ul>
                                <li><h2>A Discord server, the best online platform for collaboration and asking questions</h2></li>
                                <li><h2>24/7 help — anytime, anywhere!</h2></li>
                            </ul>
                        </div>
                    </div>
                    <div className='mis-divider-full'></div>
                    <div className='mission-text-center'>
                        <h2>This is Scholars Beacon.</h2>
                        <h2><i>Official Release in April</i></h2>
                    </div>  
                    <div className='mis-divider-full'></div>
                    <div className='mis-email-cont'>
                        <div className='mis-email-enter'>
                            <h1>{emMsg}</h1>
                            <input type="email" id="user_email" disabled={dis} placeholder="Your email" onChange={(e) => setEmail(e.target.value)}></input>
                            <div className='mis-submit-cont'>
                                <h4 className="mis-submit" dis={dis} onClick={() => submitEmail()}>Submit</h4>
                            </div>
                        </div>
                        <div className='mis-email-enter'>
                            <h1>{friendMsg}</h1>
                            <input type="email" id="friend_email" placeholder="Their email" value={friendEmail} onChange={(e) => setfriendEmail(e.target.value)}></input>
                            <div className='mis-submit-cont'>
                                <h4 className="mis-submit" onClick={() => submitFriendEmail()}>Submit</h4>
                            </div>
                        </div>
                    </div>
                    <div className='mis-caution'> 
                        <p>We collect and store your information solely for the purpose of sending relevant communications about our platform. We do not sell or share this information with third parties.</p>
                    </div>
                    <div className='mis-social'>
                        <img src={fb} className=""/>
                        <img src={disc} className=""/>
                        <img src={insta} className=""/>
                    </div>
                    
                    {/* 
                    <div className='mis-q'>
                        <h2>Inquiries or Questions?</h2>
                    </div>
                    <div className='mis-form'>
                        <div className='mis-inputs'>
                            <input type="email" id="friend_email" placeholder="Name" value={friendEmail} onChange={(e) => setfriendEmail(e.target.value)}></input>
                            <select id="mis-type" onChange={(e=> setpersonType(e.target.value))}>
                                <option value = "Parent">Parent</option>
                                <option value = "Student">Student</option>
                                <option value = "Tutor">Tutor</option>
                                <option value = "Other">Other</option>
                            </select>
                        </div>
                        <div className='mis-inputs'>
                            <input type="email" id="friend_email" placeholder="Email" value={friendEmail} onChange={(e) => setfriendEmail(e.target.value)}></input>
                            <input type="email" id="friend_email" placeholder="Company / School" value={friendEmail} onChange={(e) => setfriendEmail(e.target.value)}></input>
                        </div>
                        <textarea className='mis-msg'></textarea>  
                    </div>
                    <h1>temp</h1>
                    
                    */}
                    
                </div>
            </div>
        )
    }
};
  