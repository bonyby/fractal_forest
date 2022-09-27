import React, { Component } from 'react'

export class Settings extends Component {
    constructor(props) {
        super(props);
        const { runHandler, ...properties } = this.props;
        this.state = {
            open: true,
            ...properties
        };

        window.addEventListener("keydown", (event) => {
            if(event.key === "Enter") {
                this.runHandler(this.props.runHandler);
            }
        });
    }

    inputChange(name, value) {
        const stateElement = {};
        stateElement[name] = value;
        this.setState(stateElement);
    }

    runHandler(f) {
        const { open, ...settings } = this.state;
        f(settings);
    }

    render() {
        const settingsElements = (this.state.open) ? (
            <div id="settings" className="glow">
                {<SettingsElement name="width" value={this.state.width} inputChangeHandler={(n, v) => this.inputChange(n, v)} />}
                {<SettingsElement name="minWidth" value={this.state.minWidth} inputChangeHandler={(n, v) => this.inputChange(n, v)} />}
                {<SettingsElement name="length" value={this.state.length} inputChangeHandler={(n, v) => this.inputChange(n, v)} />}
                {<SettingsElement name="lengthScalar" value={this.state.lengthScalar} inputChangeHandler={(n, v) => this.inputChange(n, v)} step={".01"} numbType={"decimal-number"}/>}
                {<SettingsElement name="minLength" value={this.state.minLength} inputChangeHandler={(n, v) => this.inputChange(n, v)} />}
                {<SettingsElement name="rotation" value={this.state.rotation} inputChangeHandler={(n, v) => this.inputChange(n, v)} />}
                {<SettingsElement name="angleOffset" value={this.state.angleOffset} inputChangeHandler={(n, v) => this.inputChange(n, v)} />}
                {<SettingsElement name="maxLevel" value={this.state.maxLevel} inputChangeHandler={(n, v) => this.inputChange(n, v)} />}
                <button onClick={() => this.runHandler(this.props.runHandler)}><p>Run</p></button>
            </div>
        ) : '';

        return (
            <div id="settings_container" >
                <h1 style={{ cursor: "pointer" }} onClick={() => this.setState({ open: !this.state.open })}>SETTINGS</h1>
                {settingsElements}
            </div>
        )
    }
}

class SettingsElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: null
        };
    }

    inputHandler(e, f) {
        f(this.props.name, parseFloat(e.target.value));
    }

    render() {
        const input = <input
            onChange={(e) => this.inputHandler(e, this.props.inputChangeHandler)}
            style={{ width: "40px" }}
            type="number"
            step={this.props.step}
            is={this.props.numbType}
            id={this.props.name}
            name={this.props.name}
            value={this.props.value}
        />;

        return (
            <div className="settings_element">
                <p>{this.props.name + ":"}</p>
                {input}
            </div>
        );
    }
}

export default Settings