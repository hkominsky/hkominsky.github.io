import React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import ReactDOM from 'react-dom';

export function CreateLogo() {
  const blinkRef = useRef<null | NodeJS.Timeout>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [positions, setPositions] = useState({
    leftEye: {
      x: 78,
      y: 112
    },
    rightEye: {
      x: 104,
      y: 112
    }
  });

  const handleMove = useCallback((clientX, clientY) => {
    const svgElement = document.getElementById("logo");
    if (!svgElement) return;
    const rect = svgElement.getBoundingClientRect();
    const svgCenterX = rect.left + rect.width / 2;
    const svgCenterY = rect.top + rect.height / 2;
    const offsetX = clientX - svgCenterX;
    const offsetY = clientY - svgCenterY;

    const maxEyesOffset = 20;
    const eyesDistance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
    const eyesAngle = Math.atan2(offsetY, offsetX);
    const clampedEyesDistance = Math.min(eyesDistance, maxEyesOffset);
    const eyeMoveX = clampedEyesDistance * Math.cos(eyesAngle);
    const eyeMoveY = clampedEyesDistance * Math.sin(eyesAngle);

    setPositions({
      leftEye: {
        x: 77.5 + eyeMoveX,
        y: 112 + eyeMoveY
      },
      rightEye: {
        x: 103.5 + eyeMoveX,
        y: 112 + eyeMoveY
      }
    });
  }, []);

  const handleMouseMove = useCallback((event) => {
    handleMove(event.clientX, event.clientY);
  }, [handleMove]);

  const handleTouchMove = useCallback((event) => {
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      handleMove(touch.clientX, touch.clientY);
    }
  }, [handleMove]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleMouseMove, handleTouchMove]);

  useEffect(() => {
    const scheduleBlink = () => {
      const nextBlinkInterval = Math.random() * 3000 + 2000;
      blinkRef.current = setTimeout(() => {
        setIsBlinking(true);
        blinkRef.current = setTimeout(() => setIsBlinking(false), 200);
        scheduleBlink();
      }, nextBlinkInterval);
    };

    scheduleBlink();

    return () => {
      if (blinkRef.current) {
        clearTimeout(blinkRef.current);
      }
    };
  }, []);

  return (
    <svg 
      id="brand"
      width="96" 
      height="96" 
      viewBox="0 0 180 180" 
    >
      <defs>
        <clipPath id="backgroundClip">
          <circle cx="90" cy="90" r="90" />
        </clipPath>
      </defs>
      <g clipPath="url(#backgroundClip)">
        <defs>
          <pattern id="bgPattern" patternUnits="userSpaceOnUse" width="180" height="180">
            <image href="images/logo-light.png" x="0" y="0" width="180" height="180" />
          </pattern>
        </defs>
        <circle id="bg" cx="90" cy="90" r="90" fill="url(#bgPattern)" />
        <ellipse 
          rx="7" 
          id="left-eye" 
          cx={positions.leftEye.x} 
          cy={positions.leftEye.y}
          ry={isBlinking ? "0" : "14"}
          style={{
            fill: 'rgb(24, 24, 27)',
            transition: 'ry 150ms ease-in-out'
          }}
        />
        <ellipse 
          id="right-eye" 
          rx="7" 
          cx={positions.rightEye.x} 
          cy={positions.rightEye.y}
          ry={isBlinking ? "0" : "14"}
          style={{
            fill: 'rgb(24, 24, 27)',
            transition: 'ry 150ms ease-in-out'
          }}
        />
      </g>
    </svg>
  );
}

// Render the component
ReactDOM.render(<CreateLogo />, document.getElementById("logo-root"));