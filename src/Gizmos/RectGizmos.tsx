export function RectGizmos(args:any)
{
    return <g> <circle fill={'#333'} cx={args.x} cy={args.y} r={5} cursor={args.cursor} onMouseDown={args.onMouseDown} style={{opacity : .75}} /> </g>;
}