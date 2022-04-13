export function ToolBar(props:{buttonClick:(type:string) => void})
{
    return <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-bottom">
            <div className="container-fluid">
              <div className="collapse navbar-collapse" id="mynavbar">
                <ul className="navbar-nav me-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={e => props.buttonClick('rect')}>
                      <div style={{width:50, height:50, background:'white'}}></div>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={e => props.buttonClick('elipse')}>
                      <div style={{width:50, height:50, background:'white', borderRadius:'25px'}}></div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

}