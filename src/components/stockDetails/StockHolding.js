import { Card, Divider, Statistic } from 'antd';
import React, { useEffect, useState } from 'react';
import { getHoldingsFor } from '../../apis/holdings';
import { INR } from '../../constants/constants';
import { getColorValueFor } from '../../utils/utils';

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
          precision={2}
          value={holding.averagePrice}
          prefix={INR}
        />
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <Statistic
          title="Current Amount"
          precision={2}
          value={holding.currentAmount}
          valueStyle={{ color: getColorValueFor(holding.totalReturns) }}
          prefix={INR}
        />
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <Statistic
          title="Invested Amount"
          precision={2}
          value={holding.totalInvestedAmount}
          prefix={INR}
        />
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <Statistic
          title="Returns"
          precision={2}
          value={holding.totalReturns}
          valueStyle={{ color: getColorValueFor(holding.totalReturns) }}
          prefix={INR}
        />
      </Card.Grid>
    </Card>
  </>
    : null
};

export default StockHolding;
