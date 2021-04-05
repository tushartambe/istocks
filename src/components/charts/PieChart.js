import { Pie } from '@ant-design/charts';
import React from 'react';

const PieChart = (props) => {

  let data = props.data.map(item => ({ type: item.symbol, value: item.totalInvestedAmount }))

  var config = config = {
    appendPadding: 10,
    data: data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
  };

  return <Pie {...config} />;
};

export default PieChart;