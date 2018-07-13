import React, { Component } from 'react';
import { Col, Collapse, Container, Nav, Navbar, NavbarToggler, NavbarBrand, NavItem, NavLink, Row } from 'reactstrap';
import { PieChart, Pie, Tooltip } from 'recharts';
import './App.css';

const data02 = [{ name: 'Completados', value: 603 }, { name: 'Cancelados', value: 30 }];

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
          <Row className="resumen section no-margin">
            <Col>
              <div className="resumen-item">
                <p className="cifra">633</p>
                <span>Viajes</span>
              </div>
            </Col>
            <Col>
              <div className="resumen-item">
                <p className="cifra">$28K</p>
                <span>Ganancias</span>
              </div>
            </Col>
            <Col>
              <div className="resumen-item">
                <p className="cifra">2.3K</p>
                <span>Kms</span>
              </div>
            </Col>
            <Col>
              <div className="resumen-item">
                <p className="cifra">701</p>
                <span>Articulos</span>
              </div>
            </Col>
            <Col>
              <div className="resumen-item">
                <p className="cifra">9/10</p>
                <span>Puntaje</span>
              </div>
            </Col>
          </Row>
          <Row className="no-margin">
            {/* Viajes */}
            <Col xs="12" md="6" className="viajes">
              <div className="section">
                <span className="cifra">633 viajes realizados</span>
                <div className="graph-container">
                  <PieChart width={160} height={160}>
                    <Pie data={data02} cx={75} cy={75} innerRadius={40} outerRadius={80} fill="#0065ff" />
                    <Tooltip />
                  </PieChart>
                </div>
              </div>
            </Col>

            {/* Distancias */}
            <Col xs="12" md="6" className="section distancias">
              <div></div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
