import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Space, Statistic, Typography } from 'antd';
import React from 'react';
import { getColorValueFor } from '../utils/utils';

const { Text } = Typography;

const IndexCard = (props) => {
  const color = getColorValueFor(props.dayChange);
  const prefix = props.dayChange > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />;

  return (
    <Card
      size='small'
      title={props.indexName}
      style={{ maxWidth: '400px', margin: 10 }}
      loading={props.loading}
      hoverable
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
                ({'+'.repeat(props.dayChange >= 0) + props.dayChange}{"%"})
              </Text>
            </Space>
          )
        }}
      />
    </Card>
  );
};

export default IndexCard;
