import React, { Children } from 'react';
import './App.css';

interface Props
{
  shapes:ShapeData[],
  shapeSelected:ShapeData | undefined
  onAddShape:(type:string) => void,
  onSelectShape:(shape:ShapeData) => void,
}

interface State
{
  shapeSelected : ShapeData | undefined;
  offset : {x:number, y:number}
}

export interface ShapeData
{
  index:number
  x:number,
  y:number,
  width:number,
  height:number,
  type:string,
  fill:string
  data?:any
}

class ContainerSVG extends React.Component<Props, State>
{
  protected step:number = 1;
  constructor(props:any)
  {
    super(props);

    this.state =
    {
      shapeSelected : undefined,
      offset : {x:0, y:0}
    };
  }

  protected getMousePosition(event:React.MouseEvent, svg:SVGSVGElement)
  {
    let matrix = svg.getScreenCTM();
    return matrix ? { x : (event.clientX - matrix.e) / matrix.a, y : (event.clientY - matrix.f) / matrix.d} : undefined;
  }

  protected getShape(event:React.MouseEvent) : ShapeData | undefined
  {
    let id = ((event.target as SVGElement)?.parentNode as SVGElement)?.getAttribute('shape-id');
    
    return id ? this.props.shapes[Number(id)] : undefined;
  }

  protected startDrag = (event:React.MouseEvent) =>
  {
    let state = {shapeSelected : this.getShape(event), offset : this.state.offset};
    
    let offset = this.getMousePosition(event, event.currentTarget as SVGSVGElement);
    
    if(offset && state.shapeSelected)
    {
      state.offset = { x : offset.x - state.shapeSelected.x, y : offset.y - state.shapeSelected.y};
    }
    if(state.shapeSelected)
    {
      this.props.onSelectShape(state.shapeSelected);
    }
    //this.setState(state);
  }

  protected drag = (event:React.MouseEvent) =>
  {
    if(!this.state.shapeSelected ) return;
    
    event.preventDefault();
    
    let shape = this.state.shapeSelected;

    let coord = this.getMousePosition(event, event.currentTarget as SVGSVGElement);

    if(coord)
    {
      let snapFactor = 10;

      shape.x = coord.x - this.state.offset.x;
      shape.y = coord.y - this.state.offset.y;

      shape.x = Math.floor((coord.x - this.state.offset.x)/snapFactor) * snapFactor;
      shape.y = Math.floor((coord.y - this.state.offset.y)/snapFactor) * snapFactor;
    }

    //shape.data
    
    this.setState({});
  }
  protected endDrag = (event:React.MouseEvent) =>
  {
    this.setState({shapeSelected : undefined});
  }

  protected renderShape = (shape:ShapeData, index:number) =>
  {
    let stroke = shape == this.props.shapeSelected ? {strokeDasharray:"10", stroke : 'black', strokeWidth : '10px', strokeOpacity : '.5'} : undefined;
    
    switch(shape.type)
    {
      case 'rect':
        return <g {...stroke} key={shape.index} shape-id={shape.index} cursor={'pointer'}>
          <rect x={shape.x} y={shape.y} width={shape.width} height={shape.height} fill={shape.fill}/>
          </g>
      case 'circle':
        return <g {...stroke} key={shape.index} shape-id={shape.index} cursor={'pointer'}>
          <circle cx={shape.x} cy={shape.y} r={(shape.width + shape.height) / 4} fill={shape.fill}/>
          </g>;
      case 'text':
        return <g {...stroke} key={shape.index} shape-id={shape.index} cursor={'pointer'}>
          <text x={shape.x} y={shape.y} fill={shape.fill}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </text>
          </g>;
      case 'path':
        //<path d="M 0 0 l 50 50" stroke="red"stroke-width="3" fill="none" />
        return <g {...stroke} key={shape.index} shape-id={shape.index} cursor={'pointer'}>
          <path x={shape.x} y={shape.y} fill={shape.fill} d={''}>
            
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </path>
          </g>;
      default:
        throw new Error("[ CORE ] ERROR : shape not exist");
    }
  }

  public render()
  {
    return <svg
      style={{background : 'grey'}}
      onMouseDown={this.startDrag}
      onMouseMove={this.drag}
      onMouseUp={this.endDrag}
      width={'100vw'} height={'100vh'}>
        { this.props.children }
        { this.props.shapes.map(this.renderShape) }
      </svg>
  }
}

export default ContainerSVG;
