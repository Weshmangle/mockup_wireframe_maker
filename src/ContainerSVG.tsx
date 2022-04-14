import React, { Children } from 'react';
import './App.css';
import { EStateEditor } from './EStateEditor';
import Gizmos from './Gizmos';

interface Props
{
  shapes:ShapeData[],
  shapeSelected:ShapeData | undefined,
  snapGrid:boolean,
  onSelectShape:(shape:ShapeData | undefined) => void,
  onResize:(resize:{width:number, height:number})=>void
}

interface State
{
  offset : {x:number, y:number}
  stateEditor:EStateEditor,
  moveShape:boolean,
  gizmoSelected:any,
  shapeSelected:ShapeData | undefined
}

export interface ShapeData
{
  id:number
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
      offset : {x:0, y:0},
      stateEditor : EStateEditor.RESIZE,
      moveShape : true,
      gizmoSelected:undefined,
      shapeSelected : undefined
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
    let shapes = this.props.shapes.filter(shape => shape.id == Number(id));
    return id ? shapes[0] : undefined;
  }

  protected isGizmo(event:React.MouseEvent)
  {
    let idGizmo = (event.target as SVGElement)?.getAttribute('id-gizmo');
    let control = idGizmo?.split(',');
    return control && control.length == 2 ? {x:Number(control[0]), y:Number(control[1])} : undefined;
  }

  protected startDrag = (event:React.MouseEvent) =>
  {
    let offset = this.getMousePosition(event, event.currentTarget as SVGSVGElement);

    let gizmo = this.isGizmo(event);

    if(gizmo)
    {
      this.setState({gizmoSelected : gizmo, moveShape : true, stateEditor : EStateEditor.RESIZE, shapeSelected :  Object.assign({}, this.props.shapeSelected)});
    }
    else
    {
      let state = {shapeSelected : this.getShape(event), offset : {x:0, y:0}};
      
      if(offset && state.shapeSelected)
      {
        state.offset = { x : offset.x - state.shapeSelected.x, y : offset.y - state.shapeSelected.y};
        
        this.setState({stateEditor : EStateEditor.MOVE, moveShape : true, offset : state.offset});
      }
      
      this.props.onSelectShape(state.shapeSelected);
    }
  }

  protected drag = (event:React.MouseEvent) =>
  {
    if(!this.props.shapeSelected || !this.state.moveShape) return;
    
    event.preventDefault();

    switch (this.state.stateEditor)
    {
      case EStateEditor.MOVE:
        this.moveShape(event, this.props.shapeSelected);
        break;
    
      case EStateEditor.RESIZE:
        this.resizeShape(event);
        break;
    }
    
    this.setState({});
  }

  protected moveShape(event:any, shape:ShapeData)
  {
    let coord = this.getMousePosition(event, event.currentTarget as SVGSVGElement);

    if(coord)
    {
      if(this.props.snapGrid)
      {
        let snapFactor = 100;  
        shape.x = Math.floor((coord.x - this.state.offset.x)/snapFactor) * snapFactor;
        shape.y = Math.floor((coord.y - this.state.offset.y)/snapFactor) * snapFactor;
      }
      else
      {
        shape.x = coord.x - this.state.offset.x;
        shape.y = coord.y - this.state.offset.y;
      }
    }
  }

  protected resizeShape(event:any)
  {
    let coord = this.getMousePosition(event, event.currentTarget as SVGSVGElement);
    
    if(coord && this.props.shapeSelected)
    {
      let position = {x: coord.x - this.state.offset.x, y: coord.y - this.state.offset.y};

      let currentShape = this.state.shapeSelected;
      if(currentShape)
        this.props.onResize({width:currentShape?.width + (position.x - this.props.shapeSelected.x)*this.state.gizmoSelected.x, height: currentShape.height + (position.y - this.props.shapeSelected.y)**this.state.gizmoSelected.y})
    } 
  }
  
  protected endDrag = (event:React.MouseEvent) =>
  {
    this.setState({moveShape : false});
  }

  protected renderShape = (shape:ShapeData, index:number) =>
  {
    let stroke = shape == this.props.shapeSelected ? {strokeDasharray:"10", stroke : 'black', strokeWidth : '10px', strokeOpacity : '.5'} : undefined;
    
    let visible = this.props.shapeSelected?.id == shape.id;

    let shapeSVG;

    switch(shape.type)
    {
      case 'rect':
        shapeSVG = <rect x={-shape.width/2} y={-shape.height/2} width={shape.width} height={shape.height} fill={shape.fill}/>;
        break;
      case 'circle':
        shapeSVG = <circle r={(shape.width + shape.height) / 4} fill={shape.fill}/>
        break;
      case 'text':
        shapeSVG = <text fill={shape.fill}> Lorem Ipsum is simply dummy text of the printing and typesetting industry. </text>
        break;
      case 'line':
        shapeSVG = <line x1={shape.x} y1={shape.y} x2={shape.x+shape.width} y2={shape.y+shape.height} fill={shape.fill} strokeWidth='2' stroke='red'/>
        break;
      case 'path':
        shapeSVG = <path fill={shape.fill} d={'M 0 0' + shape.data}/>
        break;
      default:
        throw new Error("[ CORE ] ERROR : shape not exist");
    }

    return (
      <g transform={`translate(${shape.x} ${shape.y})`} key={shape.id} shape-id={shape.id} cursor={'pointer'}>
        {shapeSVG}
        <Gizmos width={shape.width} height={shape.height} visible={visible}/>
      </g>);
  }

  public render()
  {
    return <svg
      style={{background : 'grey'}}
      onMouseDown={this.startDrag}
      onMouseMove={this.drag}
      onMouseUp={this.endDrag}
      onMouseLeave={this.endDrag}
      width={'100vw'} height={'100vh'}>
        { this.props.children }
        { this.props.shapes.map(this.renderShape) }
      </svg>
  }
}

export default ContainerSVG;
