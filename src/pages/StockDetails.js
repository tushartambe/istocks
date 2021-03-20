import { HeartOutlined, FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Tooltip, Slider, InputNumber, Divider, Row, Tabs, Typography, Space } from 'antd';
import React from 'react';
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
  // const [stockInfo, setStockInfo] = useState();
  const stockInfo = {
    name: "Tata Motors",
    symbol: "TATAMOTORS",
    currentPrice: 9807,
    openPrice: 9789,
    previousClose: 7788,
    dayLow: 9780,
    dayHigh: 9880,
    yearLow: 8890,
    yearHigh: 10200
  }

  const stock = allStocks.find(element => element.value === stockInfo.symbol);

  const tipFormatter = (value) => {
    return (
      <div>
        {INR + stockInfo.currentPrice}
      </div>
    )
  }

  return (
    <CustomLayout>
      <div style={{ marginRight: '25%', marginLeft: '25%', marginTop: '10px' }}>
        <Card
          extra={<Button style={{ borderStyle: 'none' }} shape='circle' icon={<HeartOutlined />}></Button>}
        >
          <Meta
            avatar={<Avatar style={{ background: stock?.background, verticalAlign: 'middle' }} size="large" gap={4}>{getAvatarText(stockInfo.name)}</Avatar>}
            title={<Title level={4}>{stockInfo.name}</Title>}
            description={<Title level={5}>{INR}{stockInfo.currentPrice}</Title>}
          />
          <br />
          <Title level={5}>
            Performance
            </Title>
          <Row wrap={false} gutter={24, 48}>
            <Col flex="none">
              <div style={{}}>
                <CustomPropertyText name="Today's Low" value={stockInfo.dayLow} prefix={INR}></CustomPropertyText>
              </div>
            </Col>
            <Col flex="auto" style={{ pointerEvents: 'none' }}>
              <Slider
                included={false}
                defaultValue={100 - ((stockInfo.dayHigh - stockInfo.currentPrice) / (stockInfo.dayHigh - stockInfo.dayLow)) * 100}
                tooltipVisible={true}
                tipFormatter={tipFormatter}
                handleStyle={{ borderColor: '#695AAF' }}
              />
            </Col>
            <Col flex="none">
              <div style={{}}>
                <CustomPropertyText name="Today's High" value={stockInfo.dayHigh} prefix={INR}></CustomPropertyText>
              </div>
            </Col>
          </Row>
          <Row wrap={false} gutter={24, 48}>
            <Col flex="none">
              <div style={{}}>
                <CustomPropertyText name="52 week Low" value={stockInfo.yearLow} prefix={INR}></CustomPropertyText>
              </div>
            </Col>
            <Col flex="auto" style={{ pointerEvents: 'none' }}>
              <Slider
                included={false}
                defaultValue={100 - ((stockInfo.yearHigh - stockInfo.currentPrice) / (stockInfo.yearHigh - stockInfo.yearLow)) * 100}
                tooltipVisible={true}
                tipFormatter={tipFormatter}
                handleStyle={{ borderColor: '#695AAF' }}
              />
            </Col>
            <Col flex="none">
              <div style={{}}>
                <CustomPropertyText name="52 week high" value={stockInfo.yearHigh} prefix={INR}></CustomPropertyText>
              </div>
            </Col>
          </Row>
          <Row gutter={24} justify="space-around" >
            <Col key="open-price" span={6}>
              <CustomPropertyText name="Open Price" value={stockInfo.openPrice} prefix={INR}></CustomPropertyText>
            </Col>
            <Col key="close-price" span={6}>
              <CustomPropertyText name="Previous Close" value={stockInfo.previousClose} prefix={INR}></CustomPropertyText>
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
                <InputNumber min={1} max={10} defaultValue={1} /> Shares @ {INR + stockInfo.currentPrice}
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
                <InputNumber min={1} max={10} defaultValue={1} /> Shares @ {INR + stockInfo.currentPrice}
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
