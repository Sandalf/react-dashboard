import React from 'react';
import PropTypes from 'prop-types';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

const Ganancias = ({ data }) => {
  return (
    <div className="section">
      <div><span className="section-title">Ganancias</span></div>
      <div><span className="cifra">$28,430.21 MXN</span></div>
      <div>
        <LineChart width={500} height={300} data={data}
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
  )
}

Ganancias.propTypes = {
  data: PropTypes.array,
};


export default Ganancias;