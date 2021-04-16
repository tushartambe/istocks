import { Button, InputNumber, notification, Space, Tabs, Typography } from 'antd';
import React, { useState } from 'react';
import { placeOrder } from '../../apis/orders';
import { INR, OrderType } from '../../constants/constants';
import BuySellConfirmModal from './BuySellConfirmModal';

const { Text } = Typography;
const { TabPane } = Tabs;
const BuyOrSellStock = (props) => {
  const { stockInfo } = props;
  const [buySharesQuantity, setBuySharesQuantity] = useState(1);
  const [sellSharesQuantity, setSellSharesQuantity] = useState(1);

  const order = (orderRequest) => {
    placeOrder(orderRequest).then(response => {
      notification.success({
        message: 'iStocks',
        description: 'Order Executed Successfully!'
      });
    }).catch(error => {
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
  );
};

export default BuyOrSellStock;
