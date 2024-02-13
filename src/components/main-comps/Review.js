import React, { useState } from "react";

export default function Review({bgNum}) {

    if (bgNum == 5) {
        return (
            <div className='start-review-bg' move={+bgNum}>
                  
            </div>
        )
    }

};
  