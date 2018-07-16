import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Navbar, NavbarBrand } from 'reactstrap';
import avatar from '../../images/avatar.jpg';

const Menu = ({ handleToggle, collapsed }) => {
  return (
    <header>
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto" style={{ color: '#0065ff' }}>Zubut</NavbarBrand>
        <Dropdown isOpen={!collapsed} toggle={handleToggle}>
          <DropdownToggle className="menu-button">
            Menu
        </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Tablero</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <img src={avatar} style={{ height: '40px', margin: '0px 15px', borderRadius: '50%' }} />
      </Navbar>
    </header>
  )
}

Menu.propTypes = {
  data: PropTypes.array,
};


export default Menu;