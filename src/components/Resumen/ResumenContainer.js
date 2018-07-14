import React, { Component } from 'react';
import Resumen from './Resumen';

class ResumenContainer extends Component {

  state = {
    viajes: 0,
    ganancias: 0,
    distancia: 0,
    articulos: 0,
    puntaje: 0,
  }

  componentDidMount() {
    console.log('this.props.viajes', this.props.viajes);
  }

  componentDidUpdate() {
    console.log('this.props.viajes', this.props.viajes);
    let ganancias = 0;
    let distancia = 0;
    let articulos = 0;
    let puntaje = 0;
    const { viajes } = this.props;
    for (const viaje in viajes) {
      ganancias += viaje.precio;
      distancia += viaje.distancia;
      //articulos += viaje.detallePaquete.length;
      puntaje += viaje.puntaje;
    }
    this.setState({ viajes: viajes.length, ganancias, distancia, articulos, puntaje: puntaje/viajes.length });
  }

  render() {
    const { viajes, ganancias, distancia, articulos, puntaje } = this.state;
    return (
      <Resumen 
        viajes={viajes} 
        ganancias={ganancias} 
        distancia={distancia}
        articulos={articulos}
        puntaje={puntaje}/>
    );
  }
}

export default ResumenContainer;