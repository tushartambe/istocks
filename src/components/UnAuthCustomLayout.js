import { StockOutlined } from '@ant-design/icons';
import { Input, Layout, Typography } from 'antd';
import React from 'react';
import { layoutStyle } from '../styles';
const { Title } = Typography;
const { Search } = Input;
const { Footer, Header, Content } = Layout;
const UnAuthCustomLayout = (props) => {
  return (
    <Layout style={layoutStyle}>

      <Header>
        <div style={{ display: 'flex', alignItems: 'center', paddingTop: '10px' }}>
          <Title level={3} style={{ color: '#52c41a' }} >iStocks<StockOutlined /></Title>
        </div>
      </Header>
      <Content style={{ margin: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>{props.children}</Content>
    </Layout>
  );
};

export default UnAuthCustomLayout;
