import React from 'react';
import CustomHeader from './CustomHeader';
import { layoutStyle } from '../styles';
import CustomFooter from './CustomFooter';
import { Input, Layout, Typography } from 'antd';

const { Footer, Header, Content } = Layout;
const CustomLayout = (props) => {
  return (
    <div>
      <Layout style={layoutStyle}>
        <Header>
          <CustomHeader></CustomHeader>
        </Header>
        <Content>{props.children}</Content>
        <Footer>
          <CustomFooter></CustomFooter>
        </Footer>
      </Layout>
    </div>
  );
};

export default CustomLayout;
