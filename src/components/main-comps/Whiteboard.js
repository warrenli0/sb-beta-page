import React, { useRef, useState, useEffect } from "react";

// credit to https://dev.to/fidalmathew/building-a-collaborative-whiteboard-app-using-reactjs-socketio-and-nodejs-2o71
export default function Whiteboard({drawColor, drawWidth, trash, drawingArray, setdrawingArray, currQIndex, bgNum}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (bgNum > 5) { // display old draw for ecard
            
            const image = new Image();
            image.src = drawingArray[bgNum-6];
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            // Draw the image onto the canvas
            image.onload = () => {
                ctx.drawImage(image, 0, 0);
            };
        }
    }, [bgNum]);

    // https://stackoverflow.com/questions/62846043/react-js-useeffect-with-window-resize-event-listener-not-working
    const handleResize = () => {
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL(); // Get the data URL of the canvas content
        // https://stackoverflow.com/questions/10214873/make-canvas-as-wide-and-as-high-as-parent
        canvasRef.current.width = canvasRef.current.offsetWidth;
        canvasRef.current.height = canvasRef.current.offsetHeight;
        // save the image url, clear the canvas? and rredraw on the new canvas
        const image = new Image();
        image.src = dataURL;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw the image onto the canvas
        image.onload = () => {
            ctx.drawImage(image, 0, 0);
        };
    }
      
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize, false);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        // Variables to store drawing state
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        const startDrawing = (e) => {
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        };

        // Function to draw
        const draw = (e) => {
            if (!isDrawing) return;

            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
            }
            [lastX, lastY] = [e.offsetX, e.offsetY];
        };

        // Function to end drawing
        const endDrawing = () => {
            const canvas = canvasRef.current;
            const dataURL = canvas.toDataURL(); // Get the data URL of the canvas content

            // add dataURL to correct index
            const newDrawings = drawingArray.map((c, i) => {
                if (i === currQIndex) {
                    // copy over dataurl for the current index
                  return dataURL;
                } else {
                  // The rest haven't changed
                  return c;
                }
            });
            setdrawingArray(newDrawings);

            isDrawing = false;
        };

        const canvas = canvasRef.current;
        const ctx = canvasRef.current.getContext('2d');

        // Set initial drawing styles
        if (ctx) {
            ctx.strokeStyle = drawColor;
            ctx.lineWidth = drawWidth;

            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
        }

        if (trash == '1' || trash == '2') {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const dataURL = canvas.toDataURL(); // Get the data URL of the canvas content

            // add dataURL to correct index
            const newDrawings = drawingArray.map((c, i) => {
                if (i === currQIndex) {
                    // copy over dataurl for the current index
                  return dataURL;
                } else {
                  // The rest haven't changed
                  return c;
                }
            });
            setdrawingArray(newDrawings);
        }

        // Event listeners for drawing
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', endDrawing);
        canvas.addEventListener('mouseout', endDrawing);

        return () => {
            // Clean up event listeners when component unmounts
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', endDrawing);
            canvas.removeEventListener('mouseout', endDrawing);
        };
    }, [drawColor, drawWidth, trash]);

    return (
        <canvas
            ref={canvasRef}
            width={600}
            height={400}
            style={{ backgroundColor: 'white', width: '100%', height: '96%'}}
        />
    );
}
