import { Badge, Card, Col, Row, Statistic, Table, Typography } from 'antd';
import React from 'react';
import { INR, TransactionType } from '../constants/constants';
import { RightOutlined, DownOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const TransactionList = (props) => {
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: {
        compare: (a, b) => new Date(a.date) - new Date(b.date),
      },
      render: (text, record) => (
        <Text>{new Date(text).toLocaleString()}</Text>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text, record) => (
        <Text type={record.transactionType === TransactionType.CREDIT ? 'success' : 'danger'}>
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
          <Badge status={record.transactionType === TransactionType.CREDIT ? 'success' : 'error'} />
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
        extra={<Text copyable>{record.orderResponse.orderId}</Text>}
      >
        <Row gutter={16} justify="center">
          <Col span={8}>
            <Statistic title="Company" value={record.orderResponse.companyName} valueStyle={{ fontSize: '15px' }} />
          </Col>
          <Col span={8}>
            <Statistic title="Price" value={record.orderResponse.currentSharePrice} prefix={INR} valueStyle={{ fontSize: '15px' }} />
          </Col>
          <Col span={8}>
            <Statistic title="Quantity" value={record.orderResponse.shareQuantity} valueStyle={{ fontSize: '15px' }} />
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
        dataSource={props.transactions}
        pagination={{
          position: ['none', 'bottomRight']
        }}
        expandable={{
          expandedRowRender: expandedRowRender,
          rowExpandable: record => record.orderResponse !== null,
          expandRowByClick: true,
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              <DownOutlined onClick={e => onExpand(record, e)} />
            ) : (
              <RightOutlined onClick={e => onExpand(record, e)} />
            )
        }}
        rowKey="transactionId"
        size='large'
        bordered={false}
        loading={props.loading}
      />
    </div>
  );
};

export default TransactionList;
