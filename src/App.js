import React from 'react';
import './App.css';
import { Forest } from './fractalLogic.js';
import Settings from './settings.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasCtx: null,
      width: 6,
      minWidth: 1,
      length: 250,
      lengthScalar: 0.65,
      minLength: 2,
      angle: 0,
      rotation: 60,
      angleOffset: 0,
      level: 1,
      maxLevel: 10
    };

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      canvasCtx: this.canvasRef.current.getContext("2d")
    });
  }

  rerender(settings) {
    this.setState(settings);
  }

  render() {
    const { canvasCtx, ...forestProperties } = this.state;
    const forest = this.state.canvasCtx != null ? <Forest canvas={this.canvasRef.current} {...this.state} /> : '';
    const w = window.innerWidth;
    const h = window.innerHeight - 5;
    return (
      <div id="top_container">
        <canvas ref={this.canvasRef} width={w} height={h} />
        {forest}
        <Settings runHandler={(settings) => this.rerender(settings)} {...forestProperties} />
      </div>
    );
  }
}

export default App;
