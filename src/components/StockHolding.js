import React, { Component, useEffect, useState } from 'react';
import { Avatar, Card, Skeleton, Typography, Statistic, Divider } from 'antd';
import { getHoldingsFor } from '../apis/holdings';
import { INR } from '../constants/constants';

const { Title } = Typography;
const StockHolding = (props) => {
  const [holding, setHolding] = useState({});
  const gridStyle = {
    width: '20%',
    textAlign: 'center',
  };

  const loadStockHolding = (symbol) => {
    getHoldingsFor(symbol).then(response => {
      setHolding(response);
    }).catch(error => {
      console.log(error);
    });
  }

  useEffect(() => {
    loadStockHolding(props.symbol);
  }, []);

  return holding?.totalQuantity ? <>
    < Divider orientation="left" > Your Holdings</ Divider >
    <Card style={{ display: 'flex', flexDirection: "column " }}>
      <Card.Grid style={gridStyle}>
        <Statistic
          title="Shares"
          value={holding.totalQuantity}
        />
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <Statistic
          title="Average Price"
          value={holding.averagePrice}
          prefix={INR}
        />
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <Statistic
          title="Current Amount"
          value={holding.currentAmount}
          prefix={INR}
        />
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <Statistic
          title="Invested Amount"
          value={holding.totalInvestedAmount}
          prefix={INR}
        />
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <Statistic
          title="Returns"
          value={holding.totalReturns}
          valueStyle={{ color: holding.totalReturns >= 0 ? '#3f8600' : '#cf1322' }}
          prefix={INR}
        />
      </Card.Grid>
    </Card>
  </>
    : null
};

export default StockHolding;
