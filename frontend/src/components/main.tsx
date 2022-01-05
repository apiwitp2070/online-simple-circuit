import React from 'react';
import { useEffect } from 'react';

import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

import '../App.css';  // contains .diagram-component CSS
import { ICshapeStyle, nodeEllipse, ledRedStyle, ledYellowStyle, ledGreenStyle, resistorStyle, sevenSegmentStyle, numberPart, numberPartG, numberPartF, numberPartA, numberPartB, numberPartC,numberPartD,numberPartE, twoWayLineA, twoWayLineB, twoWayLineC } from './node/nodeStyle';
import { FromBottom, FromTop, InoutPort, SwitchLeft, SwitchRight } from './node/portTemplate';

var count=0;
var jsonData = {};

function initDiagram() {

  // define variable
  var red = "orangered";  // 0 or false
  var green = "forestgreen";  // 1 or true
  var black = "black"
  var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);


  const $ = go.GraphObject.make;
  // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
  const diagram =
    $(go.Diagram,
      {
        "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
        "draggingTool.isGridSnapEnabled": true,
        'undoManager.isEnabled': true,
        'initialScale': 1.5,
      });
  
  // when the document is modified, add a "*" to the title
  diagram.addDiagramListener("Modified", function(e:any) {
    var idx = document.title.indexOf("*");
    if (diagram.isModified) {
      if (idx < 0) document.title += "*";
    } else {
      if (idx >= 0) document.title = document.title.substr(0, idx);
    }
  });

  // create a new Platte
  var palette = new go.Palette("palette");
  var palette2 = new go.Palette("palette2");

  // grid
  diagram.grid.visible = true;
  diagram.grid =
  $(go.Panel, go.Panel.Grid,  // or "Grid"
    { gridCellSize: new go.Size(10, 10) },
    $(go.Shape, "LineH", { stroke: "lightgray" }),
    $(go.Shape, "LineV", { stroke: "lightgray" })
  );

  go.Shape.defineFigureGenerator("HalfEllipse", function(shape, w, h) {
    return new go.Geometry()
      .add(new go.PathFigure(0, 0, true)
      .add(new go.PathSegment(go.PathSegment.Bezier, w, .5 * h, KAPPA * w, 0, w, (.5 - KAPPA / 2) * h))
      .add(new go.PathSegment(go.PathSegment.Bezier, 0, h, w, (.5 + KAPPA / 2) * h, KAPPA * w, h).close()))
      .setSpots(0, 0.156, 0.844, 0.844);
  });
  
  // creates relinkable Links that will avoid crossing Nodes when possible 
  // and will jump over other Links in their paths
  diagram.linkTemplate =
    $(go.Link,
      {
        routing: go.Link.AvoidsNodes,
        curve: go.Link.JumpOver,
        corner: 3,
        relinkableFrom: true, relinkableTo: true,
        selectionAdorned: false, // Links are not adorned when selected so that their color remains visible.
        shadowOffset: new go.Point(0, 0), shadowBlur: 5, shadowColor: "blue",
      },
      new go.Binding("isShadowed", "isSelected").ofObject(),
      $(go.Shape,
        { name: "SHAPE", strokeWidth: 2, stroke: red , parameter1: 0}), new go.Binding("stroke", "color").ofModel(), new go.Binding("parameter1", "value")/*.ofModel()*/);
    
  // Graph link model to identify the port
  diagram.model = 
    $(go.GraphLinksModel,
      { linkFromPortIdProperty: "fromPort",  // required information:
        linkToPortIdProperty: "toPort",      // identifies data property names
    });
    
  // node template helpers (Tooltip when hover with mouse)
  var sharedToolTip =
    $("ToolTip",
      { "Border.figure": "RoundedRectangle" },
      $(go.TextBlock, { margin: 2 },
        new go.Binding("text", "", function(d) { return d.category; })));

  // node settings

  function nodeStyle() {
    return [new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
    new go.Binding("isShadowed", "isSelected").ofObject(),
    {
      selectionAdorned: false,
      shadowOffset: new go.Point(0, 0),
      shadowBlur: 15,
      shadowColor: "blue",
      toolTip: sharedToolTip
    }];
  }
  
  // define templates for each type of node

  var inputTemplate =
    $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "Circle", ICshapeStyle(),
        { fill: red }),
      $(go.Shape, "Rectangle", InoutPort(false),
        { portId: "", alignment: new go.Spot(0.4, 0.5) }, new go.Binding("fill", "color").ofModel()),
      { // if double-clicked, an input node will change its value, represented by the color.
        doubleClick: function(e, obj:any) {
          e.diagram.startTransaction("Toggle Input");
          var shp = obj.findObject("NODESHAPE");
          shp.fill = (shp.fill === green) ? red : green;
          updateStates();
          e.diagram.commitTransaction("Toggle Input");
        }
      }
    );

  var outputTemplate =
    $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "Square", ICshapeStyle(),
        { fill: "grey" }),
      $(go.Shape, "Rectangle", InoutPort(true),
        { portId: "", alignment: new go.Spot(0, 0.5)}, new go.Binding("fill", "color").ofModel())
    );

  var clkTemplate =
    $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "Rectangle", ICshapeStyle(),
        { fill: red }),
      $(go.Shape, "Rectangle", InoutPort(false),
        { portId: "", alignment: new go.Spot(1.01, 0.5) }, new go.Binding("fill", "color").ofModel()),
      $(go.TextBlock, { text: "clk T=1500ms", stroke: "white"  }),
    );

  var andTemplate =
    $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "Rectangle", ICshapeStyle()),
      $(go.Shape, "HalfEllipse", nodeEllipse(),
        { alignment: new go.Spot(0.05, 0.5)}),
      $(go.Shape, "Rectangle", FromBottom(true),
        { portId: "port14", alignment: new go.Spot(0.05, 0) }),//vcc port14
      $(go.Shape, "Rectangle", FromBottom(true),
        { portId: "port13", alignment: new go.Spot(0.2, 0) }),//input port13
      $(go.Shape, "Rectangle", FromBottom(true),
        { portId: "port12", alignment: new go.Spot(0.35, 0) }),//input port12
      $(go.Shape, "Rectangle", FromTop(false),
        { portId: "port11", alignment: new go.Spot(0.5, 0) }),//output port11 of port13
      $(go.Shape, "Rectangle", FromBottom(true),
        { portId: "port10", alignment: new go.Spot(0.65, 0) }),//input port10
      $(go.Shape, "Rectangle", FromBottom(true),
        { portId: "port9", alignment: new go.Spot(0.8, 0) }),//input port9
      $(go.Shape, "Rectangle", FromTop(false),
        { portId: "port8", alignment: new go.Spot(0.95, 0) }),//output port8 of of port10 port9
      $(go.Shape, "Rectangle", FromTop(true),
        { portId: "port1", alignment: new go.Spot(0.05, 1) }),//input port1
      $(go.Shape, "Rectangle", FromTop(true),
        { portId: "port2", alignment: new go.Spot(0.2, 1) }),//input port2
      $(go.Shape, "Rectangle", FromBottom(false),
        { portId: "port3", alignment: new go.Spot(0.35, 1) }),//output port3 of port1 port2
      $(go.Shape, "Rectangle", FromTop(true),
        { portId: "port4", alignment: new go.Spot(0.5, 1) }),//input port4
      $(go.Shape, "Rectangle", FromTop(true),
        { portId: "port5", alignment: new go.Spot(0.65, 1) }),//input port5
      $(go.Shape, "Rectangle", FromBottom(false),
        { portId: "port6", alignment: new go.Spot(0.8, 1) }),//output port6 of port4 port5
      $(go.Shape, "Rectangle", FromTop(true),
        { portId: "port7", alignment: new go.Spot(0.95, 1) }),//gnd port7
      $(go.TextBlock, { text: "7408 and", stroke: "white" }),
    );

  var orTemplate =
      $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "Rectangle", ICshapeStyle()),
      $(go.Shape, "HalfEllipse", nodeEllipse(),
        { alignment: new go.Spot(0.05, 0.5)}),
      $(go.Shape, "Rectangle", FromBottom(true),
        { portId: "port14", alignment: new go.Spot(0.05, 0) }),//vcc port14
      $(go.Shape, "Rectangle", FromBottom(true),
        { portId: "port13", alignment: new go.Spot(0.2, 0) }),//input port13
      $(go.Shape, "Rectangle", FromBottom(true),
        { portId: "port12", alignment: new go.Spot(0.35, 0) }),//input port12
      $(go.Shape, "Rectangle", FromTop(false),
        { portId: "port11", alignment: new go.Spot(0.5, 0) }),//output port11 of port13
      $(go.Shape, "Rectangle", FromBottom(true),
        { portId: "port10", alignment: new go.Spot(0.65, 0) }),//input port10
      $(go.Shape, "Rectangle", FromBottom(true),
        { portId: "port9", alignment: new go.Spot(0.8, 0) }),//input port9
      $(go.Shape, "Rectangle", FromTop(false),
        { portId: "port8", alignment: new go.Spot(0.95, 0) }),//output port8 of of port10 port9
      $(go.Shape, "Rectangle", FromTop(true),
        { portId: "port1", alignment: new go.Spot(0.05, 1) }),//input port1
      $(go.Shape, "Rectangle", FromTop(true),
        { portId: "port2", alignment: new go.Spot(0.2, 1) }),//input port2
      $(go.Shape, "Rectangle", FromBottom(false),
        { portId: "port3", alignment: new go.Spot(0.35, 1) }),//output port3 of port1 port2
      $(go.Shape, "Rectangle", FromTop(true),
        { portId: "port4", alignment: new go.Spot(0.5, 1) }),//input port4
      $(go.Shape, "Rectangle", FromTop(true),
        { portId: "port5", alignment: new go.Spot(0.65, 1) }),//input port5
      $(go.Shape, "Rectangle", FromBottom(false),
        { portId: "port6", alignment: new go.Spot(0.8, 1) }),//output port6 of port4 port5
      $(go.Shape, "Rectangle", FromTop(true),
        { portId: "port7", alignment: new go.Spot(0.95, 1) }),//gnd port7
      $(go.TextBlock, { text: "7432 or", stroke: "white" }),
    );

  var xorTemplate =
      $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "Rectangle", ICshapeStyle()),
      $(go.Shape, "HalfEllipse", nodeEllipse(),
        { alignment: new go.Spot(0.05, 0.5)}),
      $(go.Shape, "Rectangle", FromBottom(true),
        { portId: "port14", alignment: new go.Spot(0.05, 0) }),//vcc port14
      $(go.Shape, "Rectangle", FromBottom(true),
        { portId: "port13", alignment: new go.Spot(0.2, 0) }),//input port13
      $(go.Shape, "Rectangle", FromBottom(true),
        { portId: "port12", alignment: new go.Spot(0.35, 0) }),//input port12
      $(go.Shape, "Rectangle", FromTop(false),
        { portId: "port11", alignment: new go.Spot(0.5, 0) }),//output port11 of port13
      $(go.Shape, "Rectangle", FromBottom(true),
        { portId: "port10", alignment: new go.Spot(0.65, 0) }),//input port10
      $(go.Shape, "Rectangle", FromBottom(true),
        { portId: "port9", alignment: new go.Spot(0.8, 0) }),//input port9
      $(go.Shape, "Rectangle", FromTop(false),
        { portId: "port8", alignment: new go.Spot(0.95, 0) }),//output port8 of of port10 port9
      $(go.Shape, "Rectangle", FromTop(true),
        { portId: "port1", alignment: new go.Spot(0.05, 1) }),//input port1
      $(go.Shape, "Rectangle", FromTop(true),
        { portId: "port2", alignment: new go.Spot(0.2, 1) }),//input port2
      $(go.Shape, "Rectangle", FromBottom(false),
        { portId: "port3", alignment: new go.Spot(0.35, 1) }),//output port3 of port1 port2
      $(go.Shape, "Rectangle", FromTop(true),
        { portId: "port4", alignment: new go.Spot(0.5, 1) }),//input port4
      $(go.Shape, "Rectangle", FromTop(true),
        { portId: "port5", alignment: new go.Spot(0.65, 1) }),//input port5
      $(go.Shape, "Rectangle", FromBottom(false),
        { portId: "port6", alignment: new go.Spot(0.8, 1) }),//output port6 of port4 port5
      $(go.Shape, "Rectangle", FromTop(true),
        { portId: "port7", alignment: new go.Spot(0.95, 1) }),//gnd port7
      $(go.TextBlock, { text: "7486 xor", stroke: "white" }),
    );

  var norTemplate =
    $(go.Node, "Spot", nodeStyle(),
    $(go.Shape, "Rectangle", ICshapeStyle()),
    $(go.Shape, "HalfEllipse", nodeEllipse(),
      { alignment: new go.Spot(0.05, 0.5)}),
    $(go.Shape, "Rectangle", FromBottom(true),
      { portId: "port14", alignment: new go.Spot(0.05, 0) }),//vcc port14
    $(go.Shape, "Rectangle", FromBottom(true),
      { portId: "port13", alignment: new go.Spot(0.2, 0) }),//input port13
    $(go.Shape, "Rectangle", FromBottom(true),
      { portId: "port12", alignment: new go.Spot(0.35, 0) }),//input port12
    $(go.Shape, "Rectangle", FromTop(false),
      { portId: "port11", alignment: new go.Spot(0.5, 0) }),//output port11 of port13
    $(go.Shape, "Rectangle", FromBottom(true),
      { portId: "port10", alignment: new go.Spot(0.65, 0) }),//input port10
    $(go.Shape, "Rectangle", FromBottom(true),
      { portId: "port9", alignment: new go.Spot(0.8, 0) }),//input port9
    $(go.Shape, "Rectangle", FromTop(false),
      { portId: "port8", alignment: new go.Spot(0.95, 0) }),//output port8 of of port10 port9
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port1", alignment: new go.Spot(0.05, 1) }),//input port1
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port2", alignment: new go.Spot(0.2, 1) }),//input port2
    $(go.Shape, "Rectangle", FromBottom(false),
      { portId: "port3", alignment: new go.Spot(0.35, 1) }),//output port3 of port1 port2
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port4", alignment: new go.Spot(0.5, 1) }),//input port4
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port5", alignment: new go.Spot(0.65, 1) }),//input port5
    $(go.Shape, "Rectangle", FromBottom(false),
      { portId: "port6", alignment: new go.Spot(0.8, 1) }),//output port6 of port4 port5
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port7", alignment: new go.Spot(0.95, 1) }),//gnd port7
    $(go.TextBlock, { text: "7402 nor", stroke: "white" }),
  );

  var xnorTemplate =
    $(go.Node, "Spot", nodeStyle(),
    $(go.Shape, "Rectangle", ICshapeStyle()),
    $(go.Shape, "HalfEllipse", nodeEllipse(),
      { alignment: new go.Spot(0.05, 0.5)}),
    $(go.Shape, "Rectangle", FromBottom(true),
      { portId: "port14", alignment: new go.Spot(0.05, 0) }),//vcc port14
    $(go.Shape, "Rectangle", FromBottom(true),
      { portId: "port13", alignment: new go.Spot(0.2, 0) }),//input port13
    $(go.Shape, "Rectangle", FromBottom(true),
      { portId: "port12", alignment: new go.Spot(0.35, 0) }),//input port12
    $(go.Shape, "Rectangle", FromTop(false),
      { portId: "port11", alignment: new go.Spot(0.5, 0) }),//output port11 of port13
    $(go.Shape, "Rectangle", FromBottom(true),
      { portId: "port10", alignment: new go.Spot(0.65, 0) }),//input port10
    $(go.Shape, "Rectangle", FromBottom(true),
      { portId: "port9", alignment: new go.Spot(0.8, 0) }),//input port9
    $(go.Shape, "Rectangle", FromTop(false),
      { portId: "port8", alignment: new go.Spot(0.95, 0) }),//output port8 of of port10 port9
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port1", alignment: new go.Spot(0.05, 1) }),//input port1
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port2", alignment: new go.Spot(0.2, 1) }),//input port2
    $(go.Shape, "Rectangle", FromBottom(false),
      { portId: "port3", alignment: new go.Spot(0.35, 1) }),//output port3 of port1 port2
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port4", alignment: new go.Spot(0.5, 1) }),//input port4
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port5", alignment: new go.Spot(0.65, 1) }),//input port5
    $(go.Shape, "Rectangle", FromBottom(false),
      { portId: "port6", alignment: new go.Spot(0.8, 1) }),//output port6 of port4 port5
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port7", alignment: new go.Spot(0.95, 1) }),//gnd port7
    $(go.TextBlock, { text: "74266 xnor", stroke: "white" }),
  );

  var nandTemplate =
    $(go.Node, "Spot", nodeStyle(),
    $(go.Shape, "Rectangle", ICshapeStyle()),
    $(go.Shape, "HalfEllipse", nodeEllipse(),
      { alignment: new go.Spot(0.05, 0.5)}),
    $(go.Shape, "Rectangle", FromBottom(true),
      { portId: "port14", alignment: new go.Spot(0.05, 0) }),//vcc port14
    $(go.Shape, "Rectangle", FromBottom(true),
      { portId: "port13", alignment: new go.Spot(0.2, 0) }),//input port13
    $(go.Shape, "Rectangle", FromBottom(true),
      { portId: "port12", alignment: new go.Spot(0.35, 0) }),//input port12
    $(go.Shape, "Rectangle", FromTop(false),
      { portId: "port11", alignment: new go.Spot(0.5, 0) }),//output port11 of port13
    $(go.Shape, "Rectangle", FromBottom(true),
      { portId: "port10", alignment: new go.Spot(0.65, 0) }),//input port10
    $(go.Shape, "Rectangle", FromBottom(true),
      { portId: "port9", alignment: new go.Spot(0.8, 0) }),//input port9
    $(go.Shape, "Rectangle", FromTop(false),
      { portId: "port8", alignment: new go.Spot(0.95, 0) }),//output port8 of of port10 port9
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port1", alignment: new go.Spot(0.05, 1) }),//input port1
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port2", alignment: new go.Spot(0.2, 1) }),//input port2
    $(go.Shape, "Rectangle", FromBottom(false),
      { portId: "port3", alignment: new go.Spot(0.35, 1) }),//output port3 of port1 port2
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port4", alignment: new go.Spot(0.5, 1) }),//input port4
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port5", alignment: new go.Spot(0.65, 1) }),//input port5
    $(go.Shape, "Rectangle", FromBottom(false),
      { portId: "port6", alignment: new go.Spot(0.8, 1) }),//output port6 of port4 port5
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port7", alignment: new go.Spot(0.95, 1) }),//gnd port7
    $(go.TextBlock, { text: "7400 nand", stroke: "white" }),
  );

  var notTemplate =
    $(go.Node, "Spot", nodeStyle(),
    $(go.Shape, "Rectangle", ICshapeStyle()),
    $(go.Shape, "HalfEllipse", nodeEllipse(),
      { alignment: new go.Spot(0.05, 0.5)}),
    $(go.Shape, "Rectangle", FromBottom(true), //fb botout topin , ft topout botin
      { portId: "port14", alignment: new go.Spot(0.05, 0) }),//vcc port14
    $(go.Shape, "Rectangle", FromBottom(true),
      { portId: "port13", alignment: new go.Spot(0.2, 0) }),//input port13
    $(go.Shape, "Rectangle", FromTop(false),
      { portId: "port12", alignment: new go.Spot(0.35, 0) }),//output port12 from port13
    $(go.Shape, "Rectangle", FromBottom(true),
      { portId: "port11", alignment: new go.Spot(0.5, 0) }),//input port11
    $(go.Shape, "Rectangle", FromTop(false),
      { portId: "port10", alignment: new go.Spot(0.65, 0) }),//output port10 from port11
    $(go.Shape, "Rectangle", FromBottom(true),
      { portId: "port9", alignment: new go.Spot(0.8, 0) }),//input port9
    $(go.Shape, "Rectangle", FromTop(false),
      { portId: "port8", alignment: new go.Spot(0.95, 0) }),//output port8 from port9
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port1", alignment: new go.Spot(0.05, 1) }),//input port1
    $(go.Shape, "Rectangle", FromBottom(false),
      { portId: "port2", alignment: new go.Spot(0.2, 1) }),//output port2 from port1
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port3", alignment: new go.Spot(0.35, 1) }),//input port3 
    $(go.Shape, "Rectangle", FromBottom(false),
      { portId: "port4", alignment: new go.Spot(0.5, 1) }),//output port4 from port3
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port5", alignment: new go.Spot(0.65, 1) }),//input port5
    $(go.Shape, "Rectangle", FromBottom(false),
      { portId: "port6", alignment: new go.Spot(0.8, 1) }),//output port6 from port5
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port7", alignment: new go.Spot(0.95, 1) }),//gnd port7
    $(go.TextBlock, { text: "7404 not", stroke: "white" }),
  );

  var dffTemplate =
    $(go.Node, "Spot", nodeStyle(),
    $(go.Shape, "Rectangle", ICshapeStyle()),
    $(go.Shape, "HalfEllipse", nodeEllipse(),
      { alignment: new go.Spot(0.05, 0.5)}),
    $(go.Shape, "Rectangle", FromBottom(true),
      { portId: "port14", alignment: new go.Spot(0.05, 0) }),//vcc port14
    $(go.Shape, "Rectangle", FromBottom(true),
      { portId: "port13", alignment: new go.Spot(0.2, 0) }),//input clr port13
    $(go.Shape, "Rectangle", FromBottom(true),
      { portId: "port12", alignment: new go.Spot(0.35, 0) }),//input d port12
    $(go.Shape, "Rectangle", FromBottom(true),
      { portId: "port11", alignment: new go.Spot(0.5, 0) }),//input clk port11
    $(go.Shape, "Rectangle", FromBottom(true),
      { portId: "port10", alignment: new go.Spot(0.65, 0) }),//input pre port10 
    $(go.Shape, "Rectangle", FromTop(false),
      { portId: "port9", alignment: new go.Spot(0.8, 0) }),//output q port9
    $(go.Shape, "Rectangle", FromTop(false),
      { portId: "port8", alignment: new go.Spot(0.95, 0) }),//output q' port8 
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port1", alignment: new go.Spot(0.05, 1) }),//input clr port1
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port2", alignment: new go.Spot(0.2, 1) }),//input d port2 
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port3", alignment: new go.Spot(0.35, 1) }),//input clk port3 
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port4", alignment: new go.Spot(0.5, 1) }),//input pre port4 
    $(go.Shape, "Rectangle", FromBottom(false),
      { portId: "port5", alignment: new go.Spot(0.65, 1) }),//output q port5
    $(go.Shape, "Rectangle", FromBottom(false),
      { portId: "port6", alignment: new go.Spot(0.8, 1) }),//output q' port6 
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port7", alignment: new go.Spot(0.95, 1) }),//gnd port7
    $(go.TextBlock, { text: "7474 dff", stroke: "white" }),
  );

  var ledRedTemplate = 
    $(go.Node, "Spot", nodeStyle(),
    $(go.Shape, "Rectangle", ledRedStyle()),
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port1", alignment: new go.Spot(0.2, 1) }),//left port
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port2", alignment: new go.Spot(0.8, 1) }),//right port
    $(go.TextBlock, { text: "led", stroke: "white" }),
  );

  var ledYellowTemplate = 
    $(go.Node, "Spot", nodeStyle(),
    $(go.Shape, "Rectangle", ledYellowStyle()),
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port1", alignment: new go.Spot(0.2, 1) }),//left port
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port2", alignment: new go.Spot(0.8, 1) }),//right port
    $(go.TextBlock, { text: "led", stroke: "white" }),
  );

  var ledGreenTemplate = 
    $(go.Node, "Spot", nodeStyle(),
    $(go.Shape, "Rectangle", ledGreenStyle()),
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port1", alignment: new go.Spot(0.2, 1) }),//left port
    $(go.Shape, "Rectangle", FromTop(true),
      { portId: "port2", alignment: new go.Spot(0.8, 1) }),//right port
    $(go.TextBlock, { text: "led", stroke: "white" }),
  );

  var resistorTemplate = 
    $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "RoundedRectangle", resistorStyle()),
      $(go.Shape, "Rectangle", InoutPort(true),
        { portId: "in", alignment: new go.Spot(0, 0.5) }),
      $(go.Shape, "Rectangle", InoutPort(false),
        { portId: "out", alignment: new go.Spot(1, 0.5) }),
      $(go.Shape, {fill: "brown", desiredSize: new go.Size(5, 20), alignment: new go.Spot(0.2, 0.5)}),
      $(go.Shape, {fill: "black", desiredSize: new go.Size(5, 20), alignment: new go.Spot(0.4, 0.5)}),
      $(go.Shape, {fill: "orange", desiredSize: new go.Size(5, 20), alignment: new go.Spot(0.6, 0.5)}),
      $(go.Shape, {fill: "#AB6D23", desiredSize: new go.Size(5, 20), alignment: new go.Spot(0.8, 0.5)}),   
  );

  var switchTemplate =
    $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "Square", ICshapeStyle()),
      $(go.Shape, "Rectangle", InoutPort(true),
        { portId: "in", alignment: new go.Spot(0, 0.5) }),
      $(go.Shape, "Rectangle", InoutPort(false),
        { portId: "out", alignment: new go.Spot(0.4, 0.5) }),
      $(go.Shape, twoWayLineA(), { alignment: new go.Spot(0.2, 0.35), angle: 60 }),
      $(go.Shape, twoWayLineC(), { alignment: new go.Spot(0.2, 0.5), angle: 90, opacity: 0, }),
      { // double-click toggle switch on or off. represent by its line angle.
        doubleClick: function(e, obj:any) {
          e.diagram.startTransaction("Toggle Switch");
          var lineA = obj.findObject("A"); //60 degree angle line
          var lineC = obj.findObject("C"); //straight line when turn on switch
          lineA.opacity = (lineA.opacity == 1) ? 0 : 1;
          lineC.opacity = (lineC.opacity == 1) ? 0 : 1;
          updateStates();
          e.diagram.commitTransaction("Toggle Switch");
      }}
    );
    
  var twoWaySwitchATemplate =
    $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "Square", ICshapeStyle()),
      $(go.Shape, "Rectangle", SwitchRight(),
        { portId: "port1", alignment: new go.Spot(0.4, 0.2) }),
      $(go.Shape, "Rectangle", SwitchRight(),
        { portId: "port2", alignment: new go.Spot(0.4, 0.8) }),
      $(go.Shape, "Rectangle", SwitchLeft(),
        { portId: "port3", alignment: new go.Spot(0, 0.5) }),
      $(go.Shape, twoWayLineA(), { alignment: new go.Spot(0.2, 0.65), angle: -70 }),
      $(go.Shape, twoWayLineB(), { alignment: new go.Spot(0.2, 0.35), angle: 70, opacity: 0 }),
      { // if double-clicked, an input node will change its value, represented by the color.
        doubleClick: function(e, obj:any) {
          e.diagram.startTransaction("Toggle Switch");
          var lineA = obj.findObject("A");
          var lineB = obj.findObject("B");
          lineA.opacity = (lineA.opacity == 1) ? 0 : 1;
          lineB.opacity = (lineB.opacity == 1) ? 0 : 1;
          updateStates();
          e.diagram.commitTransaction("Toggle Switch");
      }}
    );

  var twoWaySwitchBTemplate =
    $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "Square", ICshapeStyle()),
      $(go.Shape, "Rectangle", SwitchLeft(),
        { portId: "port1", alignment: new go.Spot(0, 0.2) }),
      $(go.Shape, "Rectangle", SwitchLeft(),
        { portId: "port2", alignment: new go.Spot(0, 0.8) }),
      $(go.Shape, "Rectangle", SwitchRight(),
        { portId: "port3", alignment: new go.Spot(0.4, 0.5) }),
      $(go.Shape, twoWayLineA(), { alignment: new go.Spot(0.2, 0.35), angle: -70 }),
      $(go.Shape, twoWayLineB(), { alignment: new go.Spot(0.2, 0.65), angle: 70, opacity: 0 }),
      { // double-click change the output port that input will be connect to, represent by its line.
        doubleClick: function(e, obj:any) {
          e.diagram.startTransaction("Toggle Switch");
          var lineA = obj.findObject("A");
          var lineB = obj.findObject("B");
          lineA.opacity = (lineA.opacity == 1) ? 0 : 1;
          lineB.opacity = (lineB.opacity == 1) ? 0 : 1;
          updateStates();
          e.diagram.commitTransaction("Toggle Switch");
      }}
    );

  var sevenSegmentTemplate = 
    $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "Rectangle", sevenSegmentStyle()),
      $(go.Shape, "Rectangle", FromBottom(true),
        { portId: "portG", alignment: new go.Spot(0.1, 0) }),//G
        $(go.Shape, "Rectangle", numberPartG(),
          { angle: 90, alignment: new go.Spot(0.4, 0.5)}),
      $(go.Shape, "Rectangle", FromBottom(true),
        { portId: "portF", alignment: new go.Spot(0.3, 0) }),//F
        $(go.Shape, "Rectangle", numberPartF(),
          { alignment: new go.Spot(0.1, 0.3)}),
      $(go.Shape, "Rectangle", FromBottom(true),
        { portId: "portVcc", alignment: new go.Spot(0.5, 0) }),//vcc
      $(go.Shape, "Rectangle", FromBottom(true),
        { portId: "portA", alignment: new go.Spot(0.7, 0) }),//A
        $(go.Shape, "Rectangle", numberPartA(),
          { angle: 90, alignment: new go.Spot(0.4, 0.1)}),
      $(go.Shape, "Rectangle", FromBottom(true),
        { portId: "portB", alignment: new go.Spot(0.9, 0) }),//B
        $(go.Shape, "Rectangle", numberPartB(),
          { alignment: new go.Spot(0.7, 0.3)}),
      $(go.Shape, "Rectangle", FromTop(true),
        { portId: "portE", alignment: new go.Spot(0.1, 1) }),//E
        $(go.Shape, "Rectangle", numberPartE(),
          { alignment: new go.Spot(0.1, 0.7)}),
      $(go.Shape, "Rectangle", FromTop(true),
        { portId: "portD", alignment: new go.Spot(0.3, 1) }),//D
        $(go.Shape, "Rectangle", numberPartD(),
          { angle: 90, alignment: new go.Spot(0.4, 0.9)}),
      $(go.Shape, "Rectangle", FromTop(true),
        { portId: "portCom", alignment: new go.Spot(0.5, 1) }),//Com 
      $(go.Shape, "Rectangle", FromTop(true),
        { portId: "portC", alignment: new go.Spot(0.7, 1) }),//C
        $(go.Shape, "Rectangle", numberPartC(),
          { alignment: new go.Spot(0.7, 0.7)}),
      $(go.Shape, "Rectangle", FromTop(true),
        { portId: "portDP", alignment: new go.Spot(0.9, 1) }),//DP
      $(go.Shape, "Circle", 
        { name:"DP",desiredSize: new go.Size(10, 10), stroke: "white", fill: "black", alignment: new go.Spot(0.85, 0.9) }),
    );

  // add the templates created above to diagram and palette
  diagram.nodeTemplateMap.add("clk", clkTemplate);
  diagram.nodeTemplateMap.add("input", inputTemplate);
  diagram.nodeTemplateMap.add("output", outputTemplate);
  diagram.nodeTemplateMap.add("and", andTemplate);
  diagram.nodeTemplateMap.add("or", orTemplate);
  diagram.nodeTemplateMap.add("xor", xorTemplate);
  diagram.nodeTemplateMap.add("not", notTemplate);
  diagram.nodeTemplateMap.add("nand", nandTemplate);
  diagram.nodeTemplateMap.add("nor", norTemplate);
  diagram.nodeTemplateMap.add("xnor", xnorTemplate);
  diagram.nodeTemplateMap.add("led_red", ledRedTemplate);
  diagram.nodeTemplateMap.add("led_yellow", ledYellowTemplate);
  diagram.nodeTemplateMap.add("led_green", ledGreenTemplate);
  diagram.nodeTemplateMap.add("resistor", resistorTemplate);
  diagram.nodeTemplateMap.add("switch", switchTemplate);
  diagram.nodeTemplateMap.add("2wsa", twoWaySwitchATemplate);
  diagram.nodeTemplateMap.add("2wsb", twoWaySwitchBTemplate);
  diagram.nodeTemplateMap.add("sevensegment", sevenSegmentTemplate);
  diagram.nodeTemplateMap.add("dff", dffTemplate);
  
  // share the template map with the Palette
  palette.nodeTemplateMap = diagram.nodeTemplateMap;

  // "Others" category palette
  palette2.nodeTemplateMap = diagram.nodeTemplateMap;

  // Add something to palette 
  palette.model.nodeDataArray = [
    { category: "input" },
    { category: "output" },
    { category: "clk" },
    { category: "and" },
    { category: "or" },
    { category: "xor" },
    { category: "not" },
    { category: "nand" },
    { category: "nor" },
    { category: "xnor" },
    { category: "dff" },
  ];

  palette2.model.nodeDataArray = [
    { category: "led_red" },
    { category: "led_yellow" },
    { category: "led_green" },
    { category: "switch" },
    { category: "2wsa" },
    { category: "2wsb" },
    { category: "resistor" },
    { category: "sevensegment"}
  ];

  loop();

  function loop() {
    setTimeout(function() { updateStates(); loop(); }, 250);
    count=count+1;
    if(count%60===0){
      count=0;
    }
  }
  
  function updateStates() {
    var oldskip = diagram.skipsUndoManager;
    diagram.skipsUndoManager = true;
    // do all "input" nodes first
    diagram.nodes.each(function(node) {
      if (node.category === "input") {
        doInput(node);
      }
    });
    // now we can do all other kinds of nodes
    diagram.nodes.each(function(node) {
      switch (node.category) {
        case "clk": doClk(node); break;
        case "and": doAnd(node); break;
        case "or": doOr(node); break;
        case "xor": doXor(node); break;
        case "not": doNot(node); break;
        case "nand": doNand(node); break;
        case "nor": doNor(node); break;
        case "xnor": doXnor(node); break;
        case "dff": doDff(node); break;
        case "sevensegment": do7seg(node); break; 
        case "output": doOutput(node); break;
        case "switch": doSwitch(node); break;
        case "2wsa": do2SwitchA(node); break;
        case "2wsb": do2SwitchB(node); break;
        case "resistor" : doResistor(node); break;
        case "led_green" : doLEDgreen(node); break;
        case "led_yellow": doLEDyellow(node); break;
        case "led_red": doLEDred(node); break;
        case "input": break;  // doInput already called, above
      }
    });
    diagram.skipsUndoManager = oldskip;
  }

  function linkIsTrue(link:any) {  // assume the given Link has a Shape named "SHAPE"
    return link.findObject("SHAPE").stroke === green;
  }

  function setOutputLinks(node:any, color:any) {
    node.findLinksOutOf().each(function(link:any) { link.findObject("SHAPE").stroke = color; });
  }

  function setOutputLinksP(node:any, color:any, pid:any) {
    node.findLinksOutOf(pid).each(function(link:any) { link.findObject("SHAPE").stroke = color; });
  }

  function doInput(node:any) {
    setOutputLinks(node, node.findObject("NODESHAPE").fill);
  }

  function doSwitch(node:any){
    var stat= node.findObject("C").opacity
    var input= getvalue(node,"in")!
    if(stat==1){
      setvalue(node,"out",input)
    }
    else{
      setvalue(node,"out",red)
    }
  }

  function do2SwitchA(node:any){
    var stat= node.findObject("B").opacity
    var input = getvalue(node,"port3")!
    if(stat==1){
      setvalue(node,"port1",input)
      setvalue(node,"port2",red)
    }
    else{
      setvalue(node,"port1",red)
      setvalue(node,"port2",input)
    }
  }

  function do2SwitchB(node:any){
    var stat= node.findObject("B").opacity
    var in1 = getvalue(node,"port1")!
    var in2 = getvalue(node,"port2")!
    if(stat==1){
      setvalue(node,"port3",in2)
    }
    else{
      setvalue(node,"port3",in1)
    }
  }

  function doResistor(node:any){
    var input = getvalue(node,"in")!
    setvalue(node,"out",input)
  }

  function doLEDgreen(node:any){
    var input = getvalue(node,"port1")!
    var gnd = getvalue(node,"port2")
    if(input==green && gnd==green){
      node.findObject("LED_GREEN").fill = green
    }
    else{
      node.findObject("LED_GREEN").fill = "grey"
    }
  }

  function doLEDyellow(node:any){
    var input = getvalue(node,"port1")!
    var gnd = getvalue(node,"port2")
    if(input==green && gnd==green){
      node.findObject("LED_YELLOW").fill = "yellow"
    }
    else{
      node.findObject("LED_YELLOW").fill = "grey"
    }
  }

  function doLEDred(node:any){
    var input = getvalue(node,"port1")!
    var gnd = getvalue(node,"port2")
    if(input==green && gnd==green){
      node.findObject("LED_RED").fill = red
    }
    else{
      node.findObject("LED_RED").fill = "grey"
    }
  }


  function getvalue(node:any,pid:any){
    var value
    node.findLinksInto(pid).each( function(link:any) {value=link.findObject("SHAPE").stroke})
    return value
  }

  function getoldvalue(node:any,pid:any){
    var value
    node.findLinksInto(pid).each( function(link:any) {value=link.findObject("SHAPE").parameter1})
    return value
  }

  function setvalue(node:any,pid:any,val:any){
    node.findLinksOutOf(pid).each( function(link:any) {link.findObject("SHAPE").stroke=val})
  }

  function setoldvalue(node:any,pid:any,val:any){
    node.findLinksOutOf(pid).each( function(link:any) {link.findObject("SHAPE").parameter1=val})
  }

  function getinput10(node:any){
    var input = [red,red,red,red,red,red,red,red,red,red]
    
    input[0] = getvalue(node,"port14")!
    input[1] = getvalue(node,"port13")!
    input[2] = getvalue(node,"port12")!
    input[3] = getvalue(node,"port10")!
    input[4] = getvalue(node,"port9")!
    input[5] = getvalue(node,"port1")!
    input[6] = getvalue(node,"port2")!
    input[7] = getvalue(node,"port4")!
    input[8] = getvalue(node,"port5")!
    input[9] = getvalue(node,"port7")!

    return input
  }

  function getinput8(node:any){
    var input = [red,red,red,red,red,red,red,red]
    
    input[0] = getvalue(node,"port14")!
    input[1] = getvalue(node,"port13")!
    input[2] = getvalue(node,"port11")!
    input[3] = getvalue(node,"port9")!
    input[4] = getvalue(node,"port1")!
    input[5] = getvalue(node,"port3")!
    input[6] = getvalue(node,"port5")!
    input[7] = getvalue(node,"port7")!


    return input
  }

  function getinputdff(node:any){
    var input = [red,red,red,red,red,red,red,red,red,red]
    
    input[0] = getvalue(node,"port14")!
    input[1] = getvalue(node,"port13")!
    input[2] = getvalue(node,"port12")!
    input[3] = getvalue(node,"port11")!
    input[4] = getvalue(node,"port10")!
    input[5] = getvalue(node,"port1")!
    input[6] = getvalue(node,"port2")!
    input[7] = getvalue(node,"port3")!
    input[8] = getvalue(node,"port4")!
    input[9] = getvalue(node,"port7")!


    return input
  }

  function doClk(node:any) {
    if(count%6===0){
      if(node.findObject("NODESHAPE").fill===green){
        node.findObject("NODESHAPE").fill=red
      }
      else{
        node.findObject("NODESHAPE").fill=green
      }
      setOutputLinks(node, node.findObject("NODESHAPE").fill)
    }

  }

  function doAnd(node:any) {
    var input = getinput10(node)

    if(input[0]===green && input[9]===green){ //vcc and gnd must active

      if(input[1]===green && input[2]===green) {setvalue(node,"port11",green);}
      else setvalue(node,"port11",red)

      if(input[3]===green && input[4]===green) {setvalue(node,"port8",green);}
      else setvalue(node,"port8",red)

      if(input[5]===green && input[6]===green) {setvalue(node,"port3",green);}
      else setvalue(node,"port3",red)

      if(input[7]===green && input[8]===green) {setvalue(node,"port6",green);}
      else setvalue(node,"port6",red)

    }

  }

  function doNand(node:any) {
    var input = getinput10(node)

    if(input[0]===green && input[9]===green){ //vcc and gnd must active

      if(input[1]===green && input[2]===green) {setvalue(node,"port11",red);}
      else setvalue(node,"port11",green)

      if(input[3]===green && input[4]===green) {setvalue(node,"port8",red);}
      else setvalue(node,"port8",green)

      if(input[5]===green && input[6]===green) {setvalue(node,"port3",red);}
      else setvalue(node,"port3",green)

      if(input[7]===green && input[8]===green) {setvalue(node,"port6",red);}
      else setvalue(node,"port6",green)

    }

  }
  function doNot(node:any) {
    var input = getinput8(node)

    if(input[0]===green && input[7]===green){ //vcc and gnd must active

      if(input[1]===green) {setvalue(node,"port12",red);}
      else setvalue(node,"port12",green)

      if(input[2]===green) {setvalue(node,"port10",red);}
      else setvalue(node,"port10",green)

      if(input[3]===green) {setvalue(node,"port8",red);}
      else setvalue(node,"port8",green)

      if(input[4]===green) {setvalue(node,"port2",red);}
      else setvalue(node,"port2",green)

      if(input[5]===green) {setvalue(node,"port4",red);}
      else setvalue(node,"port4",green)

      if(input[6]===green) {setvalue(node,"port6",red);}
      else setvalue(node,"port6",green)

    }

  }

  function doOr(node:any) {
    var input = getinput10(node)

    if(input[0]===green && input[9]===green){ //vcc and gnd must active

      if(input[1]===green || input[2]===green) {setvalue(node,"port11",green);}
      else setvalue(node,"port11",red)

      if(input[3]===green || input[4]===green) {setvalue(node,"port8",green);}
      else setvalue(node,"port8",red)

      if(input[5]===green || input[6]===green) {setvalue(node,"port3",green);}
      else setvalue(node,"port3",red)

      if(input[7]===green || input[8]===green) {setvalue(node,"port6",green);}
      else setvalue(node,"port6",red)

    }

  }
  function doNor(node:any) {
    var input = getinput10(node)

    if(input[0]===green && input[9]===green){ //vcc and gnd must active

      if(input[1]===green || input[2]===green) {setvalue(node,"port11",red);}
      else setvalue(node,"port11",green)

      if(input[3]===green || input[4]===green) {setvalue(node,"port8",red);}
      else setvalue(node,"port8",green)

      if(input[5]===green || input[6]===green) {setvalue(node,"port3",red);}
      else setvalue(node,"port3",green)

      if(input[7]===green || input[8]===green) {setvalue(node,"port6",red);}
      else setvalue(node,"port6",green)

    }

  }

  function doXor(node:any) {
    var input = getinput10(node)

    if(input[0]===green && input[9]===green){ //vcc and gnd must active

      if(input[1]===green && input[2]===green) {setvalue(node,"port11",red);} 
      if(input[1]===green && input[2]===red) {setvalue(node,"port11",green);}
      if(input[1]===red && input[2]===green) {setvalue(node,"port11",green);}
      if(input[1]===red && input[2]===red) {setvalue(node,"port11",red);}

      if(input[3]===green && input[4]===green) {setvalue(node,"port8",red);} 
      if(input[3]===green && input[4]===red) {setvalue(node,"port8",green);}
      if(input[3]===red && input[4]===green) {setvalue(node,"port8",green);}
      if(input[3]===red && input[4]===red) {setvalue(node,"port8",red);}

      if(input[5]===green && input[6]===green) {setvalue(node,"port3",red);} 
      if(input[5]===green && input[6]===red) {setvalue(node,"port3",green);}
      if(input[5]===red && input[6]===green) {setvalue(node,"port3",green);}
      if(input[5]===red && input[6]===red) {setvalue(node,"port3",red);}

      if(input[7]===green && input[8]===green) {setvalue(node,"port6",red);} 
      if(input[7]===green && input[8]===red) {setvalue(node,"port6",green);}
      if(input[7]===red && input[8]===green) {setvalue(node,"port6",green);}
      if(input[7]===red && input[8]===red) {setvalue(node,"port6",red);}
    }
  }
  function doXnor(node:any) {
    var input = getinput10(node)

    if(input[0]===green && input[9]===green){ //vcc and gnd must active

      if(input[1]===green && input[2]===green) {setvalue(node,"port11",green);} 
      if(input[1]===green && input[2]===red) {setvalue(node,"port11",red);}
      if(input[1]===red && input[2]===green) {setvalue(node,"port11",red);}
      if(input[1]===red && input[2]===red) {setvalue(node,"port11",green);}

      if(input[3]===green && input[4]===green) {setvalue(node,"port8",green);} 
      if(input[3]===green && input[4]===red) {setvalue(node,"port8",red);}
      if(input[3]===red && input[4]===green) {setvalue(node,"port8",red);}
      if(input[3]===red && input[4]===red) {setvalue(node,"port8",green);}

      if(input[5]===green && input[6]===green) {setvalue(node,"port3",green);} 
      if(input[5]===green && input[6]===red) {setvalue(node,"port3",red);}
      if(input[5]===red && input[6]===green) {setvalue(node,"port3",red);}
      if(input[5]===red && input[6]===red) {setvalue(node,"port3",green);}

      if(input[7]===green && input[8]===green) {setvalue(node,"port6",green);} 
      if(input[7]===green && input[8]===red) {setvalue(node,"port6",red);}
      if(input[7]===red && input[8]===green) {setvalue(node,"port6",red);}
      if(input[7]===red && input[8]===red) {setvalue(node,"port6",green);}
    }
  }

  function getinput7seg(node:any){
    var input = [black,black,black,black,black,black,black,black,black,black]
    //console.log(input)
    input[0] = getvalue(node,"portA")!
    input[1] = getvalue(node,"portB")!
    input[2] = getvalue(node,"portC")!
    input[3] = getvalue(node,"portD")!
    input[4] = getvalue(node,"portE")!
    input[5] = getvalue(node,"portF")!
    input[6] = getvalue(node,"portG")!
    input[7] = getvalue(node,"portVcc")!
    input[8] = getvalue(node,"portCom")!
    input[9] = getvalue(node,"portDP")!

    return input
  }

  function do7seg(node:any){
    var input = getinput7seg(node)
    //console.log(input)
    if(input[7]==green && input[8]==green){

      if (input[0]==green) {node.findObject("A").fill=red} else {node.findObject("A").fill=black} 
      if (input[1]==green) {node.findObject("B").fill=red} else {node.findObject("B").fill=black} 
      if (input[2]==green) {node.findObject("C").fill=red} else {node.findObject("C").fill=black} 
      if (input[3]==green) {node.findObject("D").fill=red} else {node.findObject("D").fill=black} 
      if (input[4]==green) {node.findObject("E").fill=red} else {node.findObject("E").fill=black} 
      if (input[5]==green) {node.findObject("F").fill=red} else {node.findObject("F").fill=black} 
      if (input[6]==green) {node.findObject("G").fill=red} else {node.findObject("G").fill=black} 
      if (input[9]==green) {node.findObject("DP").fill=red} else {node.findObject("DP").fill=black} 
    
    }
  }

  function doDff(node:any) {
    var input = getinputdff(node)
    //console.log("hello")

    //console.log(getoldvalue(node,"port9"))

    if(input[0]===green && input[9]===green){ //vcc and gnd must active

      if(input[1]===green){ //check clr
        setvalue(node,"port9",red)
        setvalue(node,"port8",green)
      }
      else if(input[4]===green){ //check pre
        setvalue(node,"port9",green)
        setvalue(node,"port8",red)
      }
      else if(input[3]===green){ //check clk change
        //console.log(input)
        if(input[2]===green) {setvalue(node,"port9",green)}
        else {setvalue(node,"port9",red)}

        if(input[2]===green) {setvalue(node,"port8",red)}
        else setvalue(node,"port8",green)

      }

      //console.log(input)


      //----------------------------------------------



      if(input[5]===green){ //check clr
        setvalue(node,"port9",red)
        setvalue(node,"port8",green)
      }
      else if(input[8]===green){ //check pre
        setvalue(node,"port9",green)
        setvalue(node,"port8",red)
      }
      else if(input[7]===green){ //check clk change

        if(input[6]===green) {setvalue(node,"port5",green)}
        else {setvalue(node,"port5",red)}

        if(input[6]===green) {setvalue(node,"port6",red)}
        else setvalue(node,"port6",green)

      }
      
      
    }

  }

  function doOutput(node:any) {
    // assume there is just one input link
    // we just need to update the node's Shape.fill
    node.linksConnected.each(function(link:any) { node.findObject("NODESHAPE").fill = link.findObject("SHAPE").stroke; });
  }

  function save() {
    var data = diagram.model.toJson();
    console.log(data);
    diagram.isModified = false;
  }

  function load(Data: any) {
    diagram.model = go.Model.fromJson(Data);
  }

  return diagram;
}


