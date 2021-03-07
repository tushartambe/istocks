import React, { Component } from 'react';
import { Badge, Card, Col, Row, Statistic, Table, Typography } from 'antd';

const InvestmentsList = (props) => {
  const columns = [
    {
      title: "Company",
      dataIndex: "companyName",
      key: "companyName"
    },
    {
      title: "Current Market Price",
      dataIndex: "currentPrice",
      key: "currentPrice"
    },
    {
      title: "Returns",
      dataIndex: "currentPrice",
      key: "currentPrice"
    }
  ]

  return (
    <div>
      sd
      {/* <Title level={4}>Transactions</Title> */}
      {/* <Table
        columns={ }
        dataSource={ }
        pagination={false}
        size='large'
      /> */}
    </div>
  );
};

export default InvestmentsList;
