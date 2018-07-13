import React, { Component } from 'react';
import { Col, Collapse, Container, Nav, Navbar, NavbarToggler, NavbarBrand, NavItem, NavLink, Row } from 'reactstrap';
import './App.css';

class App extends Component {
  state = {
    collapsed: true
  }

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <div>
        <header>
          <Navbar color="faded" light>
            <NavbarBrand href="/" className="mr-auto" style={{ color: '#0065ff' }}>Zubut</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
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
        <Container>
          <Row className="resumen">
            <Col>
              <div className="resumen-item">
                <p>633</p>
                <span>Viajes</span>
              </div>
            </Col>
            <Col>
              <div className="resumen-item">
                <p>$28K</p>
                <span>Ganancias</span>
              </div>
            </Col>
            <Col>
              <div className="resumen-item">
                <p>2.3K</p>
                <span>Kms</span>
              </div>
            </Col>
            <Col>
              <div className="resumen-item">
                <p>701</p>
                <span>Articulos</span>
              </div>
            </Col>
            <Col>
              <div className="resumen-item">
                <p>9/10</p>
                <span>Rating</span>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
