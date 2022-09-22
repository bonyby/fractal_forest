import React, { Component } from 'react'

export class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true
        };
    }

    render() {
        const settingsElements = (this.state.open) ? (
            <div id="settings" className="glow" >
                {<SettingsElement name="hello" />}
                {<SettingsElement name="world" />}
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

function SettingsElement(props) {
    return <div className="settings_element"><p>{"Wallah " + props.name}</p></div>
}

export default Settings