import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';

const Resumen = ({ viajes, ganancias, distancia, articulos, puntaje }) => {
  return (
    <Row className="resumen section no-margin">
      <Col>
        <div className="resumen-item">
          <p className="cifra">{viajes}</p>
          <span>Viajes</span>
        </div>
      </Col>
      <Col>
        <div className="resumen-item">
          <p className="cifra">${ganancias}</p>
          <span>Ganancias</span>
        </div>
      </Col>
      <Col>
        <div className="resumen-item">
          <p className="cifra">{distancia/1000}K</p>
          <span>Kms</span>
        </div>
      </Col>
      <Col>
        <div className="resumen-item">
          <p className="cifra">{articulos}</p>
          <span>Articulos</span>
        </div>
      </Col>
      <Col>
        <div className="resumen-item">
          <p className="cifra">{puntaje}/10</p>
          <span>Puntaje</span>
        </div>
      </Col>
    </Row>
  );
}

Resumen.propTypes = {
  viajes: PropTypes.number,
  ganancias: PropTypes.number,
  distancia: PropTypes.number,
  articulos: PropTypes.number,
  puntaje: PropTypes.number,
};

export default Resumen;