import { InfoCircleTwoTone } from '@ant-design/icons';
import { Button, Card, InputNumber, Tooltip, Typography, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { getAvailableBalance } from '../apis/walltet';
import { INR } from '../constants/constants';

const { Title, Text } = Typography;
const { Meta } = Card;
const Wallet = (props) => {
  const [loading, setLoading] = useState(true);
  const [balance, SetBalance] = useState(0);

  const loadWalletBalance = () => {
    getAvailableBalance().then(response => {
      SetBalance(response.balance);
      setLoading(false);
    }).catch(error => {
      if (error.status === 500) {
        notification.error({
          message: 'iStocks',
          description: 'Unable to fetch wallet balance right now. Please try again!'
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
    loadWalletBalance();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <Card
        title={
          <>
            <Title level={3}>{INR + balance}</Title>
            <Text type="secondary">Available Balance</Text>
          </>
        }
        description="Available Balance"
        style={{ width: 400 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Text> {`Enter Amount `}
            <Tooltip title="Currently you cannot add money to wallet.">
              <InfoCircleTwoTone />
            </Tooltip>
          </Text>
          <InputNumber
            formatter={value => `${INR} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            min={1}
            max={5000}
            defaultValue={1}
            style={{ width: '35%', margin: '10px' }} />
          <Button type="primary" block disabled>Add Money</Button>
        </div>
      </Card>
    </div>
  );
};

export default Wallet;
