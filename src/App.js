import React from 'react';
import './App.css';
import { Forest } from './fractalLogic.js';
import Settings from './settings.js';

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
    const forest = this.state.canvasCtx != null ? <Forest canvas={this.canvasRef.current} canvasCtx={this.state.canvasCtx} /> : '';
    const w = window.innerWidth;
    const h = window.innerHeight-5;
    return (
      <div id="top_container">
        <canvas ref={this.canvasRef} width={w} height={h} />
        {forest}
        <Settings />
      </div>
    );
  }
}

export default App;
