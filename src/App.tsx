import React from 'react';
import {
  ShapeEditor,
  DrawLayer,
  wrapShape,
  Rectangle,
} from 'react-shape-editor';
import { ElipseGizmos } from './Gizmos/ElipseGizmos';
import { RectGizmos } from './Gizmos/RectGizmos';
import ShapeData from './ShapeData';
import { ToolBar } from './ToolBar';
import WrappedRectClass from './WrappedRectClass';

/*const WrappedRect = wrapShape(({width, height}) => (
  <rect fill='#222' width={width} height={height}/>
));

const WrappedElipse = wrapShape(({x,y, width, height}) => (
  <ellipse fill='#222' rx={width} ry={height} cx={width} cy={height} />
));*/

interface State
{
  shapes:ShapeData[],
  shapeSelected:ShapeData | undefined
}

class App extends React.Component<{},State>
{
  public static COLORS:{defaultBg:string, defaultGm:string} = { defaultBg : '#222', defaultGm: '#333'};
  
  constructor(props:any)
  {
    super(props);

    this.state = {
      shapes : [{id:'0', type:'rect', dimension:{x:50, y:100, width:50, height:50}}],
      shapeSelected : undefined
    };
  }

  public addShape = (type:string) =>
  {
    this.setState(
    {
      shapes : [...this.state.shapes, {
          id:String(this.state.shapes.length),
          type: type,
          dimension : {x:50, y:100, width:50, height:50}
        }]
    });
  }

  public updateShape = (rect:Rectangle, shape:ShapeData, index:number) =>
  {
    this.state.shapes[index].dimension = rect;
    this.setState({});
  }

  protected GetRectGizmos = (shape:ShapeData) =>
  {
    return shape == this.state.shapeSelected ? RectGizmos : ()=> <g></g>;
  }
  protected GetElipseGizmos = (shape:ShapeData) =>
  {
    return shape == this.state.shapeSelected ? ElipseGizmos : ()=> <g></g>;
  }

  protected selectShape = (shape:ShapeData) =>
  {
    this.setState({shapeSelected : shape});
  }

  protected renderRect(shape:ShapeData, index:number)
  {

    return <WrappedRectClass shape={shape} onFocus={this.selectShape} onChange={this.updateShape} index={index}/>;
    /*return <WrappedRect key={shape.id} shapeId={shape.id}
            x={shape.dimension.x}
            y={shape.dimension.y}
            width={shape.dimension.width}
            height={shape.dimension.height}
            ResizeHandleComponent={this.GetRectGizmos(shape)}
            onFocus={() => this.setState({shapeSelected : shape})}
            /*constrainMove={
              (args:any)=> {
                console.log(args);
                return {x:0, y:args.y}}
            }
            onChange={(rect) => this.updateShape(rect, shape, index)}/>;*/
  }

  protected renderElipse(shape:ShapeData, index:number)
  {
    return <WrappedElipse key={shape.id} shapeId={shape.id}
            x={shape.dimension.x}
            y={shape.dimension.y}
            width={shape.dimension.width}
            height={shape.dimension.height}
            ResizeHandleComponent={this.GetElipseGizmos(shape)}
            onFocus={() => this.setState({shapeSelected : shape})}
            onChange={(rect) => this.updateShape(rect, shape, index)}/>;
  }

  public render()
  {
    return <div>
            <ShapeEditor vectorHeight={window.innerHeight} vectorWidth={window.innerWidth} style={{background:'#eee'}}>
              <DrawLayer onAddShape={(rectangle:Rectangle)=>{}}
              onDrawEnd={()=>{
               this.setState({shapeSelected : undefined});
              }}
              />
              {
                this.state.shapes.map((shape, index) => {
                    switch(shape.type)
                    {
                      case 'rect':
                        return this.renderRect(shape, index);
                      case 'elipse':
                          return this.renderElipse(shape, index);
                      default:
                        return undefined;
                    }
                })
              }
              
            </ShapeEditor>
            <ToolBar buttonClick={this.addShape}/>
          </div>;
  }
}

export default App;
