import React, { PureComponent } from 'react'
import Color from "https://colorjs.io/dist/color.js";

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
                width={6}
                maxWidth={1}
                length={250}
                lengthScalar={0.65}
                maxLength={5}
                angle={0}
                rotation={45}
                angleOffset={20}
                level={0}
                maxLevel={12}
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
            maxWidth: props.maxWidth,
            length: props.length,
            lengthScalar: props.lengthScalar,
            maxLength: props.maxLength,
            angle: props.angle,
            rotation: props.rotation,
            angleOffset: props.angleOffset,
            level: props.level + 1,
            maxLevel: props.maxLevel,
            canvasCtx: props.canvasCtx
        };
    }

    renderBranch(xPos, yPos, ang) {
        const {x, y, width, length, angle, ...remaining} = this.state; // split out the state so props needed to simply be passed on can be passed on with "...remaining"
        return (
            <Branch
                x={xPos}
                y={yPos}
                width={Math.max(width - 1, this.state.maxWidth)}
                length={Math.max(length * this.state.lengthScalar, this.state.maxLength)}
                angle={ang}
                {...remaining}
            />
        );
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
        const startCol = new Color("sRGB", [0.8, 0.8, 0.8]);
        const endCol = new Color("sRGB", [1, 0, 0]);
        const color = startCol.range(endCol, { space: "sRGB" })(this.state.level / this.state.maxLevel);
        ctx.strokeStyle = color.toString();
        ctx.lineCap = 'round';
        ctx.moveTo(x, y);
        ctx.lineTo(endX, endY);
        ctx.shadowBlur = 0;

        // Draw outer glow
        ctx.shadowBlur = 30;
        ctx.shadowColor = "rgba(" + Math.round(color.srgb.r * 255) + "," + Math.round(color.srgb.g * 255) + "," + Math.round(color.srgb.b * 255) + ", 0.6)";
        ctx.stroke();

        // Draw center glow
        ctx.shadowBlur = 0;
        ctx.shadowColor = "rgba(" + Math.round(color.srgb.r * 255) + "," + Math.round(color.srgb.g * 255) + "," + Math.round(color.srgb.b * 255) + ", 0.8)";
        ctx.stroke();

        const angle = this.state.angle;
        return (this.state.level < this.state.maxLevel) ? (
            <div>
                {this.renderBranch(endX, endY, angle + this.state.angleOffset + this.state.rotation)}
                {this.renderBranch(endX, endY, angle + this.state.angleOffset - this.state.rotation)}
            </div>
        ) : '';
    }
}