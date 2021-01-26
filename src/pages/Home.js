import React, { useEffect, useState } from 'react';
import CustomLayout from '../components/CustomLayout';
import StockCard from '../components/StockCard';
import StockCardList from '../components/StockCardList';
import { Collapse, Typography } from 'antd';

const { Panel } = Collapse;
const { Title } = Typography;

const Home = (props) => {
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);

  const stocks = [
    {
      name: 'TCS',
      symbol: 'TCS',
      currentPrice: 205,
      previousClose: 200
    },
    {
      name: 'Mahindra and Mahindra',
      symbol: 'M&M',
      currentPrice: 2080,
      previousClose: 2040
    },
    {
      name: 'Reliance',
      symbol: 'RIL',
      currentPrice: 9008,
      previousClose: 8987
    },
    {
      name: 'Indian railway',
      symbol: 'IRCTC',
      currentPrice: 76,
      previousClose: 55
    },
    {
      name: 'Tata Motors',
      symbol: 'TATA',
      currentPrice: 987,
      previousClose: 720
    },
    {
      name: 'Pidilite',
      symbol: 'PD',
      currentPrice: 567,
      previousClose: 440
    },
  ]

  const stocks1 = [
    {
      name: 'Indian railway',
      symbol: 'IRCTC',
      currentPrice: 76,
      previousClose: 90
    },
    {
      name: 'Tata Motors',
      symbol: 'TATA',
      currentPrice: 987,
      previousClose: 999
    },
    {
      name: 'Pidilite',
      symbol: 'PD',
      currentPrice: 567,
      previousClose: 798
    },
    {
      name: 'TCS',
      symbol: 'TCS',
      currentPrice: 205,
      previousClose: 256
    },
    {
      name: 'Mahindra and Mahindra',
      symbol: 'M&M',
      currentPrice: 2080,
      previousClose: 2140
    },
    {
      name: 'Reliance',
      symbol: 'RIL',
      currentPrice: 9008,
      previousClose: 9187
    }
  ]
  return (
    <CustomLayout>
      <Collapse defaultActiveKey={['1', '2']} ghost>
        <Panel header={<Title type="success" level={4}>Top Gainers</Title>} showArrow={false} key="1">
          <StockCardList stockList={stocks}></StockCardList>
        </Panel>
        <Panel header={<Title type="danger" level={4}>Top Losers</Title>} showArrow={false} key="2">
          <StockCardList stockList={stocks1}></StockCardList>
        </Panel>
      </Collapse>
    </CustomLayout>
  );
};

export default Home;
