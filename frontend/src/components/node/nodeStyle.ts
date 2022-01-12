import React from 'react';

import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

import '../../App.css';  // contains .diagram-component CSS

// black rectangle for IC
export function ICshapeStyle() {
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

export function ledRedStyle() {
  return {
    name: "LED",
    fill: "gray",
    desiredSize: new go.Size(20, 40),
  }
}

export function ledGreenStyle() {
  return {
    name: "LED",
    fill: "gray",
    desiredSize: new go.Size(20, 40),
  }
}

export function ledYellowStyle() {
  return {
    name: "LED",
    fill: "gray",
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
    stroke: "white",
    fill: "black",
    desiredSize: new go.Size(5, 55),
  }
}

export function numberPartA() {
  return {
    name: "A",
    stroke: "white",
    fill: "black",
    desiredSize: new go.Size(5, 55),
  }
}

export function numberPartB() {
  return {
    name: "B",
    stroke: "white",
    fill: "black",
    desiredSize: new go.Size(5, 55),
  }
}

export function numberPartC() {
  return {
    name: "C",
    stroke: "white",
    fill: "black",
    desiredSize: new go.Size(5, 55),
  }
}

export function numberPartD() {
  return {
    name: "D",
    stroke: "white",
    fill: "black",
    desiredSize: new go.Size(5, 55),
  }
}

export function numberPartE() {
  return {
    name: "E",
    stroke: "white",
    fill: "black",
    desiredSize: new go.Size(5, 55),
  }
}

export function numberPartF() {
  return {
    name: "F",
    stroke: "white",
    fill: "black",
    desiredSize: new go.Size(5, 55),
  }
}

export function numberPartG() {
  return {
    name: "G",
    stroke: "white",
    fill: "black",
    desiredSize: new go.Size(5, 55),
  }
}

export function twoWayLineA() {
  return {
    name: "A",
    stroke: "white",
    fill: "white",
    desiredSize: new go.Size(1,30),
  }
}

export function twoWayLineB() {
  return {
    name: "B",
    stroke: "white",
    fill: "white",
    desiredSize: new go.Size(1,30),
  }
}

export function twoWayLineC() {
  return {
    name: "C",
    stroke: "white",
    fill: "white",
    desiredSize: new go.Size(1,30),
  }
}