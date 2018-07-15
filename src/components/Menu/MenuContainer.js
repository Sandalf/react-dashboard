import React, { Component } from 'react';
import Menu from './Menu';

class MenuContainer extends Component {

  state = {
    collapsed: true,
  }

  handleToggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <Menu 
       collapsed={this.state.collapsed}
       handleToggle={this.handleToggle}/>
    );
  }
}

export default MenuContainer;