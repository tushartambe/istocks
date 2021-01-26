import React, { Component } from 'react';
import { Typography, Space } from 'antd';

const { Text, Link } = Typography;

const CustomPropertyText = (props) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: 5 }}>
      <Text>{props.name}</Text>
      <Text strong>{props.prefix}{props.value}</Text>
    </div>
  );
};

export default CustomPropertyText;
