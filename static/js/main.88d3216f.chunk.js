(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{15:function(e,t,n){},27:function(e,t,n){},35:function(e,t,n){"use strict";n.r(t);var o=n(1),a=n.n(o),p=n(18),r=n.n(p),l=(n(27),n(19)),i=n(3),c=n(8),d=n.n(c),S=n(11),g=n(0),s=n(22);n(15);function h(){return{name:"NODESHAPE",fill:"black",desiredSize:new g.Size(100,40)}}function m(){return{fill:"gray",desiredSize:new g.Size(8,12)}}function w(){return{name:"A",stroke:"white",fill:"white",desiredSize:new g.Size(1,30)}}function f(){return{name:"B",stroke:"white",fill:"white",desiredSize:new g.Size(1,30)}}function u(e){return{desiredSize:new g.Size(6,6),fill:"#c3c6cd",fromSpot:g.Spot.Bottom,fromLinkable:!e,toSpot:g.Spot.Top,toLinkable:e,toMaxLinks:1,cursor:"pointer"}}function b(e){return{desiredSize:new g.Size(6,6),fill:"#c3c6cd",fromSpot:g.Spot.Top,fromLinkable:!e,toSpot:g.Spot.Bottom,toLinkable:e,toMaxLinks:1,cursor:"pointer"}}function R(e){return{desiredSize:new g.Size(6,6),fill:"#c3c6cd",fromSpot:g.Spot.Right,fromLinkable:!e,toSpot:g.Spot.Left,toLinkable:e,toMaxLinks:1,cursor:"pointer"}}function I(){return{desiredSize:new g.Size(6,6),fill:"#c3c6cd",fromSpot:g.Spot.Left,fromLinkable:!0,toSpot:g.Spot.Left,toLinkable:!0,toMaxLinks:1,cursor:"pointer"}}function k(){return{desiredSize:new g.Size(6,6),fill:"#c3c6cd",fromSpot:g.Spot.Right,fromLinkable:!0,toSpot:g.Spot.Right,toLinkable:!0,toMaxLinks:1,cursor:"pointer"}}var j=n(2),O=0,x={},v=n(30),y=0,T="px-8 py-5 bg-black text-white text-xl block transition ease-out duration-300 focus:outline-none hover:bg-white hover:text-black";function z(){var e="orangered",t="forestgreen",n="black",o="blue",a="yellow",p="grey",r=(Math.sqrt(2)-1)/3*4,l=g.GraphObject.make,i=l(g.Diagram,{"toolManager.mouseWheelBehavior":g.ToolManager.WheelZoom,"draggingTool.isGridSnapEnabled":!0,"undoManager.isEnabled":!0,initialScale:1.5});i.addDiagramListener("Modified",(function(e){var t=document.title.indexOf("*");i.isModified?t<0&&(document.title+="*"):t>=0&&(document.title=document.title.substr(0,t))}));var c=new g.Palette("palette"),s=new g.Palette("palette2");i.grid.visible=!0,i.grid=l(g.Panel,g.Panel.Grid,{gridCellSize:new g.Size(10,10)},l(g.Shape,"LineH",{stroke:"lightgray"}),l(g.Shape,"LineV",{stroke:"lightgray"})),g.Shape.defineFigureGenerator("HalfEllipse",(function(e,t,n){return(new g.Geometry).add(new g.PathFigure(0,0,!0).add(new g.PathSegment(g.PathSegment.Bezier,t,.5*n,r*t,0,t,(.5-r/2)*n)).add(new g.PathSegment(g.PathSegment.Bezier,0,n,t,(.5+r/2)*n,r*t,n).close())).setSpots(0,.156,.844,.844)})),i.linkTemplate=l(g.Link,{routing:g.Link.AvoidsNodes,curve:g.Link.JumpOver,corner:3,relinkableFrom:!0,relinkableTo:!0,selectionAdorned:!1,shadowOffset:new g.Point(0,0),shadowBlur:5,shadowColor:"blue"},new g.Binding("isShadowed","isSelected").ofObject(),l(g.Shape,{name:"SHAPE",strokeWidth:2,stroke:e,parameter1:0}),new g.Binding("stroke","color").ofModel(),new g.Binding("parameter1","value")),i.model=l(g.GraphLinksModel,{linkFromPortIdProperty:"fromPort",linkToPortIdProperty:"toPort"});var j=l("ToolTip",{"Border.figure":"RoundedRectangle"},l(g.TextBlock,{margin:2},new g.Binding("text","",(function(e){return e.category}))));function T(){return[new g.Binding("location","loc",g.Point.parse).makeTwoWay(g.Point.stringify),new g.Binding("isShadowed","isSelected").ofObject(),{selectionAdorned:!1,shadowOffset:new g.Point(0,0),shadowBlur:15,shadowColor:"blue",toolTip:j}]}var z=l(g.Node,"Spot",T(),l(g.Shape,"Circle",h(),{fill:e}),l(g.Shape,"Rectangle",R(!1),{portId:"",alignment:new g.Spot(.4,.5)},new g.Binding("fill","color").ofModel()),{doubleClick:function(n,o){n.diagram.startTransaction("Toggle Input");var a=o.findObject("NODESHAPE");a.fill=a.fill===t?e:t,K(),n.diagram.commitTransaction("Toggle Input")}}),N=l(g.Node,"Spot",T(),l(g.Shape,"Square",h(),{fill:"grey"}),l(g.Shape,"Rectangle",R(!0),{portId:"",alignment:new g.Spot(0,.5)},new g.Binding("fill","color").ofModel())),M=l(g.Node,"Spot",T(),l(g.Shape,"Rectangle",h(),{fill:e}),l(g.Shape,"Rectangle",R(!1),{portId:"",alignment:new g.Spot(1,.5)},new g.Binding("fill","color").ofModel()),l(g.TextBlock,{text:"clk T=1500ms",stroke:"white"})),B=l(g.Node,"Spot",T(),l(g.Shape,"Rectangle",h(),{fill:"orange"}),l(g.Shape,"Rectangle",R(!1),{portId:"",alignment:new g.Spot(1,.5)},new g.Binding("fill","color").ofModel()),l(g.TextBlock,{text:"Vcc",stroke:"white"})),E=l(g.Node,"Spot",T(),l(g.Shape,"triangle",h(),{fill:"grey",angle:180}),l(g.Shape,"Rectangle",R(!1),{portId:"",alignment:new g.Spot(.75,.5)},new g.Binding("fill","color").ofModel()),l(g.TextBlock,{text:"Gnd",stroke:"black"})),P=l(g.Node,"Spot",T(),l(g.Shape,"Rectangle",h()),l(g.Shape,"HalfEllipse",m(),{alignment:new g.Spot(.05,.5)}),l(g.Shape,"Rectangle",u(!0),{portId:"port14",alignment:new g.Spot(.05,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port13",alignment:new g.Spot(.2,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port12",alignment:new g.Spot(.35,0)}),l(g.Shape,"Rectangle",b(!1),{portId:"port11",alignment:new g.Spot(.5,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port10",alignment:new g.Spot(.65,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port9",alignment:new g.Spot(.8,0)}),l(g.Shape,"Rectangle",b(!1),{portId:"port8",alignment:new g.Spot(.95,0)}),l(g.Shape,"Rectangle",b(!0),{portId:"port1",alignment:new g.Spot(.05,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port2",alignment:new g.Spot(.2,1)}),l(g.Shape,"Rectangle",u(!1),{portId:"port3",alignment:new g.Spot(.35,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port4",alignment:new g.Spot(.5,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port5",alignment:new g.Spot(.65,1)}),l(g.Shape,"Rectangle",u(!1),{portId:"port6",alignment:new g.Spot(.8,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port7",alignment:new g.Spot(.95,1)}),l(g.TextBlock,{text:"7408 and",stroke:"white"})),D=l(g.Node,"Spot",T(),l(g.Shape,"Rectangle",h()),l(g.Shape,"HalfEllipse",m(),{alignment:new g.Spot(.05,.5)}),l(g.Shape,"Rectangle",u(!0),{portId:"port14",alignment:new g.Spot(.05,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port13",alignment:new g.Spot(.2,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port12",alignment:new g.Spot(.35,0)}),l(g.Shape,"Rectangle",b(!1),{portId:"port11",alignment:new g.Spot(.5,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port10",alignment:new g.Spot(.65,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port9",alignment:new g.Spot(.8,0)}),l(g.Shape,"Rectangle",b(!1),{portId:"port8",alignment:new g.Spot(.95,0)}),l(g.Shape,"Rectangle",b(!0),{portId:"port1",alignment:new g.Spot(.05,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port2",alignment:new g.Spot(.2,1)}),l(g.Shape,"Rectangle",u(!1),{portId:"port3",alignment:new g.Spot(.35,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port4",alignment:new g.Spot(.5,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port5",alignment:new g.Spot(.65,1)}),l(g.Shape,"Rectangle",u(!1),{portId:"port6",alignment:new g.Spot(.8,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port7",alignment:new g.Spot(.95,1)}),l(g.TextBlock,{text:"7432 or",stroke:"white"})),L=l(g.Node,"Spot",T(),l(g.Shape,"Rectangle",h()),l(g.Shape,"HalfEllipse",m(),{alignment:new g.Spot(.05,.5)}),l(g.Shape,"Rectangle",u(!0),{portId:"port14",alignment:new g.Spot(.05,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port13",alignment:new g.Spot(.2,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port12",alignment:new g.Spot(.35,0)}),l(g.Shape,"Rectangle",b(!1),{portId:"port11",alignment:new g.Spot(.5,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port10",alignment:new g.Spot(.65,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port9",alignment:new g.Spot(.8,0)}),l(g.Shape,"Rectangle",b(!1),{portId:"port8",alignment:new g.Spot(.95,0)}),l(g.Shape,"Rectangle",b(!0),{portId:"port1",alignment:new g.Spot(.05,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port2",alignment:new g.Spot(.2,1)}),l(g.Shape,"Rectangle",u(!1),{portId:"port3",alignment:new g.Spot(.35,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port4",alignment:new g.Spot(.5,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port5",alignment:new g.Spot(.65,1)}),l(g.Shape,"Rectangle",u(!1),{portId:"port6",alignment:new g.Spot(.8,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port7",alignment:new g.Spot(.95,1)}),l(g.TextBlock,{text:"7486 xor",stroke:"white"})),C=l(g.Node,"Spot",T(),l(g.Shape,"Rectangle",h()),l(g.Shape,"HalfEllipse",m(),{alignment:new g.Spot(.05,.5)}),l(g.Shape,"Rectangle",u(!0),{portId:"port14",alignment:new g.Spot(.05,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port13",alignment:new g.Spot(.2,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port12",alignment:new g.Spot(.35,0)}),l(g.Shape,"Rectangle",b(!1),{portId:"port11",alignment:new g.Spot(.5,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port10",alignment:new g.Spot(.65,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port9",alignment:new g.Spot(.8,0)}),l(g.Shape,"Rectangle",b(!1),{portId:"port8",alignment:new g.Spot(.95,0)}),l(g.Shape,"Rectangle",b(!0),{portId:"port1",alignment:new g.Spot(.05,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port2",alignment:new g.Spot(.2,1)}),l(g.Shape,"Rectangle",u(!1),{portId:"port3",alignment:new g.Spot(.35,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port4",alignment:new g.Spot(.5,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port5",alignment:new g.Spot(.65,1)}),l(g.Shape,"Rectangle",u(!1),{portId:"port6",alignment:new g.Spot(.8,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port7",alignment:new g.Spot(.95,1)}),l(g.TextBlock,{text:"7402 nor",stroke:"white"})),A=l(g.Node,"Spot",T(),l(g.Shape,"Rectangle",h()),l(g.Shape,"HalfEllipse",m(),{alignment:new g.Spot(.05,.5)}),l(g.Shape,"Rectangle",u(!0),{portId:"port14",alignment:new g.Spot(.05,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port13",alignment:new g.Spot(.2,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port12",alignment:new g.Spot(.35,0)}),l(g.Shape,"Rectangle",b(!1),{portId:"port11",alignment:new g.Spot(.5,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port10",alignment:new g.Spot(.65,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port9",alignment:new g.Spot(.8,0)}),l(g.Shape,"Rectangle",b(!1),{portId:"port8",alignment:new g.Spot(.95,0)}),l(g.Shape,"Rectangle",b(!0),{portId:"port1",alignment:new g.Spot(.05,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port2",alignment:new g.Spot(.2,1)}),l(g.Shape,"Rectangle",u(!1),{portId:"port3",alignment:new g.Spot(.35,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port4",alignment:new g.Spot(.5,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port5",alignment:new g.Spot(.65,1)}),l(g.Shape,"Rectangle",u(!1),{portId:"port6",alignment:new g.Spot(.8,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port7",alignment:new g.Spot(.95,1)}),l(g.TextBlock,{text:"74266 xnor",stroke:"white"})),H=l(g.Node,"Spot",T(),l(g.Shape,"Rectangle",h()),l(g.Shape,"HalfEllipse",m(),{alignment:new g.Spot(.05,.5)}),l(g.Shape,"Rectangle",u(!0),{portId:"port14",alignment:new g.Spot(.05,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port13",alignment:new g.Spot(.2,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port12",alignment:new g.Spot(.35,0)}),l(g.Shape,"Rectangle",b(!1),{portId:"port11",alignment:new g.Spot(.5,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port10",alignment:new g.Spot(.65,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port9",alignment:new g.Spot(.8,0)}),l(g.Shape,"Rectangle",b(!1),{portId:"port8",alignment:new g.Spot(.95,0)}),l(g.Shape,"Rectangle",b(!0),{portId:"port1",alignment:new g.Spot(.05,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port2",alignment:new g.Spot(.2,1)}),l(g.Shape,"Rectangle",u(!1),{portId:"port3",alignment:new g.Spot(.35,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port4",alignment:new g.Spot(.5,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port5",alignment:new g.Spot(.65,1)}),l(g.Shape,"Rectangle",u(!1),{portId:"port6",alignment:new g.Spot(.8,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port7",alignment:new g.Spot(.95,1)}),l(g.TextBlock,{text:"7400 nand",stroke:"white"})),F=l(g.Node,"Spot",T(),l(g.Shape,"Rectangle",h()),l(g.Shape,"HalfEllipse",m(),{alignment:new g.Spot(.05,.5)}),l(g.Shape,"Rectangle",u(!0),{portId:"port14",alignment:new g.Spot(.05,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port13",alignment:new g.Spot(.2,0)}),l(g.Shape,"Rectangle",b(!1),{portId:"port12",alignment:new g.Spot(.35,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port11",alignment:new g.Spot(.5,0)}),l(g.Shape,"Rectangle",b(!1),{portId:"port10",alignment:new g.Spot(.65,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port9",alignment:new g.Spot(.8,0)}),l(g.Shape,"Rectangle",b(!1),{portId:"port8",alignment:new g.Spot(.95,0)}),l(g.Shape,"Rectangle",b(!0),{portId:"port1",alignment:new g.Spot(.05,1)}),l(g.Shape,"Rectangle",u(!1),{portId:"port2",alignment:new g.Spot(.2,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port3",alignment:new g.Spot(.35,1)}),l(g.Shape,"Rectangle",u(!1),{portId:"port4",alignment:new g.Spot(.5,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port5",alignment:new g.Spot(.65,1)}),l(g.Shape,"Rectangle",u(!1),{portId:"port6",alignment:new g.Spot(.8,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port7",alignment:new g.Spot(.95,1)}),l(g.TextBlock,{text:"7404 not",stroke:"white"})),G=l(g.Node,"Spot",T(),l(g.Shape,"Rectangle",h()),l(g.Shape,"HalfEllipse",m(),{alignment:new g.Spot(.05,.5)}),l(g.Shape,"Rectangle",u(!0),{portId:"port14",alignment:new g.Spot(.05,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port13",alignment:new g.Spot(.2,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port12",alignment:new g.Spot(.35,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port11",alignment:new g.Spot(.5,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"port10",alignment:new g.Spot(.65,0)}),l(g.Shape,"Rectangle",b(!1),{portId:"port9",alignment:new g.Spot(.8,0)}),l(g.Shape,"Rectangle",b(!1),{portId:"port8",alignment:new g.Spot(.95,0)}),l(g.Shape,"Rectangle",b(!0),{portId:"port1",alignment:new g.Spot(.05,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port2",alignment:new g.Spot(.2,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port3",alignment:new g.Spot(.35,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port4",alignment:new g.Spot(.5,1)}),l(g.Shape,"Rectangle",u(!1),{portId:"port5",alignment:new g.Spot(.65,1)}),l(g.Shape,"Rectangle",u(!1),{portId:"port6",alignment:new g.Spot(.8,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port7",alignment:new g.Spot(.95,1)}),l(g.TextBlock,{text:"7474 dff",stroke:"white"})),_=l(g.Node,"Spot",T(),l(g.Shape,"Rectangle",{name:"LED",fill:"gray",desiredSize:new g.Size(20,40)}),l(g.Shape,"Rectangle",b(!0),{portId:"port1",alignment:new g.Spot(.2,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port2",alignment:new g.Spot(.8,1)}),l(g.TextBlock,{text:"led",stroke:"white"})),J=l(g.Node,"Spot",T(),l(g.Shape,"Rectangle",{name:"LED",fill:"gray",desiredSize:new g.Size(20,40)}),l(g.Shape,"Rectangle",b(!0),{portId:"port1",alignment:new g.Spot(.2,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port2",alignment:new g.Spot(.8,1)}),l(g.TextBlock,{text:"led",stroke:"white"})),q=l(g.Node,"Spot",T(),l(g.Shape,"Rectangle",{name:"LED",fill:"gray",desiredSize:new g.Size(20,40)}),l(g.Shape,"Rectangle",b(!0),{portId:"port1",alignment:new g.Spot(.2,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"port2",alignment:new g.Spot(.8,1)}),l(g.TextBlock,{text:"led",stroke:"white"})),U=l(g.Node,"Spot",T(),l(g.Shape,"RoundedRectangle",{fill:"#D9CAB3",desiredSize:new g.Size(60,20)}),l(g.Shape,"Rectangle",R(!0),{portId:"in",alignment:new g.Spot(0,.5)}),l(g.Shape,"Rectangle",R(!1),{portId:"out",alignment:new g.Spot(1,.5)}),l(g.Shape,{fill:"brown",desiredSize:new g.Size(5,20),alignment:new g.Spot(.2,.5)}),l(g.Shape,{fill:"black",desiredSize:new g.Size(5,20),alignment:new g.Spot(.4,.5)}),l(g.Shape,{fill:"orange",desiredSize:new g.Size(5,20),alignment:new g.Spot(.6,.5)}),l(g.Shape,{fill:"#AB6D23",desiredSize:new g.Size(5,20),alignment:new g.Spot(.8,.5)})),V=l(g.Node,"Spot",T(),l(g.Shape,"Square",h()),l(g.Shape,"Rectangle",R(!0),{portId:"in",alignment:new g.Spot(0,.5)}),l(g.Shape,"Rectangle",R(!1),{portId:"out",alignment:new g.Spot(.4,.5)}),l(g.Shape,w(),{alignment:new g.Spot(.2,.35),angle:60}),l(g.Shape,{name:"C",stroke:"white",fill:"white",desiredSize:new g.Size(1,30)},{alignment:new g.Spot(.2,.5),angle:90,opacity:0}),{doubleClick:function(e,t){e.diagram.startTransaction("Toggle Switch");var n=t.findObject("A"),o=t.findObject("C");n.opacity=1==n.opacity?0:1,o.opacity=1==o.opacity?0:1,K(),e.diagram.commitTransaction("Toggle Switch")}}),W=l(g.Node,"Spot",T(),l(g.Shape,"Square",h()),l(g.Shape,"Rectangle",k(),{portId:"port1",alignment:new g.Spot(.4,.2)}),l(g.Shape,"Rectangle",k(),{portId:"port2",alignment:new g.Spot(.4,.8)}),l(g.Shape,"Rectangle",I(),{portId:"port3",alignment:new g.Spot(0,.5)}),l(g.Shape,w(),{alignment:new g.Spot(.2,.65),angle:-70}),l(g.Shape,f(),{alignment:new g.Spot(.2,.35),angle:70,opacity:0}),{doubleClick:function(e,t){e.diagram.startTransaction("Toggle Switch");var n=t.findObject("A"),o=t.findObject("B");n.opacity=1==n.opacity?0:1,o.opacity=1==o.opacity?0:1,K(),e.diagram.commitTransaction("Toggle Switch")}}),Z=l(g.Node,"Spot",T(),l(g.Shape,"Square",h()),l(g.Shape,"Rectangle",I(),{portId:"port1",alignment:new g.Spot(0,.2)}),l(g.Shape,"Rectangle",I(),{portId:"port2",alignment:new g.Spot(0,.8)}),l(g.Shape,"Rectangle",k(),{portId:"port3",alignment:new g.Spot(.4,.5)}),l(g.Shape,w(),{alignment:new g.Spot(.2,.35),angle:-70}),l(g.Shape,f(),{alignment:new g.Spot(.2,.65),angle:70,opacity:0}),{doubleClick:function(e,t){e.diagram.startTransaction("Toggle Switch");var n=t.findObject("A"),o=t.findObject("B");n.opacity=1==n.opacity?0:1,o.opacity=1==o.opacity?0:1,K(),e.diagram.commitTransaction("Toggle Switch")}}),Y=l(g.Node,"Spot",T(),l(g.Shape,"Rectangle",{fill:"black",desiredSize:new g.Size(100,150)}),l(g.Shape,"Rectangle",u(!0),{portId:"portG",alignment:new g.Spot(.1,0)}),l(g.Shape,"Rectangle",{name:"G",stroke:"white",fill:"black",desiredSize:new g.Size(5,55)},{angle:90,alignment:new g.Spot(.4,.5)}),l(g.Shape,"Rectangle",u(!0),{portId:"portF",alignment:new g.Spot(.3,0)}),l(g.Shape,"Rectangle",{name:"F",stroke:"white",fill:"black",desiredSize:new g.Size(5,55)},{alignment:new g.Spot(.1,.3)}),l(g.Shape,"Rectangle",u(!0),{portId:"portVcc",alignment:new g.Spot(.5,0)}),l(g.Shape,"Rectangle",u(!0),{portId:"portA",alignment:new g.Spot(.7,0)}),l(g.Shape,"Rectangle",{name:"A",stroke:"white",fill:"black",desiredSize:new g.Size(5,55)},{angle:90,alignment:new g.Spot(.4,.1)}),l(g.Shape,"Rectangle",u(!0),{portId:"portB",alignment:new g.Spot(.9,0)}),l(g.Shape,"Rectangle",{name:"B",stroke:"white",fill:"black",desiredSize:new g.Size(5,55)},{alignment:new g.Spot(.7,.3)}),l(g.Shape,"Rectangle",b(!0),{portId:"portE",alignment:new g.Spot(.1,1)}),l(g.Shape,"Rectangle",{name:"E",stroke:"white",fill:"black",desiredSize:new g.Size(5,55)},{alignment:new g.Spot(.1,.7)}),l(g.Shape,"Rectangle",b(!0),{portId:"portD",alignment:new g.Spot(.3,1)}),l(g.Shape,"Rectangle",{name:"D",stroke:"white",fill:"black",desiredSize:new g.Size(5,55)},{angle:90,alignment:new g.Spot(.4,.9)}),l(g.Shape,"Rectangle",b(!0),{portId:"portCom",alignment:new g.Spot(.5,1)}),l(g.Shape,"Rectangle",b(!0),{portId:"portC",alignment:new g.Spot(.7,1)}),l(g.Shape,"Rectangle",{name:"C",stroke:"white",fill:"black",desiredSize:new g.Size(5,55)},{alignment:new g.Spot(.7,.7)}),l(g.Shape,"Rectangle",b(!0),{portId:"portDP",alignment:new g.Spot(.9,1)}),l(g.Shape,"Circle",{name:"DP",desiredSize:new g.Size(10,10),stroke:"white",fill:"black",alignment:new g.Spot(.85,.9)}));function K(){var r=i.skipsUndoManager;i.skipsUndoManager=!0,i.nodes.each((function(e){"input"===e.category&&function(e){Q(e,e.findObject("NODESHAPE").fill)}(e)})),i.nodes.each((function(r){switch(r.category){case"clk":!function(n){O%6===0&&(n.findObject("NODESHAPE").fill===t?n.findObject("NODESHAPE").fill=e:n.findObject("NODESHAPE").fill=t,Q(n,n.findObject("NODESHAPE").fill))}(r);break;case"and":!function(n){var r=ee(n);r[0]===a&&r[9]===p?(r[1]===o||r[2]===o?$(n,"port11",o):r[1]===t&&r[2]===t?$(n,"port11",t):$(n,"port11",e),r[3]===o||r[4]===o?$(n,"port8",o):r[3]===t&&r[4]===t?$(n,"port8",t):$(n,"port8",e),r[5]===o||r[6]===o?$(n,"port3",o):r[5]===t&&r[6]===t?$(n,"port3",t):$(n,"port3",e),r[7]===o||r[8]===o?$(n,"port6",o):r[7]===t&&r[8]===t?$(n,"port6",t):$(n,"port6",e)):($(n,"port11",o),$(n,"port8",o),$(n,"port3",o),$(n,"port6",o))}(r);break;case"or":!function(n){var r=ee(n);r[0]===a&&r[9]===p?(r[1]===o||r[2]===o?$(n,"port11",o):r[1]===t||r[2]===t?$(n,"port11",t):$(n,"port11",e),r[1]===o||r[2]===o?$(n,"port8",o):r[3]===t||r[4]===t?$(n,"port8",t):$(n,"port8",e),r[5]===o||r[6]===o?$(n,"port3",o):r[5]===t||r[6]===t?$(n,"port3",t):$(n,"port3",e),r[7]===o||r[8]===o?$(n,"port6",o):r[7]===t||r[8]===t?$(n,"port6",t):$(n,"port6",e)):($(n,"port11",o),$(n,"port8",o),$(n,"port3",o),$(n,"port6",o))}(r);break;case"xor":!function(n){var r=ee(n);r[0]===a&&r[9]===p?(r[1]!==o&&r[2]!==o||$(n,"port11",o),r[1]===t&&r[2]===t&&$(n,"port11",e),r[1]===t&&r[2]===e&&$(n,"port11",t),r[1]===e&&r[2]===t&&$(n,"port11",t),r[1]===e&&r[2]===e&&$(n,"port11",e),r[3]!==o&&r[4]!==o||$(n,"port8",o),r[3]===t&&r[4]===t&&$(n,"port8",e),r[3]===t&&r[4]===e&&$(n,"port8",t),r[3]===e&&r[4]===t&&$(n,"port8",t),r[3]===e&&r[4]===e&&$(n,"port8",e),r[5]!==o&&r[6]!==o||$(n,"port3",o),r[5]===t&&r[6]===t&&$(n,"port3",e),r[5]===t&&r[6]===e&&$(n,"port3",t),r[5]===e&&r[6]===t&&$(n,"port3",t),r[5]===e&&r[6]===e&&$(n,"port3",e),r[7]!==o&&r[8]!==o||$(n,"port6",o),r[7]===t&&r[8]===t&&$(n,"port6",e),r[7]===t&&r[8]===e&&$(n,"port6",t),r[7]===e&&r[8]===t&&$(n,"port6",t),r[7]===e&&r[8]===e&&$(n,"port6",e)):($(n,"port11",o),$(n,"port8",o),$(n,"port3",o),$(n,"port6",o))}(r);break;case"not":!function(n){var r=function(e){var t=[o,o,o,o,o,o,o,o];return t[0]=X(e,"port14"),t[1]=X(e,"port13"),t[2]=X(e,"port11"),t[3]=X(e,"port9"),t[4]=X(e,"port1"),t[5]=X(e,"port3"),t[6]=X(e,"port5"),t[7]=X(e,"port7"),t}(n);r[0]===a&&r[7]===p?(r[1]===t?$(n,"port12",e):r[1]===o?$(n,"port12",o):$(n,"port12",t),r[2]===t?$(n,"port10",e):r[2]===o?$(n,"port10",o):$(n,"port10",t),r[3]===t?$(n,"port8",e):r[3]===o?$(n,"port8",o):$(n,"port8",t),r[4]===t?$(n,"port2",e):r[4]===o?$(n,"port2",o):$(n,"port2",t),r[5]===t?$(n,"port4",e):r[5]===o?$(n,"port4",o):$(n,"port4",t),r[6]===t?$(n,"port6",e):r[6]===o?$(n,"port6",o):$(n,"port6",t)):($(n,"port12",o),$(n,"port10",o),$(n,"port8",o),$(n,"port2",o),$(n,"port4",o),$(n,"port6",o))}(r);break;case"nand":!function(n){var r=ee(n);r[0]===a&&r[9]===p?(r[1]===o||r[2]===o?$(n,"port11",o):r[1]===t&&r[2]===t?$(n,"port11",e):$(n,"port11",t),r[3]===o||r[4]===o?$(n,"port8",o):r[3]===t&&r[4]===t?$(n,"port8",e):$(n,"port8",t),r[5]===o||r[6]===o?$(n,"port3",o):r[5]===t&&r[6]===t?$(n,"port3",e):$(n,"port3",t),r[7]===o||r[8]===o?$(n,"port6",o):r[7]===t&&r[8]===t?$(n,"port6",e):$(n,"port6",t)):($(n,"port11",o),$(n,"port8",o),$(n,"port3",o),$(n,"port6",o))}(r);break;case"nor":!function(n){var r=ee(n);r[0]===a&&r[9]===p?(r[1]===o||r[2]===o?$(n,"port11",o):r[1]===t||r[2]===t?$(n,"port11",e):$(n,"port11",t),r[3]===o||r[4]===o?$(n,"port8",o):r[3]===t||r[4]===t?$(n,"port8",e):$(n,"port8",t),r[5]===o||r[6]===o?$(n,"port3",o):r[5]===t||r[6]===t?$(n,"port3",e):$(n,"port3",t),r[7]===o||r[8]===o?$(n,"port6",o):r[7]===t||r[8]===t?$(n,"port6",e):$(n,"port6",t)):($(n,"port11",o),$(n,"port8",o),$(n,"port3",o),$(n,"port6",o))}(r);break;case"xnor":!function(n){var r=ee(n);r[0]===a&&r[9]===p?(r[1]!==o&&r[2]!==o||$(n,"port11",o),r[1]===t&&r[2]===t&&$(n,"port11",t),r[1]===t&&r[2]===e&&$(n,"port11",e),r[1]===e&&r[2]===t&&$(n,"port11",e),r[1]===e&&r[2]===e&&$(n,"port11",t),r[3]!==o&&r[4]!==o||$(n,"port8",o),r[3]===t&&r[4]===t&&$(n,"port8",t),r[3]===t&&r[4]===e&&$(n,"port8",e),r[3]===e&&r[4]===t&&$(n,"port8",e),r[3]===e&&r[4]===e&&$(n,"port8",t),r[5]!==o&&r[6]!==o||$(n,"port3",o),r[5]===t&&r[6]===t&&$(n,"port3",t),r[5]===t&&r[6]===e&&$(n,"port3",e),r[5]===e&&r[6]===t&&$(n,"port3",e),r[5]===e&&r[6]===e&&$(n,"port3",t),r[7]!==o&&r[8]!==o||$(n,"port6",o),r[7]===t&&r[8]===t&&$(n,"port6",t),r[7]===t&&r[8]===e&&$(n,"port6",e),r[7]===e&&r[8]===t&&$(n,"port6",e),r[7]===e&&r[8]===e&&$(n,"port6",t)):($(n,"port11",o),$(n,"port8",o),$(n,"port3",o),$(n,"port6",o))}(r);break;case"dff":!function(n){var r=function(e){var t=[o,o,o,o,o,o,o,o,o,o];return t[0]=X(e,"port14"),t[1]=X(e,"port13"),t[2]=X(e,"port12"),t[3]=X(e,"port11"),t[4]=X(e,"port10"),t[5]=X(e,"port1"),t[6]=X(e,"port2"),t[7]=X(e,"port3"),t[8]=X(e,"port4"),t[9]=X(e,"port7"),t}(n);r[0]===a&&r[9]===p?(r[1]===o||r[4]===o||r[3]===o?($(n,"port9",o),$(n,"port8",o)):r[1]===t?($(n,"port9",e),$(n,"port8",t)):r[4]===t?($(n,"port9",t),$(n,"port8",e)):r[3]===t&&(r[2]===t?$(n,"port9",t):$(n,"port9",e),r[2]===t?$(n,"port8",e):$(n,"port8",t)),r[5]===o||r[8]===o||r[7]===o?($(n,"port5",o),$(n,"port6",o)):r[5]===t?($(n,"port5",e),$(n,"port6",t)):r[8]===t?($(n,"port5",t),$(n,"port6",e)):r[7]===t&&(r[6]===t?$(n,"port5",t):$(n,"port5",e),r[6]===t?$(n,"port6",e):$(n,"port6",t))):($(n,"port9",o),$(n,"port8",o),$(n,"port5",o),$(n,"port6",o))}(r);break;case"sevensegment":!function(o){var p=function(e){var t=[n,n,n,n,n,n,n,n,n,n];return t[0]=X(e,"portA"),t[1]=X(e,"portB"),t[2]=X(e,"portC"),t[3]=X(e,"portD"),t[4]=X(e,"portE"),t[5]=X(e,"portF"),t[6]=X(e,"portG"),t[7]=X(e,"portVcc"),t[8]=X(e,"portCom"),t[9]=X(e,"portDP"),t}(o);p[7]===a&&p[8]===a?(p[0]==t?o.findObject("A").fill=e:o.findObject("A").fill=n,p[1]==t?o.findObject("B").fill=e:o.findObject("B").fill=n,p[2]==t?o.findObject("C").fill=e:o.findObject("C").fill=n,p[3]==t?o.findObject("D").fill=e:o.findObject("D").fill=n,p[4]==t?o.findObject("E").fill=e:o.findObject("E").fill=n,p[5]==t?o.findObject("F").fill=e:o.findObject("F").fill=n,p[6]==t?o.findObject("G").fill=e:o.findObject("G").fill=n,p[9]==t?o.findObject("DP").fill=e:o.findObject("DP").fill=n):(o.findObject("A").fill=n,o.findObject("B").fill=n,o.findObject("C").fill=n,o.findObject("D").fill=n,o.findObject("E").fill=n,o.findObject("F").fill=n,o.findObject("G").fill=n,o.findObject("DP").fill=n)}(r);break;case"output":!function(e){e.linksConnected.each((function(t){e.findObject("NODESHAPE").fill=t.findObject("SHAPE").stroke}))}(r);break;case"switch":!function(e){var t=e.findObject("C").opacity,n=X(e,"in");$(e,"out",n&&n!=o&&1==t?n:o)}(r);break;case"2wsa":!function(e){var t=e.findObject("B").opacity,n=X(e,"port3");n&&n!=o?1==t?($(e,"port1",n),$(e,"port2",o)):($(e,"port1",o),$(e,"port2",n)):($(e,"port1",o),$(e,"port2",o))}(r);break;case"2wsb":!function(e){var t=e.findObject("B").opacity,n=X(e,"port1"),a=X(e,"port2");$(e,"port3",1==t?a||o:n||o)}(r);break;case"resistor":!function(e){var t=X(e,"in");$(e,"out",t||o)}(r);break;case"led_green":!function(e){var n=X(e,"port1"),o=X(e,"port2");e.findObject("LED").fill=n==t&&o==t?t:"grey"}(r);break;case"led_yellow":!function(e){var n=X(e,"port1"),o=X(e,"port2");e.findObject("LED").fill=n==t&&o==t?"yellow":"grey"}(r);break;case"led_red":!function(n){var o=X(n,"port1"),a=X(n,"port2");n.findObject("LED").fill=o==t&&a==t?e:"grey"}(r);break;case"vcc":!function(e){Q(e,a)}(r);break;case"gnd":!function(e){Q(e,p)}(r)}})),i.skipsUndoManager=r}function Q(e,t){e.findLinksOutOf().each((function(e){e.findObject("SHAPE").stroke=t}))}function X(e,t){var n;return e.findLinksInto(t).each((function(e){n=e.findObject("SHAPE").stroke})),n||o}function $(e,t,n){e.findLinksOutOf(t).each((function(e){e.findObject("SHAPE").stroke=n}))}function ee(e){var t=[o,o,o,o,o,o,o,o,o,o];return t[0]=X(e,"port14"),t[1]=X(e,"port13"),t[2]=X(e,"port12"),t[3]=X(e,"port10"),t[4]=X(e,"port9"),t[5]=X(e,"port1"),t[6]=X(e,"port2"),t[7]=X(e,"port4"),t[8]=X(e,"port5"),t[9]=X(e,"port7"),t}function te(){return(te=Object(S.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:window.confirm("All unsaved changes will be lost\nProceed to create a new file?")&&(t={},i.model=g.Model.fromJson(t),console.log("new file")),y=0;case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ne(){return(ne=Object(S.a)(d.a.mark((function e(){var t,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=i.model.toJson(),x=t,console.log("save",x),i.isModified=!1,n=new Blob([x],{type:"application/json"}),v.saveAs(n,"diagram.json"),y=0;case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function oe(){return(oe=Object(S.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i.model=g.Model.fromJson(t),console.log("load",t),y=0;case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return i.nodeTemplateMap.add("clk",M),i.nodeTemplateMap.add("input",z),i.nodeTemplateMap.add("output",N),i.nodeTemplateMap.add("and",P),i.nodeTemplateMap.add("or",D),i.nodeTemplateMap.add("xor",L),i.nodeTemplateMap.add("not",F),i.nodeTemplateMap.add("nand",H),i.nodeTemplateMap.add("nor",C),i.nodeTemplateMap.add("xnor",A),i.nodeTemplateMap.add("led_red",_),i.nodeTemplateMap.add("led_yellow",J),i.nodeTemplateMap.add("led_green",q),i.nodeTemplateMap.add("resistor",U),i.nodeTemplateMap.add("switch",V),i.nodeTemplateMap.add("2wsa",W),i.nodeTemplateMap.add("2wsb",Z),i.nodeTemplateMap.add("sevensegment",Y),i.nodeTemplateMap.add("dff",G),i.nodeTemplateMap.add("vcc",B),i.nodeTemplateMap.add("gnd",E),c.nodeTemplateMap=i.nodeTemplateMap,s.nodeTemplateMap=i.nodeTemplateMap,c.model.nodeDataArray=[{category:"vcc"},{category:"gnd"},{category:"input"},{category:"output"},{category:"clk"},{category:"and"},{category:"or"},{category:"xor"},{category:"not"},{category:"nand"},{category:"nor"},{category:"xnor"},{category:"dff"}],s.model.nodeDataArray=[{category:"led_red"},{category:"led_yellow"},{category:"led_green"},{category:"switch"},{category:"2wsa"},{category:"2wsb"},{category:"resistor"},{category:"sevensegment"}],function e(){setTimeout((function(){K(),e()}),250),(O+=1)%60===0&&(O=0);1==y?function(){te.apply(this,arguments)}():2==y?function(e){oe.apply(this,arguments)}(x):3==y&&function(){ne.apply(this,arguments)}()}(),i}var N=function(){function e(e){y=1==e?1:2==e?2:3==e?3:0}return Object(o.useEffect)((function(){document.title="Online Simple Circuit"}),[]),Object(j.jsxs)("div",{children:[Object(j.jsxs)("div",{className:"absolute flex items-center w-full h-16 bg-black",children:[Object(j.jsx)("div",{className:"noselect mx-4 text-white text-4xl",children:"OSC"}),Object(j.jsx)("button",{onClick:function(t){return e(1)},className:T,children:"New"}),Object(j.jsxs)("button",{className:T,children:[Object(j.jsx)("label",{htmlFor:"load-file",children:"Load"}),Object(j.jsx)("input",{type:"file",name:"load-file",id:"load-file",onChange:function(t){return function(t){t.preventDefault();var n=new FileReader;n.onload=function(){var e=Object(S.a)(d.a.mark((function e(t){var n,o;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(o=null===(n=t.target)||void 0===n?void 0:n.result)&&(x=o);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.readAsText(t.target.files[0]),e(2)}(t)},className:"pl-4"})]}),Object(j.jsx)("button",{onClick:function(t){return e(3)},className:T,children:"Save"}),Object(j.jsxs)("div",{className:"px-8 py-5 flex",children:[Object(j.jsx)("textarea",{placeholder:"JSON text data here",className:"m-2 focus:outline-none",onChange:function(e){return function(e){x=e}(e.target.value)}}),Object(j.jsx)("button",{onClick:function(t){return e(2)},className:T,children:"Load JSON"})]})]}),Object(j.jsxs)("div",{className:"flex",children:[Object(j.jsxs)("div",{id:"diagramDiv",className:"mt-16 w-4/5 bg-gray-200 relative border-b border-black",children:[Object(j.jsx)(s.a,{initDiagram:z,divClassName:"main-diagram",nodeDataArray:[]}),Object(j.jsxs)("div",{className:"ml-4",children:[Object(j.jsx)("p",{children:"Drag and drop component from the right side"}),Object(j.jsxs)("div",{className:"flex",children:[Object(j.jsx)("h1",{className:"pr-5",children:"Ctrl+Z to Undo"}),Object(j.jsx)("h1",{className:"pr-5",children:"Ctrl+Y to Redo"}),Object(j.jsx)("h1",{children:"Mouse wheel to zoom in/out"})]})]})]}),Object(j.jsxs)("div",{style:{height:"90vh"},className:"tabs mt-16 w-1/5 flex flex-col bg-white border-l border-b border-black",children:[Object(j.jsxs)("div",{className:"tab",children:[Object(j.jsx)("input",{type:"radio",id:"rd1",name:"rd",checked:!0}),Object(j.jsx)("label",{className:"noselect tab-label",htmlFor:"rd1",children:"IC Gates"}),Object(j.jsx)("div",{className:"tab-content",children:Object(j.jsx)("div",{id:"palette",style:{height:"340px"}})})]}),Object(j.jsxs)("div",{className:"tab",children:[Object(j.jsx)("input",{type:"radio",id:"rd2",name:"rd"}),Object(j.jsx)("label",{className:"noselect tab-label",htmlFor:"rd2",children:"Others items"}),Object(j.jsx)("div",{className:"tab-content",children:Object(j.jsx)("div",{id:"palette2",style:{height:"340px"}})})]})]})]})]})},M=function(){return Object(j.jsx)(l.a,{children:Object(j.jsxs)(i.d,{children:[Object(j.jsx)(i.b,{exact:!0,path:"/main",component:N}),Object(j.jsx)(i.a,{to:"/main"})]})})},B=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,36)).then((function(t){var n=t.getCLS,o=t.getFID,a=t.getFCP,p=t.getLCP,r=t.getTTFB;n(e),o(e),a(e),p(e),r(e)}))};r.a.render(Object(j.jsx)(a.a.StrictMode,{children:Object(j.jsx)(M,{})}),document.getElementById("root")),B()}},[[35,1,2]]]);
//# sourceMappingURL=main.88d3216f.chunk.js.map