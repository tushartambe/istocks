import React, { useState } from 'react';
import CustomLayout from '../components/CustomLayout';
import StockCardList from '../components/StockCardList';
import { Typography, Collapse, Empty } from 'antd';

const { Panel } = Collapse;
const { Title } = Typography;

const Favorites = (props) => {
  const [loading, setLoading] = useState(false);
  const stocks = [
    {
      name: 'Indian railway',
      symbol: 'IRCTC',
      currentPrice: 1489,
      previousClose: 1376
    },
    {
      name: 'Tata Motors',
      symbol: 'TATAMOTORS',
      currentPrice: 987,
      previousClose: 999
    }
  ];

  let favoritesList = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  if (stocks && stocks.length != 0) {
    favoritesList = <StockCardList stockList={stocks} loading={loading}></StockCardList>;
  }

  return (
    <CustomLayout>
      <Collapse defaultActiveKey={['1']} ghost>
        <Panel header={<Title type="success" level={4}>Your Favorites</Title>} showArrow={false} key="1">
          {stocks && stocks.length > 0 ?
            <StockCardList stockList={stocks} loading={loading}></StockCardList> :
            <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} description="Search and add some favorites." />}
        </Panel>
      </Collapse>
    </CustomLayout>
  );
};

export default Favorites;
