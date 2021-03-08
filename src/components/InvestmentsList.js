import React, { Component } from 'react';
import { Badge, Card, Col, Row, Statistic, Table, Typography } from 'antd';
import { INR } from '../constants/constants';
import { roundToTwoDigits } from '../utils/utils';

const { Text } = Typography;

const InvestmentsList = (props) => {
  const dummyHoldings = [
    {
      companyName: "Tata Motors",
      symbol: 'TATAMOTORS',
      quantity: 24,
      averagePrice: 303.30,
      marketPrice: 321.25,
      totalReturns: 381,
      currentValue: 6746,
      investedValue: 6365
    },
    {
      companyName: "Bharati AIrtel",
      symbol: 'AIRTEL',
      quantity: 3,
      averagePrice: 542.67,
      marketPrice: 525.70,
      totalReturns: -51,
      currentValue: 1577,
      investedValue: 1628
    }
  ];

  const columns = [
    {
      title: "Company",
      dataIndex: "companyName",
      key: "companyName",
      sorter: (a, b) => { return a.companyName.localeCompare(b.companyName) },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <Text>{record.quantity} shares at {INR}{record.averagePrice}</Text>
      )
    },
    {
      title: "Market Price",
      dataIndex: "marketPrice",
      key: "marketPrice",
      sorter: {
        compare: (a, b) => a.marketPrice - b.marketPrice,
      }
    },
    {
      title: "Returns",
      dataIndex: "totalReturns",
      key: "totalReturns",
      sorter: {
        compare: (a, b) => a.totalReturns - b.totalReturns,
      },
      render: (text, record) => {
        const returnPercentage = (record.currentValue - record.investedValue) * 100 / record.investedValue;
        return (
          <>
            <Text strong>{INR}{record.totalReturns}</Text>
            <br />
            <Text>{roundToTwoDigits(returnPercentage)}%</Text>
          </>
        )
      }
    },
    {
      title: "Current",
      dataIndex: "currentValue",
      key: "currentValue",
      sorter: {
        compare: (a, b) => a.currentValue - b.currentValue,
      },
      render: (text, record) => (
        <>
          <Text strong>{INR}{record.currentValue}</Text>
          <br />
          <Text>{INR}{record.investedValue}</Text>
        </>
      )
    }
  ]

  return (
    <Table
      columns={columns}
      dataSource={dummyHoldings}
      pagination={false}
      rowKey="companyName"
    />
  );
};

export default InvestmentsList;
