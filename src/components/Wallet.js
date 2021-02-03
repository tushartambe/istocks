import { Card, Tooltip, Space, Avatar, InputNumber, Button, Typography, Divider } from 'antd';
import React, { Component } from 'react';
import { INR } from '../constants/constants';
import { InfoCircleTwoTone } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Meta } = Card;
const Wallet = (props) => {
  const balance = props.balance || 500;
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
            <Tooltip title="Maximum Amount in wallet is 5000">
              <InfoCircleTwoTone />
            </Tooltip>
          </Text>
          <InputNumber
            formatter={value => `${INR} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            min={1}
            max={5000}
            defaultValue={100}
            style={{ width: '35%', margin: '10px' }} />
          <Button type="primary" block>Add Money</Button>
        </div>
      </Card>
    </div>
  );
};

export default Wallet;
