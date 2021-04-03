import { Divider, Typography, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { getOrders } from '../apis/orders';
import { getTransactions } from '../apis/transactions';
import CustomLayout from '../components/CustomLayout';
import OrdersList from '../components/OrdersList';
import TransactionList from '../components/TransactionList';
import Wallet from '../components/Wallet';

const { Title } = Typography;
const Orders = (props) => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const loadAllTransactions = () => {
    getOrders().then(response => {
      setOrders(response);
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
        <Title level={4}>Your Orders</Title>
        <Divider></Divider>
        <OrdersList orders={orders} loading={loading}></OrdersList>
      </div>
    </CustomLayout>
  );
};

export default Orders;
