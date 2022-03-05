import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { andexam, andgate, inout, intf, led, sevenseg, sw, vccgnd } from "./components/images";

function Docs() {
  const intro = useRef<any>(null);
  const inter = useRef<any>(null);
  const ctrl = useRef<any>(null);
  const comp = useRef<any>(null);
  let history = useHistory();

  const headerTopic = "px-4 py-2 cursor-pointer transition duration-300 hover:bg-gray-200"

  useEffect(() => {
    document.title = "OSC Documentation"
  }, []);

  function onClickHome() {
    history.push('./online-simple-circuit');
  }

  function scrollToRef(ref: any) {
    ref.current.scrollIntoView();
  }

  const par = "my-4";

  return (
    <div>
      <header className="z-50 bg-black h-16 flex items-center fixed w-screen">
        <div className="noselect mx-4 text-white text-4xl cursor-pointer" onClick={onClickHome}>
          OSC
        </div>
      </header>

      <div ref={intro} className="relative flex mx-auto" style={{maxWidth: 1215}}>

        <div className="fixed w-1/5 mt-24">
          <h1 className="text-2xl mb-4">Documentation</h1>
          <h1 className={headerTopic} onClick={() => scrollToRef(intro)}>Introduction</h1>
          <h1 className={headerTopic} onClick={() => scrollToRef(inter)}>Interface</h1>
          <h1 className={headerTopic} onClick={() => scrollToRef(ctrl)}>Basic Control</h1>
          <h1 className={headerTopic} onClick={() => scrollToRef(comp)}>Components</h1>
        </div>
          
        <div className="absolute right-0 w-4/5 pl-16 mt-24">

          <h1 className="text-2xl">Introduction</h1>
          <p className={par}>
            An online tools to create, simulation and save your circuit diagram without additional dependencies.
          <p ref={inter}>
            The website compose of two part: Diagram board on th eleft where you edit and simulating your circuit.
          </p>
          <p>
            And a palette or a toolbox that contain all available components for use.</p>
          </p>

          <h1 className="text-2xl">Interface</h1>
          <img src={intf} className="my-4" />
          <p className={par}>
            You can create a new file, load existiong file, saving file or even load the diagram with a
            specify JSON format. Your change will not be saved if you close the website without saving it.
            This website mainly use your mouse and keyboard. 
            <p ref={ctrl}>
              You can click and drag any component from the right side and place it on the diagram board on the left.
            </p>
          </p>
          <p className={par}>The toolbox contain two major part which is IC components and Other tools such as LED, switch and 7 Segments.</p>

          <h1 className="text-2xl">Basic Control</h1>
          <p className={par}>From toolbox in the right side,</p>
          <p>You can add component to the diagram by clicking it and move it around with your mouse to the diagram scheme.</p>
          <p>Add multiple components at the same time by Hold Ctrl button while select all component you want.</p>
          <p>You can also click and hold in the same position for around 0.5 second, It will allow you to drag and select multiple components
            in a rectangle area.
          </p>
          <p className={par}>On diagram board,</p>
          <p>You can move any component by clicking it and move it around with your mouse in any direction</p>
          <p>click and move your mouse from free space to move the whole diagram around.</p>
          <p>Click and hold in the same position for around 0.5 second will allow you to drag and select multiple components.
            This way, you can move or remove any components at the same time.
          </p>
          <p className={par}>You can undo your action by pressing Ctrl+Z at the same time</p>
          <p className={par} ref={comp}>You can redo your action by pressing Ctrl+Y at the same time</p>
          <p className={par}>You zoom in or out of your diagram by sliding the mouse wheel up and down
          while your cursor is inside the diagram board.</p>

          <h1 className="text-2xl">Components</h1>
          <p className={par}>
            The components available to use are Vcc, Gnd, Input, Output, IC Gates, LED, Switch, Resistor and 7 Segments.
            All of them will have at least one port to use for connect with other.
          </p>
          <p className={par}>
            A wire can be create by clicking the output port and drag it to connect with desired input port
            in any other component.
            <p>See an explanation below for the details of each component.</p>
          </p>

          <h1 className="text-xl">Vcc and Gnd</h1>
          <img src={vccgnd} className="my-4 h-16" />
          <p className={par}>
            Vcc and Gnd are mainly use for power supply and to make certain components funcion correctly.
          </p>

          <h1 className="text-xl">Input and Output</h1>
          <img src={inout} className="my-4 h-16" />
          <p className={par}>
            Input (The one with circle shape) are use to give a static value of 0 or 1 for any component.
            A value can be determine by a color of it: red for 0 and green for 1. User can change its value any time by double-clicking it.
            <p>Output (The one with square shape) are use to visualize the final end result of a circuit. Same as an Input,
              Its value can be determine from the color: red for 0 and green for 1.
            </p>
          </p>
          
          <h1 className="text-xl">Integrated Circuit</h1>
          <p className={par}>
            An integrated circuit are an assembly of electronic components, fabricated as a single unit that 
            mainly use to create electrical equipment. In our website, All IC components consist with a total
            of 14 I/O ports. Power supply and ground port included.
          </p>
          <p className={par}>
            But to make it functional correctly, Both power supply from Vcc components and a ground connection 
            from Gnd components need to be connected at the same time.
          </p>
          <img src={andgate} width={480} className="my-4" />
          <img src={andexam} width={480} className="my-4" />
          <p className={par}>(An example of AND gate IC and how to implement in OSC)</p>

          <h1 className="text-xl">LED</h1>
          <img src={led} className="my-4 h-32" />
          <p className={par}>
            A component mainly for visualizing effect. A three color of red, green and blue are available to use.
          </p>

          <h1 className="text-xl">Switch</h1>
          <img src={sw} className="my-4 h-48" />
          <p className={par}>
            Act as a "middle-man" to determine if a wire "bridge" should be formed between both side ot the switch.
            Connect two component with a switch will make it an open circuit by default. (A switch will not formed
            a brigde between two components) Double-click a switch to formed a bridge and make it become a closed
            circuit. A symbol on the switch is also a self-explanatory about current state of the switch.
          </p>
          <p className={par}>
            There are also a multi-way switch which its destination can be changed between two output (or input)
            by double-ckicking it.
          </p>

          <h1 className="text-xl">Resistor</h1>
          <p className={par}>
            As of the current state of this project. A resistor do not have any functional effect and only
            use for pure visualization and decoration only.
          </p>

          <h1 className="text-xl">7 Segments</h1>
          <img src={sevenseg} className="my-4 h-64" />
          <p className={par}>
            A 1 digit number display with a red-light LED displaying at a specific part when a specific port
            is connected. There are a total of 8 part for display (include a dot) that can be formed into a number.
          </p>
          <p>A Vcc should be connect to a specific port to make it functional.</p>

          <div className="h-16 mt-48">
          </div>

        </div>
        
      </div>
      {/*End Body*/}

      
    </div>
  )
}

export default Docs;