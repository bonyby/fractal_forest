import React, { PureComponent } from 'react'
import Color from 'colorjs.io';


export class Forest extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            canvas: props.canvas,
            canvasCtx: props.canvasCtx
        };
    }

    renderTree(x, y) {
        console.log("width: " + this.props.width);
        return <Tree x={x} y={y} {...this.props} />;
    }

    render() {
        const ctx = this.state.canvasCtx;
        const canvas = this.state.canvas;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const tree = this.renderTree(canvas.width / 2, canvas.height - 20);
        return tree;
    }
}

function Tree(props) {
    return <Branch {...props} />;
}

export class Branch extends PureComponent {
    renderBranch(xPos, yPos, ang) {
        const { x, y, width, length, level, angle, ...remaining } = this.props;
        return (
            <Branch
                x={xPos}
                y={yPos}
                width={Math.max(width - 1, this.props.minWidth)}
                length={Math.max(length * this.props.lengthScalar, this.props.minLength)}
                level={level + 1}
                angle={ang}
                {...remaining}
            />
        );
    }

    render() {
        const x = this.props.x;
        const y = this.props.y;
        const w = this.props.width;
        const l = this.props.length;
        const angle = this.props.angle;
        const theta = angle / 180 * Math.PI;
        const ctx = this.props.canvasCtx;

        // console.log("Width: " + w);

        // Calculate the end point. Rotate up-vector (v=(0,-1)) by specified angle - up-vector is negative because y-axis is flipped on canvas
        const dirX = Math.sin(theta);
        const dirY = -Math.cos(theta);
        const endX = x + l * dirX;
        const endY = y + l * dirY;

        // Draw the branch
        ctx.beginPath();

        // Define line
        ctx.lineWidth = w;
        const startCol = new Color("sRGB", [0.9, 0.9, 0.9]);
        const endCol = new Color("sRGB", [1, 0.4, 1]);
        const color = startCol.range(endCol, { space: "sRGB" })(this.props.level / this.props.maxLevel);
        ctx.strokeStyle = color.toString();
        ctx.lineCap = 'round';
        ctx.moveTo(x, y);
        ctx.lineTo(endX, endY);
        ctx.shadowBlur = 0;

        // Draw outer glow
        ctx.shadowBlur = 25;
        ctx.shadowColor = "rgba(" + Math.round(color.srgb.r * 255) + "," + Math.round(color.srgb.g * 255) + "," + Math.round(color.srgb.b * 255) + ", 1)";
        ctx.stroke();

        // Draw center glow
        ctx.shadowBlur = 0;
        ctx.shadowColor = "rgba(" + Math.round(color.srgb.r * 255) + "," + Math.round(color.srgb.g * 255) + "," + Math.round(color.srgb.b * 255) + ", 1)";
        ctx.stroke();

        return (this.props.level < this.props.maxLevel) ? (
            <div>
                {this.renderBranch(endX, endY, angle + this.props.angleOffset + this.props.rotation)}
                {this.renderBranch(endX, endY, angle + this.props.angleOffset - this.props.rotation)}
            </div>
        ) : '';
    }
}