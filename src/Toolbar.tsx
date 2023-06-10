import React from "react";
import ToolBarAction from "./ToolBarAction";

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
    menu : Menu[],
    sliderVisible?:boolean
}
 
interface State
{
    menuActivate : Menu[],
    valueSlider: number
}

class Toolbar extends React.Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);
        this.state = { menuActivate : [], valueSlider : 50};
    }

    protected menuIsActivate(menu:Menu)
    {
        let menuFinded = this.state.menuActivate.find(m => m.id === menu.id)
        return menuFinded !== undefined;
    }

    public clickMenu(menu:Menu)
    {
        let event = menu.event ? menu.event : (type:string) => {console.error("[ CORE ] NO EVENT ADDED")};
        
        if(menu.toggle)
        {
            let menus = this.state.menuActivate.filter(menuItem => menuItem.id === menu.id);

            if(menus.length > 0)
            {
                this.setState({menuActivate : this.state.menuActivate.filter(menuItem => menuItem.id !== menu.id)});
            }
            else
            {
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
                <a className="nav-link" href="#" onClick={e => this.clickMenu(menu)} onTouchStart={e => this.clickMenu(menu)}>
                    <i className={`fa-${iconType} ${menu.iconFontAwesome}`} style={{fontSize : '2em'}}></i>
                </a>
            </li>
        );
    }

    public sliderChange = (event:any) =>
    {
        this.setState({valueSlider : Number(event.target.value)});
    }

    public render()
    {
        //
        //
        return(<div>
                <div className="container-fluid" style={{position : 'absolute', bottom : '65px', visibility : this.props.sliderVisible ? 'visible' : 'hidden'}}>
                    <div className="row bg-secondary p-3">
                        <div className='col-11'> <input value={this.state.valueSlider} type='range' onInput={this.sliderChange} className='form-range' /> </div>
                        <div className='col-1 text-dark text-center'> {this.state.valueSlider} </div>
                    </div> 
                </div>
                <nav className="navbar navbar-expand-sm fixed-bottom navbar-dark bg-dark justify-content-center">
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav">
                    {/*this.props.menu.map(this.renderMenu)*/}
                    {this.props.menu.map((value, index) => <ToolBarAction menu={value} key={index} active={false}/>)}
                    </ul>
                </div>
                </nav>
              </div>);
    }
}
 
export default Toolbar;