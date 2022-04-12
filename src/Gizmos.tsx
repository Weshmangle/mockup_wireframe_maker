import React from "react";

interface Props
{
    width:number,
    height:number,
    visible:boolean
}
 
interface State
{
    gizmos : {x:number, y:number}[]
}
 
class Gizmos extends React.Component<Props, State>
{    
    constructor(props: Props)
    {
        super(props);
        this.state = { gizmos : [{x:-1, y:-1}, {x:0, y:-1}, {x:1, y:-1}, {x:1, y:0}, {x:1, y:1}, {x:0, y:1}, {x:-1, y:1}, {x:-1, y:0}] };
    }

    protected renderGizmos = (gizmos:{x:number, y:number}, index:number) =>
    {
        let width = this.props.width;
        let height = this.props.height;

        return <circle
        id-gizmo={gizmos.x + ',' + gizmos.y}
        transform={`translate(${gizmos.x * width/2} ${gizmos.y * height/2})`}
        key={index}
        r={5}
        fill='red'/>;
    }
    
    public render()
    {
        let visible:any = this.props.visible ? 'visible' : 'hidden';

        return (
            <g style={{visibility : visible}}> {this.state.gizmos.map(this.renderGizmos)} </g>
        );
    }
}
 
export default Gizmos;