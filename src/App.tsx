import React, { Children } from 'react';
import logo from './logo.svg';
import './App.css';
import ContainerSVG from './ContainerSVG';
import Toolbar from './Toolbar';
import MockupApp from './MockupApp';

class App extends React.Component
{
  public render()
  {
    return <MockupApp />
  }
}

export default App;
