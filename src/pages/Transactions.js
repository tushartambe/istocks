import React, { Component } from 'react';
import CustomLayout from '../components/CustomLayout';
import TransactionList from '../components/TransactionList';
import Wallet from '../components/Wallet';

const Transactions = (props) => {
  return (
    <CustomLayout>
      <div style={{ marginRight: '12.5%', marginLeft: '12.5%', marginTop: '10px' }}>
        <Wallet></Wallet>
        <TransactionList></TransactionList>
      </div>
    </CustomLayout>
  );
};

export default Transactions;
