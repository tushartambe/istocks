import { Col, Row, Slider, Typography } from 'antd';
import React from 'react';
import { INR } from '../../constants/constants';
import CustomPropertyText from '../CustomPropertyText';

const { Title } = Typography;
const StockPerformance = (props) => {
  const { stockInfo } = props;

  const tipFormatter = (value) => {
    return (
      <div>
        {INR + stockInfo?.currentPrice}
      </div>
    )
  }

  return (
    <>
      <Title level={5}> Performance </Title>
      <Row wrap={false} gutter={24, 48}>
        <Col flex="none">
          <div style={{}}>
            <CustomPropertyText name="Today's Low" value={stockInfo?.dayLow} prefix={INR}></CustomPropertyText>
          </div>
        </Col>
        <Col flex="auto" style={{ pointerEvents: 'none' }}>
          <Slider
            included={false}
            defaultValue={100 - ((stockInfo?.dayHigh - stockInfo?.currentPrice) / (stockInfo?.dayHigh - stockInfo?.dayLow)) * 100}
            tooltipVisible={true}
            tipFormatter={tipFormatter}
            handleStyle={{ borderColor: '#695AAF' }}
          />
        </Col>
        <Col flex="none">
          <div style={{}}>
            <CustomPropertyText name="Today's High" value={stockInfo?.dayHigh} prefix={INR}></CustomPropertyText>
          </div>
        </Col>
      </Row>
      <Row wrap={false} gutter={24, 48}>
        <Col flex="none">
          <div style={{}}>
            <CustomPropertyText name="52 week Low" value={stockInfo?.yearLow} prefix={INR}></CustomPropertyText>
          </div>
        </Col>
        <Col flex="auto" style={{ pointerEvents: 'none' }}>
          <Slider
            included={false}
            defaultValue={100 - ((stockInfo?.yearHigh - stockInfo?.currentPrice) / (stockInfo?.yearHigh - stockInfo?.yearLow)) * 100}
            tooltipVisible={true}
            tipFormatter={tipFormatter}
            handleStyle={{ borderColor: '#695AAF' }}
          />
        </Col>
        <Col flex="none">
          <div style={{}}>
            <CustomPropertyText name="52 week high" value={stockInfo?.yearHigh} prefix={INR}></CustomPropertyText>
          </div>
        </Col>
      </Row>
      <Row gutter={24} justify="space-around" >
        <Col key="open-price" span={6}>
          <CustomPropertyText name="Open Price" value={stockInfo?.openPrice} prefix={INR}></CustomPropertyText>
        </Col>
        <Col key="close-price" span={6}>
          <CustomPropertyText name="Previous Close" value={stockInfo?.previousClose} prefix={INR}></CustomPropertyText>
        </Col>
      </Row>
    </>
  );
};

export default StockPerformance;