// render function...
function Main() {

  useEffect(() => {
    document.title = "Online Simple Circuit"
  }, []);

  // for alert when exit page without saving change.
  // (disabled for now because it's so annoy while testing)
  /*window.addEventListener("beforeunload", (ev) => 
  {  
    ev.preventDefault();
    return ev.returnValue = 'Are you sure you want to close?';
  });*/

  return (
    <div>
      <div className="absolute flex items-center w-full h-16 bg-black">
          <button className="mx-4 text-white text-4xl">OSC</button>
          <button className="mx-8 text-white text-xl">New</button>
          <button className="mx-8 text-white text-xl">Load</button>
          <button className="mx-8 text-white text-xl">Save</button>
      </div>

      <div className="flex">
        <div id="diagramDiv" className="mt-16 w-4/5 bg-gray-200 relative border-b border-black">
          <ReactDiagram
            initDiagram={initDiagram}
            divClassName='main-diagram'
            nodeDataArray={[]}
          />
          <div className="ml-4">
            <p>Drag and drop component from the right side</p>
            <div className="flex">
              <h1 className="pr-5">Ctrl+Z to Undo</h1>
              <h1 className="pr-5">Ctrl+Y to Redo</h1>
              <h1>Mouse wheel to zoom in/out</h1>
            </div>
          </div>
        </div>

        <div style={{height: "90vh"}} className="tabs mt-16 w-1/5 flex flex-col bg-white border-l border-b border-black">
          <div className="tab">
            <input type="radio" id="rd1" name="rd" checked={true}></input>
            <label className="tab-label" htmlFor="rd1">IC Gates</label>
            <div className="tab-content">
              <div id="palette" style={{height: '340px'}}></div>
            </div>
          </div>

          <div className="tab">
            <input type="radio" id="rd2" name="rd"></input>
            <label className="tab-label" htmlFor="rd2">Others items</label>
            <div className="tab-content">
              <div id="palette2" style={{height: '340px'}}></div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Main;