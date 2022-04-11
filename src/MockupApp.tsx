import React from "react";
import ContainerSVG, { ShapeData } from "./ContainerSVG";
import Toolbar, { Menu } from "./Toolbar";
import { SketchPicker, ColorResult, ColorChangeHandler } from 'react-color';

interface State
{
    shapes : ShapeData [],
    shapeSelected : ShapeData | undefined;
    moveShape: boolean,
    snapGrid:boolean,
    color:any
}
interface Props { }

class MockupApp extends React.Component<Props, State>
{
    constructor(props:any)
    {
        super(props);
        this.state = {
            shapeSelected : undefined,
            moveShape : false,
            shapes :
            [          
                {index:0, x:10, y:20, width:100, height:30, type: 'rect', fill:'#abcdef'},
            ],
            snapGrid : false,
            color : undefined
        };
    }

    public selectShape = (shape:ShapeData | undefined) =>
    {
        this.setState({shapeSelected : shape});
    }

    public onMoveShape = (move:boolean) =>
    {
        this.setState({moveShape : move});
    }

    public addShape = (type:string) =>
    {
        let last = this.state.shapes[this.state.shapes.length - 1];
        let shape:ShapeData = {index:this.state.shapes.length, x:last.x + 25, y:last.x + 25, width:50, height:50, type: type, fill:'#ff5555'};
        this.state.shapes.push(shape);
        this.setState({});
    }

    public addSnapping = (type:string) =>
    {
        this.setState({snapGrid : !this.state.snapGrid});
    }

    public removeShapeSelected = () =>
    {
        if(this.state.shapeSelected?.index != undefined)
        {
            delete this.state.shapes[this.state.shapeSelected?.index];
            this.setState({});
        }
    }

    public setColorShapeSelected = (color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) =>
    {
        if(this.state.shapeSelected != undefined)
        {
            this.state.shapeSelected.fill = color.hex;
        }

        this.setState({color : color});
    }

    public render()
    {
        let menu:Menu[] = 
        [
            {id:'0', name : 'Create Rect', type:'rect', iconFontAwesome:'fa-square', event : this.addShape},
            {id:'1', name : 'Create Circle', type:'circle', iconFontAwesome:'fa-circle', event : this.addShape},
            //{id:'2', name : 'Create Slash', type:'line', iconFontAwesome:'fa-slash', event : this.addShape},
            {id:'3', name : 'Create Text', type:'text', iconFontAwesome:'fa-text-height', event : this.addShape},
            {id:'4', name : 'Remove shape', type:'remove', iconFontAwesome:'fa-trash-can', event : this.removeShapeSelected},
            {
                id:'5', name : 'Option Color', type:'color', iconFontAwesome:'fa-palette', subMenu:
                [
                    {id:'5.1', name : 'Fill Color', type:'color', iconFontAwesome:'fa-palette'},
                    {id:'5.2', name : 'Border Color', type:'color', iconFontAwesome:'fa-palette'},
                ]
            },
            //{id:'6', name : 'Active Snapping', type:'snapping', iconFontAwesome:'fa-magnet', toggle : true, event : this.addSnapping},
        ];
        
        return (
        <div>
            <div style={{position : 'absolute', right:'0'}}>
                <SketchPicker onChange={(color:any) => this.setState({color : color.hex})} onChangeComplete={this.setColorShapeSelected} color={this.state.color}/>
            </div>
            <ContainerSVG
                shapes={this.state.shapes}
                shapeSelected={this.state.shapeSelected}
                moveShape={this.state.moveShape}
                snapGrid={this.state.snapGrid}
                onSelectShape={this.selectShape}
                onMoveShape={this.onMoveShape}/>
            <Toolbar menu={menu}/>
        </div>);
    }
}
 
export default MockupApp;