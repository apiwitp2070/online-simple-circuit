import React from 'react';
import { useEffect } from 'react';

import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

import '../App.css';  // contains .diagram-component CSS

//Global variable
var red = "orangered";  // 0 or false
var green = "forestgreen";  // 1 or true

function initDiagram() {
  const $ = go.GraphObject.make;
  // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
  const diagram =
    $(go.Diagram,
      {
        "draggingTool.isGridSnapEnabled": true,
        'undoManager.isEnabled': true,  // must be set to allow for model change listening
        'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
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

  //create a new Platte
  var palette = new go.Palette("palette");
  
  // creates relinkable Links that will avoid crossing Nodes when possible and will jump over other Links in their paths
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
      { name: "SHAPE", strokeWidth: 2, stroke: red }), new go.Binding("stroke", "color").ofModel());
  
    // node template helpers
    var sharedToolTip =
      $("ToolTip",
        { "Border.figure": "RoundedRectangle" },
        $(go.TextBlock, { margin: 2 },
          new go.Binding("text", "", function(d) { return d.category; })));

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

    function shapeStyle() {
      return {
        name: "NODESHAPE",
        fill: "black",
        desiredSize: new go.Size(100, 40),
      };
    }

    function IsInput(input: any) {
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
  
  
    // define templates for each type of node
    var inputTemplate =
      $(go.Node, "Spot", nodeStyle(),
        $(go.Shape, "Circle", shapeStyle(),
          { fill: red }),  // override the default fill (from shapeStyle()) to be red
        $(go.Shape, "Rectangle", IsInput(false),  // the only port
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
        $(go.Shape, "Square", shapeStyle(),
          { fill: "grey" }),  // override the default fill (from shapeStyle()) to be green
        $(go.Shape, "Rectangle", IsInput(true),  // the only port
          { portId: "", alignment: new go.Spot(0, 0.5) })
      );

    var andTemplate =
      $(go.Node, "Spot", nodeStyle(),
        $(go.Shape, "Rectangle", shapeStyle(),
            { fill: "black" }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in1", alignment: new go.Spot(0.05, 0) }),//vcc
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in2", alignment: new go.Spot(0.2, 0) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in3", alignment: new go.Spot(0.35, 0) }),
        $(go.Shape, "Rectangle", IsInput(false),
          { portId: "out4", alignment: new go.Spot(0.5, 0) }), //out4 of in2 in3
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in5", alignment: new go.Spot(0.65, 0) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in6", alignment: new go.Spot(0.8, 0) }),
        $(go.Shape, "Rectangle", IsInput(false),
          { portId: "out7", alignment: new go.Spot(0.95, 0) }), //out7 of in5 in6
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in8", alignment: new go.Spot(0.05, 1) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in9", alignment: new go.Spot(0.2, 1) }),
        $(go.Shape, "Rectangle", IsInput(false),
          { portId: "out10", alignment: new go.Spot(0.35, 1) }), //out10 of in8 in9
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in11", alignment: new go.Spot(0.5, 1) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in12", alignment: new go.Spot(0.65, 1) }),
        $(go.Shape, "Rectangle", IsInput(false),
          { portId: "out13", alignment: new go.Spot(0.8, 1) }), //out13 of in11 in12
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in14", alignment: new go.Spot(0.95, 1) }), //gnd
        $(go.TextBlock, { text: "And", stroke: "white" }),
      );

    var orTemplate =
      $(go.Node, "Spot", nodeStyle(),
        $(go.Shape, "Rectangle", shapeStyle(),
            { fill: "black" }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in1", alignment: new go.Spot(0.05, 1) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in2", alignment: new go.Spot(0.2, 1) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in3", alignment: new go.Spot(0.35, 1) }),
        $(go.Shape, "Rectangle", IsInput(false),
          { portId: "out4", alignment: new go.Spot(0.5, 1) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in5", alignment: new go.Spot(0.65, 1) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in6", alignment: new go.Spot(0.8, 1) }),
        $(go.Shape, "Rectangle", IsInput(false),
          { portId: "out7", alignment: new go.Spot(0.95, 1) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in8", alignment: new go.Spot(0.05, 0) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in9", alignment: new go.Spot(0.2, 0) }),
        $(go.Shape, "Rectangle", IsInput(false),
          { portId: "out10", alignment: new go.Spot(0.35, 0) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in11", alignment: new go.Spot(0.5, 0) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in12", alignment: new go.Spot(0.65, 0) }),
        $(go.Shape, "Rectangle", IsInput(false),
          { portId: "out13", alignment: new go.Spot(0.8, 0) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in14", alignment: new go.Spot(0.95, 0) }),
        $(go.TextBlock, { text: "or", stroke: "white" }),
      );

    var xorTemplate =
      $(go.Node, "Spot", nodeStyle(),
        $(go.Shape, "Rectangle", shapeStyle(),
          { fill: "black" }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in1", alignment: new go.Spot(0.05, 1) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in2", alignment: new go.Spot(0.2, 1) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in3", alignment: new go.Spot(0.35, 1) }),
        $(go.Shape, "Rectangle", IsInput(false),
          { portId: "out4", alignment: new go.Spot(0.5, 1) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in5", alignment: new go.Spot(0.65, 1) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in6", alignment: new go.Spot(0.8, 1) }),
        $(go.Shape, "Rectangle", IsInput(false),
          { portId: "out7", alignment: new go.Spot(0.95, 1) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in8", alignment: new go.Spot(0.05, 0) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in9", alignment: new go.Spot(0.2, 0) }),
        $(go.Shape, "Rectangle", IsInput(false),
          { portId: "out10", alignment: new go.Spot(0.35, 0) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in11", alignment: new go.Spot(0.5, 0) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in12", alignment: new go.Spot(0.65, 0) }),
        $(go.Shape, "Rectangle", IsInput(false),
          { portId: "out13", alignment: new go.Spot(0.8, 0) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in14", alignment: new go.Spot(0.95, 0) }),
        $(go.TextBlock, { text: "xor", stroke: "white" }),
      );

    var norTemplate =
      $(go.Node, "Spot", nodeStyle(),
        $(go.Shape, "Rectangle", shapeStyle(),
            { fill: "black" }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in1", alignment: new go.Spot(0.05, 1) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in2", alignment: new go.Spot(0.2, 1) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in3", alignment: new go.Spot(0.35, 1) }),
        $(go.Shape, "Rectangle", IsInput(false),
          { portId: "out4", alignment: new go.Spot(0.5, 1) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in5", alignment: new go.Spot(0.65, 1) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in6", alignment: new go.Spot(0.8, 1) }),
        $(go.Shape, "Rectangle", IsInput(false),
          { portId: "out7", alignment: new go.Spot(0.95, 1) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in8", alignment: new go.Spot(0.05, 0) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in9", alignment: new go.Spot(0.2, 0) }),
        $(go.Shape, "Rectangle", IsInput(false),
          { portId: "out10", alignment: new go.Spot(0.35, 0) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in11", alignment: new go.Spot(0.5, 0) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in12", alignment: new go.Spot(0.65, 0) }),
        $(go.Shape, "Rectangle", IsInput(false),
          { portId: "out13", alignment: new go.Spot(0.8, 0) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in14", alignment: new go.Spot(0.95, 0) }),
        $(go.TextBlock, { text: "nor", stroke: "white" }),
      );

    var xnorTemplate =
      $(go.Node, "Spot", nodeStyle(),
        $(go.Shape, "Rectangle", shapeStyle()),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in1", alignment: new go.Spot(0, 0.3) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in2", alignment: new go.Spot(0, 0.7) }),
        $(go.Shape, "Rectangle", IsInput(false),
          { portId: "out", alignment: new go.Spot(1, 0.5) }),
        $(go.TextBlock, { text: "xnor", stroke: "white" }),
      );

    var nandTemplate =
      $(go.Node, "Spot", nodeStyle(),
        $(go.Shape, "Rectangle", shapeStyle()),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in1", alignment: new go.Spot(0, 0.3) }),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in2", alignment: new go.Spot(0, 0.7) }),
        $(go.Shape, "Rectangle", IsInput(false),
          { portId: "out", alignment: new go.Spot(1, 0.5) }),
        $(go.TextBlock, { text: "nand", stroke: "white" }),
      );

    var notTemplate =
      $(go.Node, "Spot", nodeStyle(),
        $(go.Shape, "Rectangle", shapeStyle()),
        $(go.Shape, "Rectangle", IsInput(true),
          { portId: "in", alignment: new go.Spot(0, 0.5) }),
        $(go.Shape, "Rectangle", IsInput(false),
          { portId: "out", alignment: new go.Spot(1, 0.5) }),
        $(go.TextBlock, { text: "not", stroke: "white" }),
      );

    // add the templates created above to diagram and palette
    diagram.nodeTemplateMap.add("input", inputTemplate);
    diagram.nodeTemplateMap.add("output", outputTemplate);
    diagram.nodeTemplateMap.add("and", andTemplate);
    diagram.nodeTemplateMap.add("or", orTemplate);
    diagram.nodeTemplateMap.add("xor", xorTemplate);
    diagram.nodeTemplateMap.add("not", notTemplate);
    diagram.nodeTemplateMap.add("nand", nandTemplate);
    diagram.nodeTemplateMap.add("nor", norTemplate);
    diagram.nodeTemplateMap.add("xnor", xnorTemplate);
  
    // share the template map with the Palette
    palette.nodeTemplateMap = diagram.nodeTemplateMap;

    palette.model.nodeDataArray = [
      { category: "input" },
      { category: "output" },
      { category: "and" },
      { category: "or" },
      { category: "xor" },
      { category: "not" },
      { category: "nand" },
      { category: "nor" },
      { category: "xnor" }
    ];

    loop();

    function loop() {
      setTimeout(function() { updateStates(); loop(); }, 250);
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
          case "and": doAnd(node); break;
          case "or": doOr(node); break;
          case "xor": doXor(node); break;
          case "not": doNot(node); break;
          case "nand": doNand(node); break;
          case "nor": doNor(node); break;
          case "xnor": doXnor(node); break;
          case "output": doOutput(node); break;
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

    function doAnd(node:any) {
      var f:any = []
      var output:any = [red,red,red,red]
          
      node.findLinksInto().each( function(link:any) {

        f.push(link.findObject("SHAPE").stroke)
           
          if (f[1] === green && f[2] === green){
            output[0] = green
          }
          else{
            output[0] = red
          }

          if (f[3] === green && f[4] === green){
            output[1] = green
          }
          else{
            output[1] = red
          }

          if (f[5] === green && f[6] === green){
            output[2] = green
          }
          else{
            output[2] = red
          }

          if (f[7] === green && f[8] === green){
            output[3] = green
          }
          else{
            output[3] = red
          }
      
        //setOutputLinks(node, color);
      })

      var count=0

      node.findLinksOutOf().each( function(link:any) {

        if(output[count]){
          link.findObject("SHAPE").stroke=output[count]
        }
      
        //setOutputLinks(node, color);
        count = count+1
      })

      console.log(output)

    }

    function doNand(node:any) {

    }
    function doNot(node:any) {

      var f:any = []
      var output:any = ''
        
          
      node.findLinksInto().each( function(link:any) {

        f.push(link.findObject("SHAPE").stroke)
           
          if (f[0] === green){
            var color = red
            output = color
          }
          else{
            var color = green
            output = color
          }
      
        //setOutputLinks(node, color);
      })

      node.findLinksOutOf().each( function(link:any) {

        link.findObject("SHAPE").stroke=output
      
        //setOutputLinks(node, color);
      })
    }

    function doOr(node:any) {

    }
    function doNor(node:any) {

    }

    function doXor(node:any) {

    }
    function doXnor(node:any) {

    }

    function doOutput(node:any) {
      // assume there is just one input link
      // we just need to update the node's Shape.fill
      node.linksConnected.each(function(link:any) { node.findObject("NODESHAPE").fill = link.findObject("SHAPE").stroke; });
    }


  return diagram;
}

// render function...
function Main() {
  useEffect(() => {
    document.title = "Online Simple Circuit"
  }, []);

  return (
    <div>
      <div className="absolute flex items-center w-full h-16 bg-black">
          <h1 className="mx-4 text-white text-4xl">OSC</h1>
          <h1 className="mx-8 text-white text-xl">File</h1>
          <h1 className="mx-8 text-white text-xl">Edit</h1>
          <h1 className="mx-8 text-white text-xl">Menu</h1>
          <h1 className="mx-8 text-white text-xl">Menu</h1>
      </div>

      <div className="flex">
        <div className="mt-16 w-4/5 bg-gray-200 relative">
          <div className="absolute bottom-4 left-1/2">
            - 100 % +
          </div>
          <ReactDiagram
            initDiagram={initDiagram}
            divClassName='main-diagram'
            nodeDataArray={[]}
          />
        </div>

        <div style={{height: "90vh"}} className="mt-16 w-1/5 bg-gray-100" id="palette">
        </div>

      </div>
    </div>
  );
}

export default Main;