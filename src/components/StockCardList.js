import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Card, Col, Row } from 'antd';
import StockCard from './StockCard';

const StockCardList = (props) => {

  return (
    <Row >
      {
        props.stockList.map((stock, index) => {
          return (
            <Col key={index}>
              <StockCard
                name={stock.name}
                symbol={stock.symbol}
                currentPrice={stock.currentPrice}
                previousClose={stock.previousClose}
              />
            </Col>
          )
        })
      }
    </Row>
  );
};

export default StockCardList;
