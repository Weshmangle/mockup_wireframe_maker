import React from "react";

interface Props
{
    sizeSnap:number
    countX:number,
    countY:number,
    visible:boolean
}

export default class GridSnapping extends React.Component<Props>
{
    protected linesVertical = () =>
    {
        let lines:any[] = Array(this.props.countX).fill(undefined);
        
        let a= lines.map((v, index) =>
        {
            let x = index * this.props.sizeSnap;
            let y = this.props.countY * this.props.sizeSnap;
            return <line key={index} x1={x} y1={0} x2={x} y2={y} stroke='black' opacity={'.05'}/>;
        });
        
        return a;
    }
    
    protected linesHorizontal = () =>
    {
        let lines:any[] = Array(this.props.countY).fill(undefined);

        return lines.map((v, index)=>
        {
            let x = this.props.countX * this.props.sizeSnap;
            let y = index * this.props.sizeSnap;
            return <line key={index} x1={0} y1={y} x2={x} y2={y} stroke='black' opacity={'.05'}/>;
        });
    }

    public render()
    {   if(this.props.visible) return ;
        return (<g>{this.linesVertical()}  {this.linesHorizontal()}</g>);
    }
}