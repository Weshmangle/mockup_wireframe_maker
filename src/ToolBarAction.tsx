import React from "react";
import { Menu } from "./Toolbar";

interface Props
{
    menu:Menu,
    active:boolean
}

interface State
{
    value:Number | boolean | string | any,
    iconType : string
}

export default class ToolBarAction extends React.Component<Props, State>
{

    constructor(props:any)
    {
        super(props);
    }

    public clickMenu()
    {
        if(this.props.menu.toggle)
        {
            this.setState({iconType : this.props.active ? 'solid' : 'regulard'});
        }
        if(this.props.menu.event)
        {
            this.props.menu.event(this.props.menu.type);
        }
    }

    public render()
    {
        let menu = this.props.menu;
        let iconType = this.props.active ? 'regular' : 'solid';
        
        return(
            <li className="nav-item">
                <a className="nav-link" href="#" onClick={e => this.clickMenu()} onTouchStart={e => this.clickMenu()}>
                    <i className={`fa-${iconType} ${menu.iconFontAwesome}`} style={{fontSize : '2em'}}></i>
                </a>
            </li>
        );
    }
}