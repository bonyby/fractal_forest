import React, { useState, useRef, PureComponent, useEffect } from 'react'

export class Forest extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            canvasCtx: props.canvasCtx
        };
    }

    renderTree() {
        return <Tree />;
    }

    render() {
        const ctx = this.state.canvasCtx;

        // Define line
        ctx.lineWidth = 5;
        ctx.strokeStyle = "whitesmoke";
        ctx.moveTo(0, 0);
        ctx.lineTo(200, 200);

        // Draw outer glow
        ctx.shadowBlur = 20;
        ctx.shadowColor = "rgba(245, 245, 245, 0.692)";
        ctx.stroke();

        // Draw center glow
        ctx.shadowBlur = 5;
        ctx.shadowColor = "rgba(245, 245, 245, 0.9)";
        ctx.stroke();

        return;
        // return this.renderTree();
        // return <Canvas width="500px" height="250px"/>
    }
}

export class Tree extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            x: 50,
            y: 25,
            width: 10,
            height: 50
        };
    }

    render() {
        return (
            <div></div>
        )
    }
}

export class Branch extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            width: props.width,
            height: props.height
        };
    }

    render() {
        const w = this.state.width;
        const h = this.state.height;
        return <div style={{ width: w, height: h }}></div>
    }
}