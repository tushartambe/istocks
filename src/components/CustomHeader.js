import { StockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const { Title } = Typography;
const { Search } = Input;

const CustomHeader = (props) => {
  const onSearch = value => console.log(value);

  return (
    <div style={{ padding: '5px', margin: "0 25%", display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '5px' }}>
        <Link to='/'>
          <Title level={3} style={{ color: '#52c41a' }} ><StockOutlined />Stocks Playground</Title>
        </Link>
      </div>
      <Search style={{ maxWidth: '400px' }} placeholder="input search text" onSearch={onSearch} enterButton />
      <Button type="primary" shape="circle" icon={<UserOutlined />} />
    </div>
  );
};

export default CustomHeader;
