import { Bar } from '@ant-design/charts';
import React from 'react';

const BarChart = (props) => {
  let data = [];
  props.data.forEach(item => {
    data.push({
      label: item.symbol,
      series: "InvestedAmount",
      value: item.totalInvestedAmount
    });
    data.push({
      label: item.symbol,
      series: "CurrentAmount",
      value: item.currentAmount
    });
  });

  var config = {
    data: data,
    isGroup: true,
    // isStack: true,
    xField: 'value',
    yField: 'label',
    seriesField: 'series',
    marginRatio: 0,
    legend: {
      layout: 'horizontal',
      position: 'bottom'
    },
    label: {
      position: 'middle',
      layout: [
        { type: 'interval-adjust-position' },
        { type: 'interval-hide-overlap' },
        { type: 'adjust-color' },
      ],
    },
  };

  return (
    <>
      <Bar {...config} />
    </>
  );
};

export default BarChart;