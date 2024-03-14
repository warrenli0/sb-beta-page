import { useEffect } from "react";
export default function Begin({showStart, setshowMain, setshowwholeStart}) {

    function beginThing() {
        setshowMain('2'); // triggers the questions to be loaded in before begin
        setTimeout(function(){
            setshowMain('1');
        }, 100);
        setTimeout(function(){
            setshowwholeStart(false); // time to move on
        }, 6100);
    }

    useEffect(() => {
        //Runs only on the first render
       
      }, []);

    if (showStart) {
        return (
            <div className="begin-container">
                <h1>In our full product, we will give you daily practice problems based off a personalized algorithm. This is a mini-version of it - <span style={{color: "#FFF48F"}}>Try 5 practice problems!</span></h1>
                <h2 className='begin-con'><span onClick={() => {beginThing()}}>Begin</span></h2>
            </div>
        )
    }
}

