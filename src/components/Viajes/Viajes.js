import React from 'react';
import PropTypes from 'prop-types';
import { Pie, PieChart, Tooltip } from 'recharts';

const Viajes = ({ data }) => {
  return (
    <div className="section">
      <div><span className="section-title">Viajes</span></div>
      <div><span className="cifra">633 viajes realizados</span></div>
      <div className="graph-container">
        <PieChart width={160} height={160}>
          <Pie data={data} cx={75} cy={75} innerRadius={40} outerRadius={80} fill="#0065ff" />
          <Tooltip />
        </PieChart>
      </div>
    </div>
  )
}

Viajes.propTypes = {
  data: PropTypes.array,
};


export default Viajes;