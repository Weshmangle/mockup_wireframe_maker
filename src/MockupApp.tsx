import React from "react";
import ContainerSVG, { ShapeData } from "./ContainerSVG";
import Toolbar, { Menu } from "./Toolbar";
import { SketchPicker, ColorResult } from 'react-color';
import { PresetColor } from "react-color/lib/components/sketch/Sketch";

interface State
{
    shapes : ShapeData [],
    shapeSelected : ShapeData | undefined;
    moveShape: boolean,
    snapGrid:boolean,
    color:any,
    showSlider:boolean,
    currentColorPicker:any,
    presetColors:PresetColor[],
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
                {id:Date.now(), x:10, y:20, width:100, height:30, type: 'rect', fill:'#8d9db6'},
            ],
            snapGrid : false,
            color : {r:'', g:'', b:''},
            showPickerColor : false,
            showSlider : false,
            currentColorPicker : {r:'', g:'', b:''},
            presetColors : []
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
        let shape:ShapeData = {id:Date.now(), x:shapeFocus.x + 25, y:shapeFocus.y + 25, width:50, height:50, type: type, fill:'#8d9db6'};
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
        
        if(shape !== undefined)
        {
            let newShapes = shapes.filter(menu => menu.id !== shape?.id);
            
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
        if(this.state.shapeSelected !== undefined)
        {
            let shape:ShapeData = this.state.shapeSelected;
            shape.fill = color.hex + (color.rgb.a ? Math.floor(color.rgb.a * 255).toString(16) : '00');
            this.setState({shapeSelected : shape});
            this.addColorToPresetColor(shape.fill, shape.id);
        }

        this.setState({currentColorPicker : color.rgb});
    }

    public addColorToPresetColor(color:string, id:number)
    {
        let colors = this.state.presetColors;
        
        let indexColorFinded = colors.findIndex((color:any) => color.title == 'color ' + id);
        
        if(indexColorFinded >= 0)
        {
            colors. splice(indexColorFinded, 1);
        }

        this.setState({presetColors : colors.concat({color : color, title : 'color ' + id})});
    }

    protected showPickerColor = () =>
    {
        this.setState({showPickerColor : !this.state.showPickerColor})
    }

    protected showStrokeEdit()
    {
        this.setState({showSlider : !this.state.showSlider})
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
                id:'5', name : 'Option Color', type:'color', iconFontAwesome:'fa-palette', event: this.showPickerColor, subMenu:
                [
                    {id:'5.1', name : 'Fill Color', type:'color', iconFontAwesome:'fa-palette'},
                    {id:'5.2', name : 'Border Color', type:'color', iconFontAwesome:'fa-palette'},
                ]
            },
            {id:'6', name : 'Stroke', type:'stroke', iconFontAwesome:'fa-dash', toggle : true, event : this.addSnapping},
            {id:'7', name : 'Active Snapping', type:'snapping', iconFontAwesome:'fa-compass', toggle : true, event : this.addSnapping},
        ];
        
        return (
        <div>
            <div style={{position : 'absolute', right:'0', visibility:this.state.showPickerColor ? 'visible' : 'hidden'}}>
                <SketchPicker presetColors={this.state.presetColors} onChange={this.setColorShapeSelected} onChangeComplete={this.setColorShapeSelected} color={this.state.currentColorPicker}/>
            </div>
            <ContainerSVG
                shapes={this.state.shapes}
                shapeSelected={this.state.shapeSelected}
                snapGrid={this.state.snapGrid}
                onSelectShape={this.selectShape}
                onResize={e => {
                    if(this.state.shapeSelected)
                    {
                        let shape:ShapeData = this.state.shapeSelected;
                        
                        shape.height = Math.abs(e.height);
                        shape.width = Math.abs(e.width);
                        this.setState({shapeSelected : shape});
                    }
                }}/>
            <Toolbar menu={menu} sliderVisible={this.state.showSlider}/>
        </div>);
    }
}
 
export default MockupApp;