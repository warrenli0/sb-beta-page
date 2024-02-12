export default function Begin({showStart, setshowMain, setshowwholeStart}) {

    function beginThing() {
        setshowMain('1');
        setTimeout(function(){
            setshowwholeStart(false); // time to move on
        }, 6100);
    }

    if (showStart) {
        return (
            <div className="begin-container">
                <h1><span style={{color: "#FFF48F"}}>5 practice problems</span> — try out our platform! Complete them all to get <span style={{color: "#FFF48F"}}>early access</span> to the full product in March!</h1>
                <h2 className='begin-con'><span onClick={() => {beginThing()}}>Begin</span></h2>
            </div>
        )
    }
}

