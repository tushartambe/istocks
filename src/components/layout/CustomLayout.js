import { Layout } from 'antd';
import React from 'react';
import { layoutStyle } from '../../styles';
import CustomFooter from './CustomFooter';
import CustomHeader from './CustomHeader';

const { Footer, Header, Content } = Layout;
const CustomLayout = (props) => {
  return (
    <Layout style={layoutStyle}>
      <Header>
        <CustomHeader></CustomHeader>
      </Header>
      <Content style={{ margin: 10 }}>{props.children}</Content>
      <Footer>
        <CustomFooter></CustomFooter>
      </Footer>
    </Layout>
  );
};

export default CustomLayout;
