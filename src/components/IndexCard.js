import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Space, Statistic, Typography } from 'antd';
import React from 'react';
import { roundToTwoDigits } from '../utils/utils';

const { Text } = Typography;

const IndexCard = (props) => {
  const dayChange = roundToTwoDigits(props.currentValue - props.previousClose);
  const color = dayChange > 0 ? '#3f8600' : '#cf1322';
  const prefix = dayChange > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
  return (
    <Card
      size='small'
      title={props.indexName}
      hoverable
      style={{ maxWidth: '400px', margin: 10 }}
    >
      <Statistic
        title={props.exchangeName}
        value={props.currentValue}
        valueStyle={{ color: color }}
        precision={2}
        prefix={prefix}
        formatter={(value) => {
          return (
            <Space>
              <Text style={{ color: color }}>
                {value}
              </Text>
              <Text style={{ fontSize: '15px', color: color }}>
                {'+'.repeat(dayChange >= 0) + dayChange}
              </Text>
            </Space>
          )
        }}
      />
    </Card>
  );
};

export default IndexCard;
