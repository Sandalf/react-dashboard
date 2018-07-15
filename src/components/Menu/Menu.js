import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Nav, Navbar, NavbarToggler, NavbarBrand, NavItem, NavLink } from 'reactstrap';

const Menu = ({ handleToggle, collapsed }) => {
  return (
    <header>
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto" style={{ color: '#0065ff' }}>Zubut</NavbarBrand>
        <NavbarToggler onClick={handleToggle} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="#">Inicio</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Dashboard</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  )
}

Menu.propTypes = {
  data: PropTypes.array,
};


export default Menu;