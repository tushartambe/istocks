import React, { Component, useState } from 'react';
import { Typography, Card, Avatar, Button, Row, Col } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, HeartOutlined } from '@ant-design/icons';
import CustomLayout from '../components/CustomLayout';
import { INR } from "../constants/constants";
import CustomPropertyText from '../components/CustomPropertyText';

const { Title, Link } = Typography;
const { Meta } = Card;
const StockDetails = (props) => {
  const symbol = props.match.params.symbol;
  // const [stockInfo, setStockInfo] = useState();
  const stockInfo = {
    name: "Tata Motors",
    currentPrice: 9807,
    openPrice: 9789,
    previousClose: 7788,
    dayLow: 9780,
    dayHigh: 9880,
    yearLow: 8890,
    yearHigh: 10200
  }

  return (
    <CustomLayout>
      <div style={{ marginRight: '25%', marginLeft: '25%', marginTop: '10px' }}>
        <Card
          style={{}}
          actions={[
            <Button type="primary" block>Buy</Button>,
            <Button type="primary" danger block>Sell</Button>,
            <HeartOutlined key="favorite" />
          ]}
        >
          <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={<Title level={4}>{stockInfo.name}</Title>}
            description={<Title level={5}>{INR}{stockInfo.currentPrice}</Title>}
          />
          <Row gutter={16} >
            <Col key="open-price" span={8}>
              <CustomPropertyText name="Open Price" value={stockInfo.openPrice} prefix={INR}></CustomPropertyText>
            </Col>
            <Col key="close-price" span={8}>
              <CustomPropertyText name="Previous Close" value={stockInfo.previousClose} prefix={INR}></CustomPropertyText>
            </Col>
            <Col key="day-low" span={8}>
              <CustomPropertyText name="Today's Low" value={stockInfo.dayLow} prefix={INR}></CustomPropertyText>
            </Col>
          </Row>
          <Row gutter={16} >
            <Col key="day-high" span={8}>
              <CustomPropertyText name="Today's High" value={stockInfo.dayHigh} prefix={INR}></CustomPropertyText>
            </Col>
            <Col key="52week-low" span={8}>
              <CustomPropertyText name="52 week Low" value={stockInfo.yearLow} prefix={INR}></CustomPropertyText>
            </Col>
            <Col key="52week-high" span={8}>
              <CustomPropertyText name="52 week high" value={stockInfo.yearHigh} prefix={INR}></CustomPropertyText>
            </Col>
          </Row>
          <Link href={`https://www.nseindia.com/get-quotes/equity?symbol=${symbol}`} target="_blank">
            More Information..
          </Link>
        </Card>
      </div>
    </CustomLayout>
  );
};

export default StockDetails;
