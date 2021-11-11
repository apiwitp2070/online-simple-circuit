import React from 'react';

import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

import '../../App.css';  // contains .diagram-component CSS

// black rectangle for IC
export function shapeStyle() {
    return {
      name: "NODESHAPE",
      fill: "black",
      desiredSize: new go.Size(100, 40),
    };
  }


export  function nodeEllipse() {
  return {
    fill: "gray",
    desiredSize: new go.Size(8, 12),
  }
}

export function ledStyle() {
  return {
    fill: "red",
    desiredSize: new go.Size(20, 40),
  }
}

export function resistorStyle() {
  return {
    fill: "#D9CAB3",
    desiredSize: new go.Size(60, 20),
  }
}

export function sevenSegmentStyle() {
  return {
    fill: "black",
    desiredSize: new go.Size(100, 150),
  }
}

export function numberPart() {
  return {
    fill: "white",
    desiredSize: new go.Size(5, 55),
  }
}