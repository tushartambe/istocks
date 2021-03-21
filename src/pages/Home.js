import React, { useEffect, useState } from 'react';
import CustomLayout from '../components/CustomLayout';
import StockCardList from '../components/StockCardList';
import { Collapse, Typography, notification } from 'antd';
import IndexCard from '../components/IndexCard';
import { getGainers, getIndices, getLosers } from '../apis/market-data';
const { Panel } = Collapse;
const { Title } = Typography;

const Home = (props) => {
  const [indexLoading, setIndexLoading] = useState(true);
  const [gainersLoading, setGainersLoading] = useState(true);
  const [losersLoading, setLosersLoading] = useState(true);
  const [indexData, setIndexData] = useState(null);
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);

  const loadMarketData = () => {

    getIndices().then(response => {
      setIndexData(response.data[0]);
      setIndexLoading(false);
    }).catch(error => {
      if (error.status === 500) {
        notification.error({
          message: 'iStocks',
          description: 'Unable to fetch index value. Please try again!'
        });
      } else {
        notification.error({
          message: 'iStocks',
          description: error.message || 'Sorry! Something went wrong. Please try again!'
        });
      }
      setIndexLoading(false);
    });

    getGainers().then(response => {
      console.log("Gainers --------------", response.data);
      setTopGainers(response.data);
      setGainersLoading(false);
    }).catch(error => {
      if (error.status === 500) {
        notification.error({
          message: 'iStocks',
          description: 'Unable to top gainers right now. Please try again!'
        });
      } else {
        notification.error({
          message: 'iStocks',
          description: error.message || 'Sorry! Something went wrong. Please try again!'
        });
      }
      setGainersLoading(false);
    });

    getLosers().then(response => {
      console.log("losers --------------", response.data);
      setTopLosers(response.data);
      setLosersLoading(false);
    }).catch(error => {
      if (error.status === 500) {
        notification.error({
          message: 'iStocks',
          description: 'Unable to top losers right now. Please try again!'
        });
      } else {
        notification.error({
          message: 'iStocks',
          description: error.message || 'Sorry! Something went wrong. Please try again!'
        });
      }
      setLosersLoading(false);
    });
  }

  useEffect(() => {
    loadMarketData();
  }, []);

  return (
    <CustomLayout>
      <IndexCard
        indexName={indexData?.indexName}
        exchangeName={"NSE"}
        dayChange={indexData?.percChange}
        currentValue={indexData?.last}
        previousClose={indexData?.previousClose}
        loading={indexLoading} />
      <Collapse defaultActiveKey={['1', '2']} ghost>
        <Panel header={<Title type="success" level={4}>Top Gainers</Title>} showArrow={false} key="1">
          <StockCardList stockList={topGainers} loading={gainersLoading} />
        </Panel>
        <Panel header={<Title type="danger" level={4}>Top Losers</Title>} showArrow={false} key="2">
          <StockCardList stockList={topLosers} loading={losersLoading} />
        </Panel>
      </Collapse>
    </CustomLayout>
  );
};

export default Home;
