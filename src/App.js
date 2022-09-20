import React from 'react';
import './App.css';
import { Forest } from './fractalLogic.js';

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
    return (
      <div id="forest_container">
        <canvas ref={this.canvasRef} width="750px" height="750px" />
        {forest}
      </div>
    );
  }
}

export default App;
