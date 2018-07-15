import React from 'react';
import PropTypes from 'prop-types';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

const Ganancias = ({ total, data }) => {
  return (
    <div className="section">
      <div><span className="section-title">Ganancias</span></div>
      <div><span className="cifra">${total} MXN</span></div>
      <div>
        <LineChart width={500} height={300} data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </div>
    </div>
  )
}

Ganancias.propTypes = {
  total: PropTypes.number,
  data: PropTypes.array,
};


export default Ganancias;