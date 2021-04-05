import { Divider } from 'antd';
import React from 'react';
import BarChart from './charts/BarChart';
import PieChart from './charts/PieChart';

const InvestmentCharts = (props) => {
  return (
    <>

      <Divider orientation="left">Total Amount Invested</Divider>
      <PieChart data={props.data}></PieChart>

      <Divider orientation="left">Current vs Invested</Divider>
      <BarChart data={props.data}></BarChart>

    </>
  );
};

export default InvestmentCharts;
