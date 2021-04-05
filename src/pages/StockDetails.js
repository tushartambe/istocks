import { Avatar, Button, Card, Col, InputNumber, notification, Row, Slider, Space, Tabs, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { getQuote } from '../apis/market-data';
import { placeOrder } from '../apis/orders';
import BuySellConfirmModal from '../components/BuySellConfirmModal';
import CustomLayout from '../components/CustomLayout';
import CustomPropertyText from '../components/CustomPropertyText';
import FavoritesButton from '../components/FavoritesButton';
import allStocks from '../constants/allStocks';
import { INR, NSE_QUOTE_URL, OrderType } from "../constants/constants";
import { getAvatarText } from '../utils/utils';
import './StockDetails.css';

const { Title, Link, Text } = Typography;
const { Meta } = Card;
const { TabPane } = Tabs;
const StockDetails = (props) => {
  const symbol = props.match.params.symbol;

  const [loading, setLoading] = useState(true);
  const [stockInfo, setStockInfo] = useState();
  const [buySharesQuantity, setBuySharesQuantity] = useState(1);
  const [sellSharesQuantity, setSellSharesQuantity] = useState(1);

  const loadStockDetails = () => {
    getQuote(symbol).then(response => {
      const data = response.data[0];
      setStockInfo({
        name: data.companyName,
        symbol: data.symbol,
        currentPrice: Number(data.lastPrice.replace(/\,/g, '')),
        openPrice: Number(data.open.replace(/\,/g, '')),
        previousClose: Number(data.previousClose.replace(/\,/g, '')),
        dayLow: Number(data.dayLow.replace(/\,/g, '')),
        dayHigh: Number(data.dayHigh.replace(/\,/g, '')),
        yearLow: Number(data.low52.replace(/\,/g, '')),
        yearHigh: Number(data.high52.replace(/\,/g, '')),
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

  const order = (orderRequest) => {
    placeOrder(orderRequest).then(response => {
      console.log("ressssssss", response);
      notification.success({
        message: 'iStocks',
        description: 'Order Executed Successfully!'
      });
    }).catch(error => {
      console.log("errprrr------", error);
      if (error.status === 400) {
        notification.error({
          message: 'iStocks',
          description: error.message
        });
      } else {
        notification.error({
          message: 'iStocks',
          description: error.message || 'Sorry! Something went wrong. Please try again!'
        });
      }
    });
  }

  const confirmBuyOrder = () => {
    const orderRequest = {
      amount: buySharesQuantity * stockInfo.currentPrice,
      orderType: OrderType.BUY,
      companySymbol: stockInfo.symbol,
      companyName: stockInfo.name,
      currentSharePrice: stockInfo.currentPrice,
      shareQuantity: buySharesQuantity,
    };

    BuySellConfirmModal({
      content: "You're buying " + buySharesQuantity + " Shares of " + stockInfo.name + " at " + stockInfo.currentPrice + ". Total Price : " + (buySharesQuantity * stockInfo.currentPrice),
      onOk: order.bind(null, orderRequest)
    });
  }

  const confirmSellOrder = () => {
    const orderRequest = {
      amount: sellSharesQuantity * stockInfo.currentPrice,
      orderType: OrderType.SELL,
      companySymbol: stockInfo.symbol,
      companyName: stockInfo.name,
      currentSharePrice: stockInfo.currentPrice,
      shareQuantity: sellSharesQuantity,
    };

    BuySellConfirmModal({
      content: "You're Selling " + buySharesQuantity + " Shares of " + stockInfo.name + " at " + stockInfo.currentPrice + ". Total Price : " + (sellSharesQuantity * stockInfo.currentPrice),
      onOk: order.bind(null, orderRequest)
    });
  }

  return (
    <CustomLayout>
      <div style={{ marginRight: '25%', marginLeft: '25%', marginTop: '10px' }}>
        <Card
          loading={loading}
          extra={
            <FavoritesButton name={stockInfo?.name} symbol={symbol}></FavoritesButton>
          }
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
          </Row>
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
                <InputNumber min={1} defaultValue={1} onChange={(value) => setBuySharesQuantity(value)} /> Shares @ {INR + stockInfo?.currentPrice}
                <Button type="primary" onClick={confirmBuyOrder}>Buy Now</Button>
              </Space>
            </TabPane>
            <TabPane
              tab={
                <Text type="danger">
                  Sell
                </Text>}
              key="2">
              <Space>
                <InputNumber min={1} defaultValue={1} onChange={(value) => setSellSharesQuantity(value)} /> Shares @ {INR + stockInfo?.currentPrice}
                <Button type="primary" danger onClick={confirmSellOrder}>Sell Now</Button>
              </Space>
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </CustomLayout>
  );
};


export default StockDetails;
