import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';

const Totals = ({ trips, earnings, distance, products, score }) => {
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
          <p className="cifra">{Math.round(distance)}</p>
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
          <p className="cifra">{Math.round(score)}/10</p>
          <span>Puntaje</span>
        </div>
      </Col>
    </Row>
  );
}

Totals.propTypes = {
  trips: PropTypes.number,
  earnings: PropTypes.number,
  distance: PropTypes.number,
  products: PropTypes.number,
  score: PropTypes.number,
};

export default Totals;