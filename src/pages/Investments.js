import React, { Component } from 'react';
import CustomLayout from '../components/CustomLayout';
import InvestmentsList from '../components/InvestmentsList';

const Investments = (props) => {
  return (
    <CustomLayout>
      <InvestmentsList></InvestmentsList>
    </CustomLayout>
  );
};

export default Investments;
