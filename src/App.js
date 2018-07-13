import React, { Component } from 'react';
import { Col, Collapse, Container, Nav, Navbar, NavbarToggler, NavbarBrand, NavItem, NavLink, Row } from 'reactstrap';
import { CartesianGrid, Legend, Line, LineChart, PieChart, Pie, Tooltip, XAxis, YAxis } from 'recharts';
import './App.css';

const data02 = [{ name: 'Completados', value: 603 }, { name: 'Cancelados', value: 30 }];

const distanciasData = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

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
              <div>
                <span className="cifra">2300 kilometros recorridos</span>
                <div>
                  <LineChart width={500} height={150} data={distanciasData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                  </LineChart>
                </div>
              </div>
            </Col>

          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
