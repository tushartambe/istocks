import { Divider, notification, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { getTransactions } from '../apis/transactions';
import CustomLayout from '../components/layout/CustomLayout';
import TransactionList from '../components/TransactionList';
import Wallet from '../components/Wallet';

const Transactions = (props) => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  const loadAllTransactions = () => {
    getTransactions().then(response => {
      setTransactions(response);
      setLoading(false);
    }).catch(error => {
      if (error.status === 500) {
        notification.error({
          message: 'iStocks',
          description: 'Unable to fetch transactions.'
        });
      } else {
        notification.error({
          message: 'iStocks',
          description: error.message || 'Sorry! Something went wrong. Please try again!'
        });
      }
      setLoading(false);
    });
  }

  useEffect(() => {
    loadAllTransactions();
  }, []);

  return (
    <CustomLayout>
      <div style={{ marginRight: '12.5%', marginLeft: '12.5%', marginTop: '10px' }}>
        <Wallet></Wallet>
        <Divider></Divider>
        <TransactionList transactions={transactions} loading={loading}></TransactionList>
      </div>
    </CustomLayout>
  );
};

export default Transactions;
