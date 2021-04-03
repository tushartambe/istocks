import { Badge, Table, Tag, Typography } from 'antd';
import React from 'react';
import { OrderType } from '../constants/constants';

const { Title, Text } = Typography;
const OrdersList = (props) => {
  const { orders, loading } = props;

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: {
        compare: (a, b) => new Date(a.date) - new Date(b.date),
      },
      render: (text) => (
        <Text>{new Date(text).toLocaleString()}</Text>
      ),
    },
    {
      title: "Type",
      dataIndex: "orderType",
      key: "orderType",
      filters: [
        { text: "Buy", value: OrderType.BUY },
        { text: "Sell", value: OrderType.SELL },
      ],
      onFilter: (value, record) => record.orderType === value,
      render: (text) => (
        <Tag color={text === OrderType.SELL ? 'success' : 'error'} key={text}>
          {text.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Company",
      dataIndex: "companyName",
      key: "companyName",
      filters: orders.map(order => order.companyName).filter((value, index, self) => self.indexOf(value) === index).map(e => ({ text: e, value: e })),
      onFilter: (value, record) => record.companyName === value
    },
    {
      title: "Shares",
      dataIndex: "shareQuantity",
      key: "shareQuantity"
    },
    {
      title: "Share Price",
      dataIndex: "currentSharePrice",
      key: "currentSharePrice",
      render: (text, record) => (
        <Text type={record.orderType === OrderType.SELL ? 'success' : 'danger'}>
          {text.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
        </Text>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text, record) => (
        <Text>
          <Badge status={record.orderType === OrderType.SELL ? 'success' : 'error'} />
          {text.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
        </Text>
      ),
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={orders}
      pagination={{
        position: ['bottomRight']
      }}
      rowKey="orderId"
      size='large'
      bordered={false}
      loading={loading}
    />
  );
};

export default OrdersList;
