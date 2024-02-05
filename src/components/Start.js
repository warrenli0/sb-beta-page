import './Start.css'
import coco from '../images/coco-tree.png';
import ping from '../images/main-peng.png';
import sat from '../images/SAT.png';
import act from '../images/ACT.png';
import { useState, useEffect } from "react";

export default function Start({showLP}) {

    if (!showLP) {
        return (
            <div className='start-page'>
                <div className='start-text'>
                    <div className='choose'>
                        <img src={sat}/>
                        <img src={act}/>
                    </div>
                </div>
                <div className='start-beach'></div>
                <div className='treeContainer'>
                    <img src={coco} className="coco-tree"/>
                    <img src={ping} className="ping-tree"/>
                    <div className='text-container'>
                        <div className='typed-out'>
                            Hey there! What test are you preparing for?
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
  