import './Dashboard.css'

import React, { useState } from "react";

export default function Dashboard({showDashoard, setshowDashoard}) {

    if (showDashoard) {
        // different version if its SAT or ACT
        return (
            <div className='dashboard-bg'>
                <div className='dashboard-temp'>
                    
                </div>
            </div>
        ) 
    }
}