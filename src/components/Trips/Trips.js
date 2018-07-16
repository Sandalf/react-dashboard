import React from 'react';
import PropTypes from 'prop-types';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

const COLORS = ['#00C49F', '#0088FE'];

const Trips = ({ total, data }) => {
  return (
    <div className="section">
      <div><span className="section-title">Viajes</span></div>
      <div><span className="cifra">{total} viajes realizados</span></div>
      <div className="graph-container">
        <PieChart width={160} height={160}>
          <Pie
            data={data}
            cx={75}
            cy={75}
            innerRadius={40}
            outerRadius={80}
            fill="#0065ff" >
            {
              data.map((entry, index) => <Cell key={`trips-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  )
}

Trips.propTypes = {
  total: PropTypes.number,
  data: PropTypes.array,
};


export default Trips;