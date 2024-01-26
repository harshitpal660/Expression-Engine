// Importing necessary components and hooks from React and other modules
import { Monster } from "../Components/Monster";
import { Food } from "../Components/Food";
import { useEffect, useRef, useState } from "react";
import { NextButton } from "../Components/NextButton";
import { MosnsterScript } from "../Dialogues/dialog";
import { UserScript } from "../Dialogues/dialog";
import { Link } from "react-router-dom";

// Functional component for the first screen of the app
export const Screen1 = () => {
    // State variables to manage script index, button display, screen size, and food discovery
  const [scriptIndex, setScriptIndex] = useState(0);
  const [displayButton, setDisplayButton] = useState(true);
  const [screenSize, setScreenSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  const [isFoodDiscovered, setIsFoodDiscovered] = useState(false);

  // State variable to manage the position of the food item
  const [foodPosition, setFoodPosition] = useState([100, 100]);

   // Reference to the canvas element
  const canvasRef = useRef(null);

  // Function to handle the increment of the script index and manage button visibility
  const handleIncrement = () => {
    console.log("clicked", scriptIndex);
    if (scriptIndex === 3) {
      setDisplayButton(false);
    }
    setScriptIndex(scriptIndex + 1);
  };

  // Function to handle screen size change
  const handleScreenSizeChange = () => {
    console.log(screenSize[0], screenSize[1]);
    setScreenSize([window.innerWidth, window.innerHeight]);
  };

  // Event listener for screen resize
  window.addEventListener("resize", handleScreenSizeChange);

  // Effect to initialize the canvas and handle mouse/touch events
  useEffect(() => {
    const canvasElement = canvasRef.current;
    const canvasContext = canvasElement.getContext("2d");

    // Function to check if the device supports touch events
    const checkIfTouchDevice = () => {
      try {
        document.createEvent("TouchEvent");
        return true;
      } catch (e) {
        return false;
      }
    };

    // Function to initialize the canvas with a gradient background
    const initializeCanvas = () => {
      const gradient = canvasContext.createLinearGradient(
        0,
        0,
        screenSize[0],
        screenSize[1]
      );
      gradient.addColorStop(0, "#e9d4ff");
      gradient.addColorStop(1, "#e9d4ff");
      //   console.log(screenSize[0],screenSize[1]);
      canvasContext.fillStyle = gradient;
      canvasContext.fillRect(0, 0, screenSize[0], screenSize[1]);
    };

    // Function to get mouse coordinates relative to the canvas
    const getMouseCoordinates = (event) => {
      const rect = canvasElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      return { x, y };
    };

     // Function to perform "scratching" on the canvas
    const scratch = (x, y) => {
      canvasContext.globalCompositeOperation = "destination-out";
      canvasContext.beginPath();
      canvasContext.arc(x, y, 50, 0, 2 * Math.PI);
      canvasContext.fill();
    };

    // Event handler for mouse/touch start
    const startDragging = (event) => {
      isDragging = true;
      const { x, y } = getMouseCoordinates(event);
      //   console.log("ch1");
      checkFoodDiscovery(x, y);
      scratch(x, y);
    };

    // Event handler for mouse/touch move
    const continueDragging = (event) => {
      if (!isDragging) return;
      const { x, y } = getMouseCoordinates(event);
      //   console.log("ch2");
      checkFoodDiscovery(x, y);
      scratch(x, y);
    };

    // Event handler for mouse/touch end
    const stopDragging = () => {
      isDragging = false;
    };

    // Function to check if the food item is discovered
    const checkFoodDiscovery = (x, y) => {
      const foodElement = document.getElementById("food");
      console.log(foodElement);
      if (foodElement) {
        const foodRect = foodElement.getBoundingClientRect();

        console.log(
          x + ">=" + foodRect.left,
          x + "<=" + foodRect.right,
          y + ">=" + foodRect.top,
          y + "<=" + foodRect.bottom
        );
        if (
          x >= foodRect.left + 5 &&
          x <= foodRect.right - 5 &&
          y >= foodRect.top + 5 &&
          y <= foodRect.bottom - 5
        ) {
          // User discovered the food item
          setIsFoodDiscovered(true);
          console.log("Food discovered!");
        }
      }
    };

    let isDragging = false;

    checkIfTouchDevice();

    // Add event listeners for mouse and touch events
    canvasElement.addEventListener("mousedown", startDragging);
    canvasElement.addEventListener("mousemove", continueDragging);
    canvasElement.addEventListener("mouseup", stopDragging);

    canvasElement.addEventListener("touchstart", startDragging);
    canvasElement.addEventListener("touchmove", continueDragging);
    canvasElement.addEventListener("touchend", stopDragging);

     // Initialize the canvas
    initializeCanvas();

    // Cleanup event listeners
    return () => {
      canvasElement.removeEventListener("mousedown", startDragging);
      canvasElement.removeEventListener("mousemove", continueDragging);
      canvasElement.removeEventListener("mouseup", stopDragging);

      canvasElement.removeEventListener("touchstart", startDragging);
      canvasElement.removeEventListener("touchmove", continueDragging);
      canvasElement.removeEventListener("touchend", stopDragging);
    };
  }, [scriptIndex, screenSize]);

  // Effect to place the food item at a random position when the app is rendered
  useEffect(() => {
    setFoodPosition([
      [
        Math.random() * (window.innerHeight - 100),
        Math.random() * (window.innerWidth - 100),
      ],
    ]);
  }, []);

  return (
    <>
      <div className="h-100 w-100 bg-black bg-gradient">
        <Food height={foodPosition[0]} width={foodPosition[1]} />
        {displayButton && (
          <div
            className="z-1"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <Monster text={MosnsterScript[scriptIndex]} />
            <NextButton
              text={UserScript[scriptIndex]}
              handleIncrement={handleIncrement}
            />
          </div>
        )}

        {!isFoodDiscovered ? (
          <canvas
            ref={canvasRef}
            id="scratch"
            width={window.innerWidth}
            height={window.innerHeight}
            style={{
              cursor:
                'url("https://media.geeksforgeeks.org/wp-content/uploads/20231030101751/bx-eraser-icon.png"), auto',
            }}
          ></canvas>
        ) : (
          <div className="position-absolute h-100 w-100 d-flex flex-row justify-content-center">
            <div>
              <h2 className="text-white">🎉 Congratulations! 🎉</h2>
              <Monster />
              <Link to="/form">
                <button type="button" className="btn btn-outline-primary">
                  Go to Expression Engine
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
