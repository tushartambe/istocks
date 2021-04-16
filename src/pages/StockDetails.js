import { Avatar, Card, notification, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { getQuote } from '../apis/market-data';
import CustomLayout from '../components/CustomLayout';
import BuyOrSellStock from '../components/stockDetails/BuyOrSellStock';
import FavoritesButton from '../components/stockDetails/FavoritesButton';
import StockPerformance from '../components/stockDetails/StcokPerformance';
import StockHolding from '../components/stockDetails/StockHolding';
import allStocks from '../constants/allStocks';
import { INR, NSE_QUOTE_URL } from "../constants/constants";
import { getAvatarText, roundToTwoDigits } from '../utils/utils';
import './StockDetails.css';

const { Title, Link, Text } = Typography;
const { Meta } = Card;
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
  const dayChange = stockInfo?.currentPrice - stockInfo?.previousClose;

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
            description={<Title level={5}>{INR}{stockInfo?.currentPrice} (<Text style={{ color: dayChange >= 0 ? '#3f8600' : '#cf1322' }}>{roundToTwoDigits(dayChange)}</Text>) </Title>}
          />
          <br />
          <StockPerformance stockInfo={stockInfo}></StockPerformance>
          <Link href={NSE_QUOTE_URL + symbol} target="_blank">
            More Information..
          </Link>
          <BuyOrSellStock stockInfo={stockInfo}></BuyOrSellStock>
        </Card>
        <StockHolding symbol={symbol}></StockHolding>
      </div>
    </CustomLayout>
  );
};


export default StockDetails;
