import { Col, Row } from 'antd';
import React from 'react';
import StockCard from './StockCard';


const StockCardList = (props) => {
  let stockList = props.stockList;
  const dummySkeletons = new Array(5).fill({});;

  if (props.loading) {
    stockList = dummySkeletons;
  }

  return (
    <Row >
      {
        stockList.map((stock, index) => {
          return (
            <Col key={index}>
              <StockCard
                name={stock.name || stock.symbol}
                symbol={stock.symbol}
                currentPrice={stock.ltp}
                dayChange={stock.netPrice}
                dayChangeSuffix={"%"}
                loading={props.loading}
              />
            </Col>
          )
        })
      }
    </Row>
  );
};

export default StockCardList;
