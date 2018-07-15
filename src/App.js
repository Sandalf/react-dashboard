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
  { name: 'Ene', uv: 0, pv: 0, amount: 0, kms: 0, },
  { name: 'Feb', uv: 0, pv: 0, amount: 0, kms: 0, },
  { name: 'Mar', uv: 0, pv: 0, amount: 0, kms: 0, },
  { name: 'Abr', uv: 0, pv: 0, amount: 0, kms: 0, },
  { name: 'May', uv: 0, pv: 0, amount: 0, kms: 0, },
  { name: 'Jun', uv: 0, pv: 0, amount: 0, kms: 0, },
  { name: 'Jul', uv: 0, pv: 0, amount: 0, kms: 0, },
];

class App extends Component {
  state = {
    collapsed: true,
    from: undefined,
    to: undefined,
    trips: [],
    stats: {
      trips: {
        completed: 0,
        canceled: 0,
      },
      earnings: 0,
      distance: 0,
      products: 0,
      score: 0,
      groupedData: distanciasData,
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
        this.setState({ trips: response }, () => {
          this.updateStats();
        });
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
    this.setState({ from }, this.updateStats);
  }

  handleToChange = (to) => {
    this.setState({ to }, () => {
      this.showFromMonth();
      this.updateStats();
    });
  }

  updateStats = () => {
    const { from, to } = this.state;
    let dateEnd = to ? to : moment();
    let dateStart = from ? from : moment().startOf('year');
    let trips = { completed: 0, canceled: 0 };
    let earnings = 0;
    let distance = 0;
    let products = 0;
    let score = 0;
    let groupedData = this.getLineGraphDates();
    let format = this.getLineGraphDateFormat();
    for (const trip of this.state.trips) {
      if (dateStart && dateEnd) {
        if (moment(trip.fecha).isBetween(dateStart, dateEnd)) {
          trip.estatus === 1 ? trips.completed += 1 : trips.canceled += 1;
          earnings += trip.precio;
          distance += trip.distancia;
          products += trip.detallePaquete.length;
          score += trip.puntaje;
          groupedData = this.addLineGraphElement(groupedData, trip, format);
        }
      }
    }
    console.log('groupedData', groupedData);
    this.setState({
      stats: {
        trips,
        earnings,
        distance,
        products,
        score: score / trips.completed,
        groupedData,
      }
    });
  }

  getLineGraphDates = () => {
    let data = [];
    const { to, from } = this.state;
    let dateEnd = to ? moment(to) : moment();
    let dateStart = from ? moment(from) : moment().startOf('year');
    if (moment(dateEnd).diff(moment(dateStart), 'years') >= 1) {
      while (moment(dateEnd).diff(moment(dateStart), 'years') >= 1) {
        data.push({ name: dateStart.format('YYYY'), amount: 0, kms: 0, });
        dateStart.add(1, 'years');
      }
      data.push({ name: dateStart.format('YYYY'), amount: 0, kms: 0, });
      console.log('data years', data);
    } else if (moment(dateEnd).diff(moment(dateStart), 'months') >= 1) {
      while (moment(dateEnd).diff(moment(dateStart), 'months') >= 1) {
        data.push({ name: dateStart.format('MMM'), amount: 0, kms: 0, });
        dateStart.add(1, 'months');
      }
      data.push({ name: dateStart.format('MMM'), amount: 0, kms: 0, });
      console.log('data month', data);
    } else if (moment(dateEnd).diff(moment(dateStart), 'days') >= 1) {
      while (moment(dateEnd).diff(moment(dateStart), 'days') >= 1) {
        data.push({ name: dateStart.format('MMM Do'), amount: 0, kms: 0, });
        dateStart.add(1, 'days');
      }
      data.push({ name: dateStart.format('MMM Do'), amount: 0, kms: 0, });
      console.log('data days', data);
    }
    return data;
  }

  getLineGraphDateFormat = () => {
    let format = 'MMM';
    const { to, from } = this.state;
    let dateEnd = to ? moment(to) : moment();
    let dateStart = from ? moment(from) : moment().startOf('year');
    if (moment(dateEnd).diff(moment(dateStart), 'years') >= 1) {
      return 'YYYY';
    } else if (moment(dateEnd).diff(moment(dateStart), 'months') >= 1) {
      return 'MMM';
    } else if (moment(dateEnd).diff(moment(dateStart), 'days') >= 1) {
      return 'MMM Do';
    }
    return format;
  }

  addLineGraphElement(_stats, trip, dateFormat) {
    console.log('moment(trip.fecha).format(dateFormat)', moment(trip.fecha).format(dateFormat));
    let stats = [..._stats];
    let index = 0;
    let dataObj = stats.find((el, i) => {
      index = i;
      return el.name === moment(trip.fecha).format(dateFormat);
    });

    if (dataObj) {
      dataObj.amount += trip.precio;
      dataObj.kms += trip.distancia;
      stats[index] = dataObj;
    }

    return stats;
  }

  render() {
    const { from, to, stats } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <div>
        <Menu />
        <Container>
          <Row>
            <Col>
              <div className="date-container">
                <span className="date-icon"><IoCalendar /></span>
                <span className="date-start">
                  <DayPickerInput
                    formatDate={formatDate}
                    parseDate={parseDate}
                    value={from ? from : moment().startOf('year').format('LL')}
                    format="LL"
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
                    value={to ? to : moment().format('LL')}
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
            trips={stats.trips.completed + stats.trips.canceled}
            earnings={stats.earnings}
            distance={stats.distance}
            products={stats.products}
            score={stats.score} />
          <Row className="no-margin">

            {/* Viajes */}
            <Col xs="12" md="6" className="viajes">
              <Viajes 
                total={stats.trips.completed + stats.trips.canceled} 
                data={[{ name: 'Cancelados', value: stats.trips.canceled }, { name: 'Completados', value: stats.trips.completed }]} />
            </Col>

            {/* Paquetes */}
            <Col xs="12" md="6" className="section paquetes">
              <Paquetes 
                total={0}
                data={[{ name: 'Cancelados', value: stats.trips.canceled }, { name: 'Completados', value: stats.trips.completed }]} />
            </Col>

          </Row>
          <Row className="no-margin">

            {/* Ganancias */}
            <Col xs="12" md="6" className="ganancias">
              <Ganancias total={stats.earnings} data={stats.groupedData} />
            </Col>

            {/* Distancias */}
            <Col xs="12" md="6" className="section distancias">
              <Distancias total={stats.distance} data={stats.groupedData} />
            </Col>

          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
