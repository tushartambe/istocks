import { Table, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { INR } from '../constants/constants';
import { getColorValueFor, roundToTwoDigits } from '../utils/utils';

const { Text } = Typography;

const InvestmentsList = (props) => {
  const columns = [
    {
      title: "Company",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => { return a.name.localeCompare(b.name) },
      render: (text, record) => (
        <Link to={'/stocks/' + record.symbol}>{text}</Link>
      )
    },
    {
      title: "Quantity",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
      render: (text, record) => (
        <Text>{record.totalQuantity} shares at {INR}{record.averagePrice}</Text>
      )
    },
    {
      title: "Market Price",
      dataIndex: "marketPrice",
      key: "marketPrice",
      sorter: {
        compare: (a, b) => a.marketPrice - b.marketPrice,
      },
      render: (text, record) => (
        <Text>{INR}{record.marketPrice}</Text>
      )
    },
    {
      title: "Returns",
      dataIndex: "totalReturns",
      key: "totalReturns",
      sorter: {
        compare: (a, b) => a.totalReturns - b.totalReturns,
      },
      render: (text, record) => {
        const returnPercentage = (record.currentAmount - record.totalInvestedAmount) * 100 / record.totalInvestedAmount;
        return (
          <>
            <Text strong style={{ color: getColorValueFor(record.totalReturns) }}>{INR}{record.totalReturns}</Text>
            <br />
            <Text >{roundToTwoDigits(returnPercentage)}%</Text>
          </>
        )
      }
    },
    {
      title: "Current",
      dataIndex: "currentValue",
      key: "currentValue",
      sorter: {
        compare: (a, b) => a.currentAmount - b.currentAmount,
      },
      render: (text, record) => (
        <>
          <Text strong style={{ color: getColorValueFor(record.totalReturns) }}>{INR}{record.currentAmount}</Text>
          <br />
          <Text>{INR}{record.totalInvestedAmount}</Text>
        </>
      )
    }
  ]

  return (
    <Table
      loading={props.loading}
      columns={columns}
      dataSource={props.holdings}
      pagination={false}
      rowKey="companyName"
    />
  );
};

export default InvestmentsList;
