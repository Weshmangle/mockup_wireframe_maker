import React from "react";

export interface Menu
{
    id:string,
    name: string,
    type:string,
    iconFontAwesome?:string,
    toggle?:boolean,
    subMenu?:Menu[],
    event? : (type:string) => void
}

interface Props
{
    menu : Menu[]
}
 
interface State
{
    menuActivate : Menu[]
}

class Toolbar extends React.Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);
        this.state = { menuActivate : []};
    }

    protected menuIsActivate(menu:Menu)
    {
        let menuFinded = this.state.menuActivate.find(m => m.id == menu.id)
        return menuFinded != undefined;
    }

    public clickMenu(menu:Menu)
    {
        let event = menu.event ? menu.event : (type:string) => {console.error("[ CORE ] NO EVENT ADDED")};
        
        let iconType = 'regular';

        if(menu.toggle)
        {
            let menus = this.state.menuActivate.filter(menuItem => menuItem.id == menu.id);

            if(menus.length > 0)
            {
                iconType = 'regular';
                this.setState({menuActivate : this.state.menuActivate.filter(menuItem => menuItem.id != menu.id)});
            }
            else
            {
                iconType = 'solid';
                this.setState({menuActivate : this.state.menuActivate.concat(menu)});
            }
        }

        event(menu.type);
    }

    protected renderMenu = (menu:Menu, index:number) =>
    {
        let iconType = this.menuIsActivate(menu) ? 'regular' : 'solid';
        
        return(
            <li className="nav-item" key={index}>
                <a className="nav-link" href="#" onClick={e => this.clickMenu(menu)}>
                    <i className={`fa-${iconType} ${menu.iconFontAwesome}`} style={{fontSize : '2em'}}></i>
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