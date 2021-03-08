import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Typography } from 'antd';
import React from 'react';
import CustomLayout from '../components/CustomLayout';
import InvestmentsList from '../components/InvestmentsList';
import { INR } from '../constants/constants';
const { Title } = Typography;
const Investments = (props) => {
  const returns = -6284;
  const color = returns > 0 ? '#3f8600' : '#cf1322';
  const prefix = returns > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />;

  return (
    <CustomLayout>
      <div style={{ marginRight: '12.5%', marginLeft: '12.5%', marginTop: '10px' }}>
        <Title level={4}>Your Holdings</Title>
        <div style={{ marginRight: '12.5%', marginLeft: '12.5%', marginTop: '10px', padding: 10, background: '#ececec' }}>
          <Row >
            <Col span={8}>
              <Card size='small' hoverable>
                <Statistic title="Total Returns" valueStyle={{ color: color }}
                  value={6284} prefix={<>{prefix} {INR}</>} />
              </Card>
            </Col>
            <Col span={8}>
              <Card size='small' hoverable>
                <Statistic title="Current Value" value={60405} prefix={INR} />
              </Card>
            </Col>
            <Col span={8}>
              <Card size='small' hoverable>
                <Statistic title="Invested Value" value={54121} prefix={INR} />
              </Card>
            </Col>
          </Row>
        </div>
        <InvestmentsList></InvestmentsList>
      </div>
    </CustomLayout>
  );
};

export default Investments;
