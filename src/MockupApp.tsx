import React from "react";
import ContainerSVG, { ShapeData } from "./ContainerSVG";
import Toolbar, { Menu } from "./Toolbar";
import { SketchPicker, ColorResult, ColorChangeHandler } from 'react-color';
import { EStateEditor } from "./EStateEditor";
import GridSnapping from "./GridSnapping";

interface State
{
    shapes : ShapeData [],
    shapeSelected : ShapeData | undefined;
    moveShape: boolean,
    snapGrid:boolean,
    color:any,
    showPickerColor:boolean
}
interface Props { }

class MockupApp extends React.Component<Props, State>
{
    public static readonly SIZE_SUBDIVISION_GRID:number = 50;
    
    constructor(props:any)
    {
        super(props);
        this.state = {
            shapeSelected : undefined,
            moveShape : false,
            shapes :
            [          
                {id:Date.now(), x:10, y:20, width:100, height:30, type: 'rect', fill:'#abcdef'},
            ],
            snapGrid : false,
            color : {r:'', g:'', b:''},
            showPickerColor : false
        };
    }

    protected lastShape() : ShapeData | undefined
    {
        return this.state.shapes[this.state.shapes.length -1];
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
        let shapeFocus:any = this.state.shapeSelected;
        shapeFocus = shapeFocus ? shapeFocus : this.lastShape();
        shapeFocus = shapeFocus ? shapeFocus : {x:0, y:0};
        let shape:ShapeData = {id:Date.now(), x:shapeFocus.x + 25, y:shapeFocus.y + 25, width:50, height:50, type: type, fill:'#ff5555'};
        this.setState({shapeSelected : shape, shapes : this.state.shapes.concat(shape)});
    }

    public addSnapping = (type:string) =>
    {
        this.setState({snapGrid : !this.state.snapGrid});
    }

    public removeShapeSelected = () =>
    {
        let shapes = this.state.shapes;
        let shape = this.state.shapeSelected;
        
        if(shape != undefined)
        {
            let newShapes = shapes.filter(menu => menu.id != shape?.id);
            
            this.setState({shapeSelected : newShapes[newShapes.length - 1], shapes : newShapes});
        }
    }

    public rizeShape(resize:{width:number, height:number})
    {
        if(this.state.shapeSelected)
        {
            let shape = this.state.shapeSelected;
            shape.width = resize.width;
            shape.height = resize.height;
        }
    }

    public setColorShapeSelected = (color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) =>
    {
        if(this.state.shapeSelected != undefined)
        {
            this.state.shapeSelected.fill = color.hex + (color.rgb.a ? Math.floor(color.rgb.a * 255).toString(16) : '00');
        }

        this.setState({color : color.rgb});
    }

    protected showPickerColor = () =>
    {
        this.setState({showPickerColor : !this.state.showPickerColor})
    }

    public render()
    {
        let menu:Menu[] = 
        [
            {id:'0', name : 'Create Rect', type:'rect', iconFontAwesome:'fa-square', event : this.addShape},
            {id:'1', name : 'Create Circle', type:'circle', iconFontAwesome:'fa-circle', event : this.addShape},
            {id:'3', name : 'Create Text', type:'text', iconFontAwesome:'fa-text-height', event : this.addShape},
            {id:'4', name : 'Remove shape', type:'remove', iconFontAwesome:'fa-trash-can', event : this.removeShapeSelected},
            {
                id:'5', name : 'Option Color', type:'color', iconFontAwesome:'fa-palette', event: () => this.showPickerColor(), subMenu:
                [
                    {id:'5.1', name : 'Fill Color', type:'color', iconFontAwesome:'fa-palette'},
                    {id:'5.2', name : 'Border Color', type:'color', iconFontAwesome:'fa-palette'},
                ]
            },
            {id:'6', name : 'Active Snapping', type:'snapping', iconFontAwesome:'fa-compass', toggle : true, event : this.addSnapping},
        ];
        
        return (
        <div>
            <div style={{position : 'absolute', right:'0', visibility:this.state.showPickerColor ? 'visible' : 'hidden'}}>
                <SketchPicker onChange={(color:any) => this.setState({color : color.rgb})} onChangeComplete={this.setColorShapeSelected} color={this.state.color}/>
            </div>
            <ContainerSVG
                shapes={this.state.shapes}
                shapeSelected={this.state.shapeSelected}
                snapGrid={this.state.snapGrid}
                onSelectShape={this.selectShape}
                onResize={e => {
                    if(this.state.shapeSelected)
                    {
                        this.state.shapeSelected.height = Math.abs(e.height);
                        this.state.shapeSelected.width = Math.abs(e.width);
                    }
                }}/>
            <Toolbar menu={menu} sliderVisible={false}/>
        </div>);
    }
}
 
export default MockupApp;