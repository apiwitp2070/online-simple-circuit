import React from 'react';

import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

import '../../App.css';  // contains .diagram-component CSS


// for bottom output port and top input port
export function FromBottom(input: any) {
  return {
    desiredSize: new go.Size(6, 6),
    fill: "#c3c6cd",
    fromSpot: go.Spot.Bottom,
    fromLinkable: !input,
    toSpot: go.Spot.Top,
    toLinkable: input,
    toMaxLinks: 1,
    cursor: "pointer"
  };
}

// for top output port and bottom input port
export function FromTop(input: any) {
  return {
    desiredSize: new go.Size(6, 6),
    fill: "#c3c6cd",
    fromSpot: go.Spot.Top,
    fromLinkable: !input,
    toSpot: go.Spot.Bottom,
    toLinkable: input,
    toMaxLinks: 1,
    cursor: "pointer"
  };
}

// for input and output
export function InoutPort(input: any) {
  return {
    desiredSize: new go.Size(6, 6),
    fill: "#c3c6cd",
    fromSpot: go.Spot.Right, 
    fromLinkable: !input,
    toSpot: go.Spot.Left,
    toLinkable: input,
    toMaxLinks: 1,
    cursor: "pointer"
  };
}

// for switch
export function SwitchLeft() {
  return {
    desiredSize: new go.Size(6, 6),
    fill: "#c3c6cd",
    fromSpot: go.Spot.Left, 
    fromLinkable: true,
    toSpot: go.Spot.Left,
    toLinkable: true,
    toMaxLinks: 1,
    cursor: "pointer"
  };
}

export function SwitchRight() {
  return {
    desiredSize: new go.Size(6, 6),
    fill: "#c3c6cd",
    fromSpot: go.Spot.Right, 
    fromLinkable: true,
    toSpot: go.Spot.Right,
    toLinkable: true,
    toMaxLinks: 1,
    cursor: "pointer"
  };
}