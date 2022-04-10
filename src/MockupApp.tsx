import React from "react";
import ContainerSVG, { ShapeData } from "./ContainerSVG";
import Toolbar, { Menu } from "./Toolbar";

interface State
{
    shapes : ShapeData [],
    shapeSelected : ShapeData | undefined;
}
interface Props { }

class MockupApp extends React.Component<Props, State>
{
    constructor(props:any)
    {
        super(props);
        this.state = {
            shapeSelected : undefined,
            shapes :
            [          
                {index:0, x:10, y:20, width:100, height:30, type: 'rect', fill:'#abcdef'},
            ]
        };
    }

    public selectShape = (shape:ShapeData) =>
    {
        this.setState({shapeSelected : shape});
    }

    public addShape = (type:string) =>
    {
        let last = this.state.shapes[this.state.shapes.length - 1];
        let shape:ShapeData = {index:this.state.shapes.length, x:last.x + 25, y:last.x + 25, width:50, height:50, type: type, fill:'#ff5555'};
        this.state.shapes.push(shape);
        this.setState({});
    }

    public removeShapeSelected = () =>
    {
        if(this.state.shapeSelected?.index != undefined)
        {
            delete this.state.shapes[this.state.shapeSelected?.index];
            this.setState({});
        }
    }

    public render()
    {
        let menu:Menu[] = 
        [
            {name : 'Create Rect', type:'rect', iconFontAwesome:'fa-square'},
            {name : 'Create Circle', type:'circle', iconFontAwesome:'fa-circle'},
            {name : 'Create Text', type:'text', iconFontAwesome:'fa-text-height'},
            {name : 'Create Draw', type:'path', iconFontAwesome:'fa-pencil'},
            {name : 'Remove shape', type:'remove', iconFontAwesome:'fa-trash-can'},
            {
                name : 'Option Color', type:'color', iconFontAwesome:'fa-palette', subMenu:
                [
                    {name : 'Fill Color', type:'color', iconFontAwesome:'fa-palette'},
                    {name : 'Border Color', type:'color', iconFontAwesome:'fa-palette'},
                ]
            }
        ];
        
        return (
        <div>
            <ContainerSVG
                shapes={this.state.shapes}
                shapeSelected={this.state.shapeSelected}
                onAddShape={e=>e}
                onSelectShape={this.selectShape}/>
            <Toolbar
                menu={menu}
                onAddShape={this.addShape}
                removeShape={this.removeShapeSelected}/>
        </div>);
    }
}
 
export default MockupApp;