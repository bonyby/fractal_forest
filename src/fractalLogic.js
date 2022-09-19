import React, { useRef, PureComponent, useEffect } from 'react'

const Canvas = props => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        
        // Define line
        ctx.lineWidth = 5;
        ctx.strokeStyle = "whitesmoke";
        ctx.moveTo(0, 0);
        ctx.lineTo(200, 100);

        // Draw outer glow
        ctx.shadowBlur = 20;
        ctx.shadowColor = "rgba(245, 245, 245, 0.692)";
        ctx.stroke();

        // Draw center glow
        ctx.shadowBlur = 5;
        ctx.shadowColor = "rgba(245, 245, 245, 0.9)";
        ctx.stroke();
    }, []);

    return <canvas ref={canvasRef} {...props}/>
}

export class Forest extends PureComponent {
    renderTree() {
        return <Tree />;
    }

    render() {
        // return this.renderTree();
        return <Canvas width="500px" height="250px"/>
    }
}

export class Tree extends PureComponent {
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