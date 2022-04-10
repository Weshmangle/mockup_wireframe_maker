import React from "react";

export interface Menu
{
    name: string,
    type:string,
    iconFontAwesome?:string,
    subMenu?:Menu[]
}

interface Props
{
    onAddShape:(type:string) => void,
    removeShape : () => void,
    menu : Menu[]
}
 
interface State { }

class Toolbar extends React.Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);
        this.state = {};
    }

    protected renderMenu = (menu:Menu, index:number) =>
    {
        let eventClick = menu.type == 'remove' ? () => this.props.removeShape() : () => this.props.onAddShape(menu.type);
        
        return(
            <li className="nav-item" key={index}>
                <a className="nav-link" href="#" onClick={eventClick}>
                    <i className={`fa-solid ${menu.iconFontAwesome}`} style={{fontSize : '2em'}}></i>
                </a>
            </li>
        );
    }

    public render()
    {
        return(
        <nav className="navbar navbar-expand-sm fixed-bottom navbar-dark bg-dark justify-content-center">
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
            {this.props.menu.map(this.renderMenu)}
            </ul>
          </div>
        </nav>);
    }
}
 
export default Toolbar;