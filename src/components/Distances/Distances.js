import React from 'react';
import PropTypes from 'prop-types';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

const Distances = ({ total, data }) => {
  return (
    <div>
      <div><span className="section-title">Distancias</span></div>
      <div><span className="cifra">{Math.round(total)} KM</span></div>
      <div>
        <LineChart width={500} height={300} data={data}
          margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line type="monotone" dataKey="kms" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </div>
    </div>
  )
}

Distances.propTypes = {
  total: PropTypes.number,
  data: PropTypes.array,
};


export default Distances;