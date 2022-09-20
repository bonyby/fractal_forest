import React, { useEffect, useRef } from 'react';
import './App.css';
import { Forest, Tree } from './fractalLogic.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasCtx: null
    };

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      canvasCtx: this.canvasRef.current.getContext("2d")
    });
  }

  render() {
    const forest = this.state.canvasCtx ? <Forest canvasCtx={this.state.canvasCtx} /> : '';
    return (
      <div id="forest_container">
        <canvas ref={this.canvasRef} width="500px" height="250px" />
        {forest}
      </div>
    );
  }
}

// function App() {
//   const canvasRef = useRef(null);
//   const canvasCtxRef = useRef(null);
//   const forestRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     canvasCtxRef.current = ctx;
//     console.log("forestRef: " + forestRef.current);
//     forestRef.current.setCanvasContext(canvasCtxRef);
//   }, []);

//   return (
//     <div id="forest_container">
//       <canvas ref={canvasRef} width="500px" height="250px" />
//       {forestRef.current = <Forest />}
//     </div>
//   );
// }

export default App;
