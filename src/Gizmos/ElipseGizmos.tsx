export function ElipseGizmos(args:any)
{
    return <g> <circle fill={'#333'} cx={args.x*2} cy={args.y*2} r={5} cursor={args.cursor} onMouseDown={args.onMouseDown} style={{opacity : .75}} /> </g>;
}