import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';

const Resumen = ({ trips, earnings, distance, products, score }) => {
  return (
    <Row className="resumen section no-margin">
      <Col>
        <div className="resumen-item">
          <p className="cifra">{trips}</p>
          <span>Viajes</span>
        </div>
      </Col>
      <Col>
        <div className="resumen-item">
          <p className="cifra">${earnings}</p>
          <span>Ganancias</span>
        </div>
      </Col>
      <Col>
        <div className="resumen-item">
          <p className="cifra">{distance}</p>
          <span>Kms</span>
        </div>
      </Col>
      <Col>
        <div className="resumen-item">
          <p className="cifra">{products}</p>
          <span>Articulos</span>
        </div>
      </Col>
      <Col>
        <div className="resumen-item">
          <p className="cifra">{score}/10</p>
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