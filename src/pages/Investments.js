import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Typography, notification, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { getHoldings } from '../apis/holdings';
import CustomLayout from '../components/CustomLayout';
import InvestmentCharts from '../components/InvestmentsCharts';
import InvestmentsList from '../components/InvestmentsList';
import { INR } from '../constants/constants';
import { roundToTwoDigits } from '../utils/utils';
const { Title } = Typography;
const { TabPane } = Tabs;
const Investments = (props) => {
  const [loading, setLoading] = useState(true);
  const [holdings, setHoldings] = useState([]);
  const [totalReturns, setTotalReturns] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [investedValue, setInvestedValue] = useState(0);

  const loadAllHoldings = () => {
    getHoldings().then(response => {
      const { totalReturns, currentAmount, totalInvestedAmount } = response.reduce((a, b) => {
        return {
          totalReturns: a.totalReturns + b.totalReturns,
          currentAmount: a.currentAmount + b.currentAmount,
          totalInvestedAmount: a.totalInvestedAmount + b.totalInvestedAmount
        }
      }, { totalReturns: 0, currentAmount: 0, totalInvestedAmount: 0 });

      setHoldings(response);
      setTotalReturns(totalReturns);
      setCurrentValue(currentAmount);
      setInvestedValue(totalInvestedAmount);
      setLoading(false);
    }).catch(error => {
      if (error.status === 500) {
        notification.error({
          message: 'iStocks',
          description: 'Unable to fetch holdings.'
        });
      } else {
        notification.error({
          message: 'iStocks',
          description: error.message || 'Sorry! Something went wrong. Please try again!'
        });
      }
      setLoading(false);
    });
  }

  useEffect(() => {
    loadAllHoldings();
  }, []);

  const color = totalReturns < 0 ? '#cf1322' : '#3f8600';
  const prefix = totalReturns < 0 ? <ArrowDownOutlined /> : <ArrowUpOutlined />;

  return (
    <CustomLayout>
      <div style={{ marginRight: '12.5%', marginLeft: '12.5%', marginTop: '10px' }}>
        <Title level={4}>Your Holdings</Title>
        <Tabs defaultActiveKey="1" size="large">
          <TabPane tab="Table" key="1">
            <div style={{ marginRight: '12.5%', marginLeft: '12.5%', marginTop: '10px', padding: 10, background: '#ececec' }}>
              <Row >
                <Col span={8}>
                  <Card size='small' hoverable loading={loading}>
                    <Statistic title="Total Returns" valueStyle={{ color: color }}
                      value={roundToTwoDigits(totalReturns)} prefix={<>{prefix} {INR}</>} />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card size='small' hoverable loading={loading}>
                    <Statistic title="Current Value" value={roundToTwoDigits(currentValue)} prefix={INR} />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card size='small' hoverable loading={loading}>
                    <Statistic title="Invested Value" value={roundToTwoDigits(investedValue)} prefix={INR} />
                  </Card>
                </Col>
              </Row>
            </div>
            <InvestmentsList holdings={holdings} loading={loading}></InvestmentsList>
          </TabPane>
          <TabPane tab="Charts" key="2">
            <InvestmentCharts data={holdings}></InvestmentCharts>
          </TabPane>
        </Tabs>
      </div>
    </CustomLayout>
  );
};

export default Investments;
