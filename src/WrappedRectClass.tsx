import React from "react"
import { Rectangle, wrapShape } from "react-shape-editor";
import App from "./App";
import ShapeData from "./ShapeData";

const WrappedRectShape = wrapShape(({width, height}) => (
    <rect fill={App.COLORS.defaultBg} width={width} height={height}/>
  ));

interface Props
{
    shape : ShapeData,
    index : number
    onFocus:(shape:ShapeData)=>void
    onChange:(rect:Rectangle, shape:ShapeData, index:number)=>void
}

interface State
{
}

export default class WrappedRectClass extends React.Component<Props,State>
{

    public Gizmos(args:any)
    {
        return <g> <circle fill={App.COLORS.defaultGm} cx={args.x/2} cy={args.y/2} r={15} onMouseDown={args.onMouseDown} style={{opacity : .75}} /> </g>;
    }

    public render()
    {
        var shape = this.props.shape;

        return <WrappedRectShape
        key={shape.id}
        shapeId={shape.id}
        x={shape.dimension.x}
        y={shape.dimension.y}
        width={shape.dimension.width}
        height={shape.dimension.height}
        onFocus={()=> this.props.onFocus(this.props.shape)}
        onChange={rect=> this.props.onChange(rect, this.props.shape, this.props.index)}/>
    }
}