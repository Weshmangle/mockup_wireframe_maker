import React from "react";

interface Props
{
    sizeSnap:number
    countX:number,
    countY:number,
}

export default class GridSnapping extends React.Component<Props>
{
    constructor(parameters:any)
    {
        super(parameters);
    }

    protected linesVertical = () =>
    {
        let lines:any = [];
    
        for (let index = 0; index < this.props.countX; index++)
        {
            let x = index * this.props.sizeSnap;
            let y = this.props.countX * this.props.sizeSnap;
            lines.push(<line key={index} x1={x} y1={0} x2={x} y2={y} stroke='black'/>);
        }
    
        return lines;
    }
    
    protected linesHorizontal = () =>
    {
        let lines:any = [];
    
        for (let index = 0; index < this.props.countY; index++)
        {
            let x = this.props.countY * this.props.sizeSnap;
            let y = index * this.props.sizeSnap;
            lines.push(<line key={index} x1={0} y1={y} x2={x} y2={y} stroke='black'/>);
        }
    
        return lines;
    }

    public render()
    {
        return (<g>{this.linesVertical()}  {this.linesHorizontal()}</g>);
    }
}

/*export function GridSnapping(props:Props)
{
    return(<g>{}</g>);
}*/