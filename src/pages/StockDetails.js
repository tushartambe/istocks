import { HeartOutlined, FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Tooltip, Slider, InputNumber, Divider, Row, Tabs, Typography, Space, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { getQuote } from '../apis/market-data';
import CustomLayout from '../components/CustomLayout';
import CustomPropertyText from '../components/CustomPropertyText';
import allStocks from '../constants/allStocks';
import { INR, NSE_QUOTE_URL } from "../constants/constants";
import { getAvatarText } from '../utils/utils';
import './StockDetails.css';

const { Title, Link, Text } = Typography;
const { Meta } = Card;
const { TabPane } = Tabs;
const StockDetails = (props) => {
  const symbol = props.match.params.symbol;
  const [loading, setLoading] = useState(true);
  const [stockInfo, setStockInfo] = useState();

  const loadStockDetails = () => {
    getQuote(symbol).then(response => {
      const data = response.data[0];
      setStockInfo({
        name: data.companyName,
        symbol: data.symbol,
        currentPrice: data.lastPrice,
        openPrice: data.open,
        previousClose: data.previousClose,
        dayLow: data.dayLow,
        dayHigh: data.dayHigh,
        yearLow: data.low52,
        yearHigh: data.high52,
      });
      setLoading(false);
    }).catch(error => {
      if (error.status === 500) {
        notification.error({
          message: 'iStocks',
          description: 'Unable to stock details right now. Please try again!'
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
    loadStockDetails();
  }, []);


  const stock = allStocks.find(element => element.value === stockInfo?.symbol);

  const tipFormatter = (value) => {
    return (
      <div>
        {INR + stockInfo?.currentPrice}
      </div>
    )
  }

  return (
    <CustomLayout>
      <div style={{ marginRight: '25%', marginLeft: '25%', marginTop: '10px' }}>
        <Card
          loading={loading}
          extra={<Button style={{ borderStyle: 'none' }} shape='circle' icon={<HeartOutlined />}></Button>}
        >
          <Meta
            avatar={<Avatar style={{ background: stock?.background, verticalAlign: 'middle' }} size="large" gap={4}>{getAvatarText(stockInfo?.name)}</Avatar>}
            title={<Title level={4}>{stockInfo?.name}</Title>}
            description={<Title level={5}>{INR}{stockInfo?.currentPrice}</Title>}
          />
          <br />
          <Title level={5}>
            Performance
            </Title>
          <Row wrap={false} gutter={24, 48}>
            <Col flex="none">
              <div style={{}}>
                <CustomPropertyText name="Today's Low" value={stockInfo?.dayLow} prefix={INR}></CustomPropertyText>
              </div>
            </Col>
            <Col flex="auto" style={{ pointerEvents: 'none' }}>
              <Slider
                included={false}
                defaultValue={100 - ((stockInfo?.dayHigh - stockInfo?.currentPrice) / (stockInfo?.dayHigh - stockInfo?.dayLow)) * 100}
                tooltipVisible={true}
                tipFormatter={tipFormatter}
                handleStyle={{ borderColor: '#695AAF' }}
              />
            </Col>
            <Col flex="none">
              <div style={{}}>
                <CustomPropertyText name="Today's High" value={stockInfo?.dayHigh} prefix={INR}></CustomPropertyText>
              </div>
            </Col>
          </Row>
          <Row wrap={false} gutter={24, 48}>
            <Col flex="none">
              <div style={{}}>
                <CustomPropertyText name="52 week Low" value={stockInfo?.yearLow} prefix={INR}></CustomPropertyText>
              </div>
            </Col>
            <Col flex="auto" style={{ pointerEvents: 'none' }}>
              {console.log(100 - ((stockInfo?.yearHigh - stockInfo?.currentPrice) / (stockInfo?.yearHigh - stockInfo?.yearLow)) * 100)}
              <Slider
                included={false}
                defaultValue={100 - ((stockInfo?.yearHigh - stockInfo?.currentPrice) / (stockInfo?.yearHigh - stockInfo?.yearLow)) * 100}
                tooltipVisible={true}
                tipFormatter={tipFormatter}
                handleStyle={{ borderColor: '#695AAF' }}
              />
            </Col>
            <Col flex="none">
              <div style={{}}>
                <CustomPropertyText name="52 week high" value={stockInfo?.yearHigh} prefix={INR}></CustomPropertyText>
              </div>
            </Col>
          </Row>
          <Row gutter={24} justify="space-around" >
            <Col key="open-price" span={6}>
              <CustomPropertyText name="Open Price" value={stockInfo?.openPrice} prefix={INR}></CustomPropertyText>
            </Col>
            <Col key="close-price" span={6}>
              <CustomPropertyText name="Previous Close" value={stockInfo?.previousClose} prefix={INR}></CustomPropertyText>
            </Col>
            {/* <Col key="day-low" span={8}>
              <CustomPropertyText name="Today's Low" value={stockInfo.dayLow} prefix={INR}></CustomPropertyText>
            </Col> */}
          </Row>
          {/* <Row gutter={24} >
            <Col key="day-high" span={8}>
              <CustomPropertyText name="Today's High" value={stockInfo.dayHigh} prefix={INR}></CustomPropertyText>
            </Col>
            <Col key="52week-low" span={8}>
              <CustomPropertyText name="52 week Low" value={stockInfo.yearLow} prefix={INR}></CustomPropertyText>
            </Col>
            <Col key="52week-high" span={8}>
              <CustomPropertyText name="52 week high" value={stockInfo.yearHigh} prefix={INR}></CustomPropertyText>
            </Col>
          </Row> */}
          <Link href={NSE_QUOTE_URL + symbol} target="_blank">
            More Information..
          </Link>
          <Tabs defaultActiveKey="1" onChange={() => { }}>
            <TabPane
              tab={
                <Text type="success">
                  Buy
              </Text>}
              key="1">
              <Space>
                <InputNumber min={1} max={10} defaultValue={1} /> Shares @ {INR + stockInfo?.currentPrice}
                <Button type="primary">Buy Now</Button>
              </Space>
            </TabPane>
            <TabPane
              tab={
                <Text type="danger">
                  Sell
                </Text>}
              key="2">
              <Space>
                <InputNumber min={1} max={10} defaultValue={1} /> Shares @ {INR + stockInfo?.currentPrice}
                <Button type="primary" danger>Sell Now</Button>
              </Space>
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </CustomLayout>
  );
};


export default StockDetails;
