import React, { useEffect, useState } from 'react';
import CustomLayout from '../components/CustomLayout';
import StockCardList from '../components/StockCardList';
import { Typography, Collapse, Empty, notification } from 'antd';
import { getFavoriteStocks } from '../apis/favorites';

const { Panel } = Collapse;
const { Title } = Typography;

const Favorites = (props) => {
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const loadFavoriteStocks = () => {
    getFavoriteStocks().then(response => {
      console.log("favorites-------------------", response);
      let sanitizedData = response.map(stock => {
        let lastPrice = Number(stock.lastPrice.replace(/\,/g, ''));
        let previousClose = Number(stock.previousClose.replace(/\,/g, ''));
        return { ...stock, ltp: stock.lastPrice, netPrice: Math.round(lastPrice - previousClose) }
      });

      setFavorites(sanitizedData);
      setLoading(false);
    }).catch(error => {
      if (error.status === 500) {
        notification.error({
          message: 'iStocks',
          description: 'Unable to fetch favorite stocks right now. Please try again!'
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
    loadFavoriteStocks();
  }, []);

  return (
    <CustomLayout>
      <Collapse defaultActiveKey={['1']} ghost>
        <Panel header={<Title type="success" level={4}>Your Favorites</Title>} showArrow={false} key="1">
          {favorites && favorites.length > 0 ?
            <StockCardList stockList={favorites} loading={loading}></StockCardList> :
            <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} description="Search and add some favorites." />}
        </Panel>
      </Collapse>
    </CustomLayout>
  );
};

export default Favorites;
