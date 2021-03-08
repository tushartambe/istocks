import { Badge, Card, Col, Row, Statistic, Table, Typography } from 'antd';
import React from 'react';
import { INR } from '../constants/constants';

const { Title, Text } = Typography;
const TransactionList = (props) => {
  const dummyTransactions = [
    {
      transactionId: '1234567890',
      transactionType: 'add',
      transactionDate: new Date(),
      amount: 320,
      description: "Money Added",
      stockDetails: null
    },
    {
      transactionId: '1234567891',
      transactionType: 'withdraw',
      transactionDate: new Date(),
      amount: 580,
      description: "Paid for shares",
      stockDetails: {
        companyName: "Tata motors",
        companySymbol: 'TATA',
        sharePrice: 580,
        quantity: 1
      }
    }
  ]
  const columns = [
    {
      title: "Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
      sorter: {
        compare: (a, b) => a.transactionDate - b.transactionDate,
      },
      render: (text) => (
        <Text>{text.toLocaleString()}</Text>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text, record) => (
        <Text type={record.transactionType === 'add' ? 'success' : 'danger'}>
          {text.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
        </Text>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record) => (
        <Text>
          <Badge status={record.transactionType === 'add' ? 'success' : 'error'} />
          {text}
        </Text>
      ),
    }
  ];

  const expandedRowRender = (record) => {
    return (
      <Card
        title={<Text style={{ fontSize: '15px' }}>Stock Details</Text>}
        size="small"
        bordered={false}
        extra={<Text copyable>{record.transactionId}</Text>}
      >
        <Row gutter={16} justify="center">
          <Col span={8}>
            <Statistic title="Company" value={record.stockDetails.companyName} valueStyle={{ fontSize: '15px' }} />
          </Col>
          <Col span={8}>
            <Statistic title="Price" value={record.stockDetails.sharePrice} suffix={INR} valueStyle={{ fontSize: '15px' }} />
          </Col>
          <Col span={8}>
            <Statistic title="Quantity" value={record.stockDetails.quantity} valueStyle={{ fontSize: '15px' }} />
          </Col>
        </Row>
      </Card>
    );
  }

  return (
    <div>
      <Title level={4}>Transactions</Title>
      <Table
        columns={columns}
        dataSource={dummyTransactions}
        pagination={false}
        expandable={{
          expandedRowRender: expandedRowRender,
          rowExpandable: record => record.stockDetails !== null,
          expandRowByClick: true
        }}
        rowKey="transactionId"
        size='large'
      />
    </div>
  );
};

export default TransactionList;
