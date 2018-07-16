import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import IoCalendar from 'react-icons/lib/io/calendar';
import moment from 'moment';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import Distances from './components/Distances';
import Earnings from './components/Earnings';
import Menu from './components/Menu';
import Packages from './components/Packages';
import Totals from './components/Totals'
import Trips from './components/Trips';
import { API_ROOT } from './api/config';
import 'moment/locale/es';
import 'react-day-picker/lib/style.css';

const linearGraphData = [
  { name: 'Ene', amount: 0, kms: 0, },
  { name: 'Feb', amount: 0, kms: 0, },
  { name: 'Mar', amount: 0, kms: 0, },
  { name: 'Abr', amount: 0, kms: 0, },
  { name: 'May', amount: 0, kms: 0, },
  { name: 'Jun', amount: 0, kms: 0, },
  { name: 'Jul', amount: 0, kms: 0, },
];

class App extends Component {
  state = {
    collapsed: true,
    from: undefined,
    to: undefined,
    trips: [],
    productCategories: [],
    stats: {
      totals: {
        trips: 0,
        earnings: 0,
        distance: 0,
        products: 0,
        score: 0,
      },
      trips: {
        completed: 0,
        canceled: 0,
      },
      productData: linearGraphData,
      groupedData: linearGraphData,
    },
  }

  async componentDidMount() {
    try {
      const tripsRes = await fetch(`${API_ROOT}/trips`);
      const categoriesRes = await fetch(`${API_ROOT}/categories`);
      const tripsJson = await tripsRes.json();
      const categoriesJson = await categoriesRes.json();
      this.setState({
        trips: tripsJson,
        productCategories: categoriesJson,
      }, () => {
        this.updateStats();
      });
    } catch (error) {
      console.error("Error trying to get trips and categories:", error);
    }
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
    const { from, to, productCategories } = this.state;
    let dateEnd = to ? to : moment();
    let dateStart = from ? from : moment().startOf('year');
    let trips = { completed: 0, canceled: 0 };
    let earnings = 0;
    let distance = 0;
    let products = 0;
    let score = 0;
    let productsData = productCategories.map(el => { return { id: el.id, name: el.descipcion, value: 0 } });
    let groupedData = this.getLineGraphDates();
    let format = this.getLineGraphDateFormat();
    for (const trip of this.state.trips) {
      if (moment(trip.date).isBetween(dateStart, dateEnd)) {
        if (trip.status === 1) {
          trips.completed += 1;
          products += trip.packageDetail.length;
          productsData = this.addProductElement(productsData, trip);
          distance += trip.distance;
          earnings += trip.cost;
          score += trip.score;
        } else {
          trips.canceled += 1;
        }
        groupedData = this.addLineGraphElement(groupedData, trip, format);
      }
    }
    this.setState({
      stats: {
        totals: {
          trips: (trips.completed + trips.canceled),
          earnings,
          distance,
          products,
          score: score > 0 ? score / trips.completed : score,
        },
        trips,
        groupedData,
        productData: productsData,
      }
    });
  }

  getLineGraphDates = () => {
    let data = [];
    const { to, from } = this.state;
    let dateEnd = to ? moment(to) : moment();
    let dateStart = from ? moment(from) : moment().startOf('year');
    if (dateEnd.diff(dateStart, 'years') >= 1) {
      while (dateEnd.diff(dateStart, 'years') >= 1) {
        data.push({ name: dateStart.format('YYYY'), amount: 0, kms: 0, });
        dateStart.add(1, 'years');
      }
      data.push({ name: dateStart.format('YYYY'), amount: 0, kms: 0, });
    } else if (dateEnd.diff(dateStart, 'months') >= 1) {
      while (dateEnd.diff(dateStart, 'months') >= 1) {
        data.push({ name: dateStart.format('MMM'), amount: 0, kms: 0, });
        dateStart.add(1, 'months');
      }
      data.push({ name: dateStart.format('MMM'), amount: 0, kms: 0, });
    } else if (dateEnd.diff(dateStart, 'days') >= 1) {
      while (dateEnd.diff(dateStart, 'days') >= 1) {
        data.push({ name: dateStart.format('MMM Do'), amount: 0, kms: 0, });
        dateStart.add(1, 'days');
      }
      data.push({ name: dateStart.format('MMM Do'), amount: 0, kms: 0, });
    }
    return data;
  }

  getLineGraphDateFormat = () => {
    let format = 'MMM';
    const { to, from } = this.state;
    let dateEnd = to ? moment(to) : moment();
    let dateStart = from ? moment(from) : moment().startOf('year');
    if (dateEnd.diff(dateStart, 'years') >= 1) {
      return 'YYYY';
    } else if (dateEnd.diff(dateStart, 'months') >= 1) {
      return 'MMM';
    } else if (dateEnd.diff(dateStart, 'days') >= 1) {
      return 'MMM Do';
    }
    return format;
  }

  addLineGraphElement = (_stats, trip, dateFormat) => {
    let stats = [..._stats];
    let index = 0;
    let dataObj = stats.find((el, i) => {
      index = i;
      return el.name === moment(trip.date).format(dateFormat);
    });

    if (dataObj) {
      dataObj.amount += trip.cost;
      dataObj.kms += trip.distance;
      stats[index] = dataObj;
    }

    return stats;
  }

  addProductElement = (_data, trip) => {
    let data = [..._data];
    for (const product of trip.packageDetail) {
      let index = data.findIndex((el) => { return el.id === product.categoryId; });
      data[index].value += 1;
    }
    return data;
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
          <Totals
            trips={stats.totals.trips}
            earnings={stats.totals.earnings}
            distance={stats.totals.distance}
            products={stats.totals.products}
            score={stats.totals.score} />
          <Row className="no-margin">

            {/* Viajes */}
            <Col xs="12" md="6" className="trps">
              <Trips
                total={stats.totals.trips}
                data={[{ name: 'Cancelados', value: stats.trips.canceled }, { name: 'Completados', value: stats.trips.completed }]} />
            </Col>

            {/* Paquetes */}
            <Col xs="12" md="6" className="section packages">
              <Packages
                total={stats.totals.products}
                data={stats.productData} />
            </Col>

          </Row>
          <Row className="no-margin">

            {/* Ganancias */}
            <Col xs="12" md="6" className="earnings">
              <Earnings
                total={stats.totals.earnings}
                data={stats.groupedData} />
            </Col>

            {/* Distancias */}
            <Col xs="12" md="6" className="section distances">
              <Distances
                total={stats.totals.distance}
                data={stats.groupedData} />
            </Col>

          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
