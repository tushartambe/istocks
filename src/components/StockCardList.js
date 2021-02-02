import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Card, Col, Row } from 'antd';
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
                name={stock.name}
                symbol={stock.symbol}
                currentPrice={stock.currentPrice}
                previousClose={stock.previousClose}
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
