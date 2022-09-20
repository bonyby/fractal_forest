import React, { PureComponent } from 'react'

export class Forest extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            canvas: props.canvas,
            canvasCtx: props.canvasCtx
        };
    }

    renderTree(x, y, ctx) {
        return <Tree x={x} y={y} canvasCtx={ctx} />;
    }

    render() {
        const ctx = this.state.canvasCtx;
        const canvas = this.state.canvas;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        return this.renderTree(canvas.width / 2, canvas.height - 25, ctx);
    }
}

export class Tree extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            x: props.x,
            y: props.y,
            canvasCtx: props.canvasCtx
        };
    }

    render() {
        return (
            <Branch
                x={this.state.x}
                y={this.state.y}
                width={5}
                length={120}
                angle={0}
                level={1}
                maxLevel={10}
                canvasCtx={this.state.canvasCtx}
            />
        );
    }
}

export class Branch extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            x: props.x,
            y: props.y,
            width: props.width,
            length: props.length,
            angle: props.angle,
            level: props.level,
            maxLevel: props.maxLevel,
            canvasCtx: props.canvasCtx
        };
    }

    render() {
        const x = this.state.x;
        const y = this.state.y;
        const w = this.state.width;
        const l = this.state.length;
        const theta = this.state.angle / 180 * Math.PI;
        const ctx = this.state.canvasCtx;

        // Calculate the end point. Rotate up-vector (v=(0,-1)) by specified angle - up-vector is negative because y-axis is flipped on canvas
        const dirX = Math.sin(theta);
        const dirY = -Math.cos(theta);
        const endX = x + l * dirX;
        const endY = y + l * dirY;

        // Draw the branch
        ctx.beginPath();

        // Define line
        ctx.lineWidth = w;
        ctx.strokeStyle = "whitesmoke";
        ctx.lineCap = 'round';
        ctx.moveTo(x, y);
        ctx.lineTo(endX, endY);

        // Draw outer glow
        ctx.shadowBlur = 20;
        ctx.shadowColor = "rgba(245, 245, 245, 0.692)";
        ctx.stroke();

        // Draw center glow
        ctx.shadowBlur = 5;
        ctx.shadowColor = "rgba(245, 245, 245, 0.9)";
        ctx.stroke();

        const angle = this.state.angle;
        return (this.state.level < this.state.maxLevel) ? (
            <div>
                <Branch
                    x={endX}
                    y={endY}
                    width={Math.max(w - 1, 1)}
                    length={Math.max(l * (8 / 10), 10)}
                    angle={angle - 30}
                    level={this.state.level + 1}
                    maxLevel={this.state.maxLevel}
                    canvasCtx={ctx}
                />
                <Branch
                    x={endX}
                    y={endY}
                    width={Math.max(w - 1, 1)}
                    length={Math.max(l * (8 / 10), 10)}
                    angle={angle + 30}
                    level={this.state.level + 1}
                    maxLevel={this.state.maxLevel}
                    canvasCtx={ctx}
                />
            </div>

        ) : '';
    }
}