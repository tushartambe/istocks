import React, { useEffect, useState } from 'react';
import axios from "axios";
import CustomLayout from '../components/CustomLayout';
import StockCard from '../components/StockCard';
import StockCardList from '../components/StockCardList';
import { Collapse, Typography } from 'antd';
import IndexCard from '../components/IndexCard';

const { Panel } = Collapse;
const { Title } = Typography;

const Home = (props) => {
  const [loading, setLoading] = useState(true);
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
      symbol: 'RELIANCE',
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
      symbol: 'TATAMOTORS',
      currentPrice: 987,
      previousClose: 720
    },
    {
      name: 'Pidilite',
      symbol: 'PIDILITIND',
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
      symbol: 'TATAMOTORS',
      currentPrice: 987,
      previousClose: 999
    },
    {
      name: 'Pidilite',
      symbol: 'PIDILITIND',
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
      symbol: 'RELIANCE',
      currentPrice: 9008,
      previousClose: 9187
    }
  ]

  setTimeout(function () { setLoading(false); }, 3000);

  // useEffect(() => {
  //   axios.get('http://localhost:3000/nse/get_gainers')
  //     .then(res => {
  //       const quotes = res.data.data;
  //       quotes.map(q => {
  //         axios.get('http://localhost:3000/nse/get_quote_info?companyName=' + q.symbol)
  //           .then(res => {
  //             const quote = res.data.data[0];
  //             setTopGainers(state => {
  //               return [...state, {
  //                 symbol: quote.symbol,
  //                 name: quote.companyName,
  //                 dayHigh: quote.dayHigh,
  //                 dayLow: quote.dayLow,
  //                 previousClose: quote.previousClose,
  //                 currentPrice: quote.closePrice,
  //                 yearLow: quote.low52,
  //                 yearHigh: quote.high52,
  //                 openPrice: quote.open
  //               }]
  //             })
  //           })
  //       })
  //     })

  //   axios.get('http://localhost:3000/nse/get_losers')
  //     .then(res => {
  //       const quotes = res.data.data;
  //       quotes.map(q => {
  //         axios.get('http://localhost:3000/nse/get_quote_info?companyName=' + q.symbol)
  //           .then(res => {
  //             const quote = res.data.data[0];
  //             setTopLosers(state => {
  //               return [...state, {
  //                 symbol: quote.symbol,
  //                 name: quote.companyName,
  //                 dayHigh: quote.dayHigh,
  //                 dayLow: quote.dayLow,
  //                 previousClose: quote.previousClose,
  //                 currentPrice: quote.closePrice,
  //                 yearLow: quote.low52,
  //                 yearHigh: quote.high52,
  //                 openPrice: quote.open
  //               }]
  //             })
  //           })
  //       })
  //     })
  // }, []);

  return (
    <CustomLayout>
      <IndexCard
        indexName={"NIFTY"}
        exchangeName={"NSE"}
        currentValue={13000.90}
        previousClose={13100.11}
      >
      </IndexCard>
      <Collapse defaultActiveKey={['1', '2']} ghost>
        <Panel header={<Title type="success" level={4}>Top Gainers</Title>} showArrow={false} key="1">
          <StockCardList stockList={stocks} loading={loading}></StockCardList>
        </Panel>
        <Panel header={<Title type="danger" level={4}>Top Losers</Title>} showArrow={false} key="2">
          <StockCardList stockList={stocks1} loading={loading}></StockCardList>
        </Panel>
      </Collapse>
    </CustomLayout>
  );
};

export default Home;
