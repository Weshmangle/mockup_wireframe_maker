import React from "react";

interface Props {
    
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
    
    public render()
    { 
        return (
            <g transform='translate(200 200)'>
                {
                    this.state.gizmos.map((gizmos, index) => <circle cx={gizmos.x*100} cy={gizmos.y*100} r={5} fill='red'/>)
                }
            </g>
        );
    }
}
 
export default Gizmos;