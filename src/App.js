import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import IoCalendar from 'react-icons/lib/io/calendar';
import moment from 'moment';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import Distancias from './components/Distancias';
import Ganancias from './components/Ganancias';
import Menu from './components/Menu';
import Paquetes from './components/Paquetes';
import Viajes from './components/Viajes';
import 'moment/locale/es';
import 'react-day-picker/lib/style.css';
import './App.css';

import Resumen from './components/Resumen'

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
    collapsed: true,
    from: undefined,
    to: undefined,
    viajes: [],
    stats: {
      viajes: 0,
      ganancias: 0,
      distancia: 0,
      articulos: 0,
      puntaje: 0,
    },
  }

  componentDidMount() {
    fetch('http://localhost:4000/viajes')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then((response) => {
        let ganancias = 0;
        let distancia = 0;
        let articulos = 0;
        let puntaje = 0;
        for (const viaje of response) {
          ganancias += viaje.precio;
          distancia += viaje.distancia;
          articulos += viaje.detallePaquete.length;
          puntaje += viaje.puntaje;
        }
        this.setState({ stats: { viajes: response.length, ganancias, distancia, articulos, puntaje: puntaje / response.length } });
      })
  }

  showFromMonth = () => {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }

  handleFromChange = (from) => {
    // Change the from date and focus the "to" input field    
    this.setState({ from });
  }

  handleToChange = (to) => {
    this.setState({ to }, this.showFromMonth);
  }

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const { from, to, stats } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <div>
        <Menu/>
        <Container>
          <Row>
            <Col>
              <div className="date-container">
                <span className="date-icon"><IoCalendar /></span>
                <span className="date-start">
                  <DayPickerInput
                    formatDate={formatDate}
                    parseDate={parseDate}
                    value={from} format="LL"
                    placeholder="Fecha Inicio"
                    dayPickerProps={{
                      selectedDays: [from, { from, to }],
                      disabledDays: { after: to },
                      localeUtils: MomentLocaleUtils,
                      locale: "es",
                      modifiers,
                      numberOfMonths: 1,
                      onDayClick: () => this.to.getInput().focus(),
                    }}
                    onDayChange={this.handleFromChange} />
                </span>
                <span className="date-end">
                  <DayPickerInput
                    ref={el => (this.to = el)}
                    value={to}
                    formatDate={formatDate}
                    parseDate={parseDate}
                    format="LL"
                    placeholder="Fecha Fin"
                    dayPickerProps={{
                      selectedDays: [from, { from, to }],
                      disabledDays: { before: from },
                      localeUtils: MomentLocaleUtils,
                      locale: "es",
                      modifiers,
                      month: from,
                      fromMonth: from,
                      numberOfMonths: 1,
                    }}
                    onDayChange={this.handleToChange} />
                </span>
              </div>
            </Col>
          </Row>
          <Resumen
            viajes={stats.viajes}
            ganancias={stats.ganancias}
            distancia={stats.distancia}
            articulos={stats.articulos}
            puntaje={stats.puntaje} />
          <Row className="no-margin">

            {/* Viajes */}
            <Col xs="12" md="6" className="viajes">
              <Viajes data={data02} />
            </Col>

            {/* Paquetes */}
            <Col xs="12" md="6" className="section paquetes">
              <Paquetes data={data02} />
            </Col>

          </Row>
          <Row className="no-margin">

            {/* Ganancias */}
            <Col xs="12" md="6" className="ganancias">
              <Ganancias data={distanciasData} />
            </Col>

            {/* Distancias */}
            <Col xs="12" md="6" className="section distancias">
              <Distancias data={distanciasData} />
            </Col>

          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
