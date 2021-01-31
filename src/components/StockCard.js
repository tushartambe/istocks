import React, { Component } from 'react';
import { Card, Avatar, Typography } from 'antd';
import { INR } from "../constants/constants";
import { useHistory } from 'react-router';
import roundToTwo from '../utils/utils';
const { Text } = Typography;
const { Meta } = Card;

const StockCard = (props) => {
  const history = useHistory();
  const dayChange = props.currentPrice - props.previousClose;
  const textType = dayChange > 0 ? 'success' : 'danger';
  return (
    <Card
      size='small'
      bordered={true}
      hoverable
      style={{ width: 200, margin: 5 }}
      onClick={() =>
        history.push(`/stocks/${props.symbol}`)
      }
    >
      <Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={props.name}
        description={props.symbol}
      />
      <Text>{INR + props.currentPrice}</Text>
      <br />
      <Text type={textType}>{'+'.repeat(dayChange >= 0) + dayChange}</Text>
    </Card>
  );
};

export default StockCard;
