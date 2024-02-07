import { useState } from "react";

export default function Begin({showStart}) {

    // used to trigger the exit animation
    const [exit, setExit] = useState('0');

    if (showStart) {
        return (
            <div className="begin-container">
                <h1>5 practice problems — try out our platform! Complete them all to get early access to the full product in March!</h1>
                <h2 className='begin-con'><span>Begin</span></h2>
            </div>
        )
    }
}

