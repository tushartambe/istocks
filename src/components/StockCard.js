import { Avatar, Card, Skeleton, Typography } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';
import { INR } from "../constants/constants";
import { getAvatarText } from '../utils/utils';
import allStocks from "../constants/allStocks";
const { Text } = Typography;
const { Meta } = Card;

const StockCard = (props) => {
  const history = useHistory();
  const textType = props.dayChange > 0 ? 'success' : 'danger';
  const stock = allStocks.find(element => element.value === props.symbol);

  return (
    <Card
      size='small'
      bordered={true}
      style={{ width: 200, margin: 5 }}
      onClick={() => {
        let symbol = unescape(props.symbol);
        history.push(`/stocks/${encodeURIComponent(symbol)}`)
      }}
      hoverable
    >
      <Skeleton loading={props.loading} avatar active>
        <Meta
          avatar={<Avatar style={{ background: stock?.background, verticalAlign: 'middle' }} size="large" gap={4}>{getAvatarText(props.name)}</Avatar>}
          title={props.name}
          description={props.symbol}
        />
        <Text>{INR + props.currentPrice}</Text>
        <br />
        <Text type={textType}>{'+'.repeat(props.dayChange >= 0) + props.dayChange}{props.dayChangeSuffix}</Text>
      </Skeleton>
    </Card >
  );
};

export default StockCard;
