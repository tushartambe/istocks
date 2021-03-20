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
  const dayChange = props.currentPrice - props.previousClose;
  const textType = dayChange > 0 ? 'success' : 'danger';
  const stock = allStocks.find(element => element.value === props.symbol);

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
      <Skeleton loading={props.loading} avatar active>
        <Meta
          avatar={<Avatar style={{ background: stock?.background, verticalAlign: 'middle' }} size="large" gap={4}>{getAvatarText(props.name)}</Avatar>}
          title={props.name}
          description={props.symbol}
        />
        <Text>{INR + props.currentPrice}</Text>
        <br />
        <Text type={textType}>{'+'.repeat(dayChange >= 0) + dayChange}</Text>
      </Skeleton>
    </Card>
  );
};

export default StockCard;
