import { Avatar, Card, Skeleton, Typography } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';
import { INR } from "../constants/constants";
import { getAvatarText } from '../utils/utils';
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
      <Skeleton loading={props.loading} avatar active>
        <Meta
          avatar={<Avatar >{getAvatarText(props.name)}</Avatar>}
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
