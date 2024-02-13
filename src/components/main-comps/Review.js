import review from '../../images/review-peng.png'
import coral from '../../images/coral.png'
import green_fish_right from '../../images/green-fish-right.png';
import green_fish from '../../images/green-fish-left.png';
import huge_whale from '../../images/huge-whale.png';
import React, { useState } from "react";

export default function Review({questions, bgNum, chosenAnswers}) {

    // use array [1,0,0,1,1] to indicate color via identifier in flex

    if (bgNum == 5) {
        return (
            <div className='start-review-bg' move={+bgNum}>
                <div className="green-fish-right2">
                    <img src={green_fish_right} />
                </div>
                <div className="green-fish">
                    <img src={green_fish} />
                </div>
                <div className="huge_whale">
                    <img src={huge_whale} />
                </div>
                  <div className='review-header'>
                    <div>
                        <h1>Great job completing your practice!</h1>
                        <h3>Spend a few minutes and make sure you understand all the concepts.</h3>
                    </div>
                  </div>
                  <div className="review-flex">
                        <div className='review-color' color={chosenAnswers[0]}>
                            <h3>Question 1</h3>
                            <h4><i>{questions[0].type}</i></h4>
                        </div>
                        <div className='review-color' color={chosenAnswers[1]}>
                            <h3>Question 2</h3>
                            <h4><i>{questions[1].type}</i></h4>
                        </div>
                        <div className='review-color' color={chosenAnswers[2]}>
                            <h3>Question 3</h3>
                            <h4><i>{questions[2].type}</i></h4>
                        </div>
                        <div className='review-color' color={chosenAnswers[3]}>
                            <h3>Question 4</h3>
                            <h4><i>{questions[3].type}</i></h4>
                        </div>
                        <div className='review-color' color={chosenAnswers[4]}>
                            <h3>Question 5</h3>
                            <h4><i>{questions[4].type}</i></h4>
                        </div>
                  </div>
                  <div className='rock-ping-cont'>
                    <img src={review} className='rock-ping'/>
                    <div className='review-text-container'>
                        <h3>Reviewing your answers is the most</h3>
                        <h3>important (and often neglected) </h3>
                        <h3>part of studying...</h3>
                    </div>
                    <img src={coral} className='display-review-coral'/>
                  </div>
                  <div className='review-button-cont'>
                        <h1>Start Review</h1>
                    <img src={coral} className='review-coral'/>
                  </div>
                  <h3 className='review-message'>Continue to the end for early access at release.</h3>
            </div>
        )
    }

};
  