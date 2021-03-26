import React, { Component } from 'react';
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const BuySellConfirmModal = (props) => {
  return (
    Modal.confirm({
      title: 'Confirm Corder',
      icon: <ExclamationCircleOutlined />,
      content: props.content,
      okText: 'Confirm Order',
      okType: 'success',
      cancelText: 'Cancel',
      onOk: props.onOk,

    })
  );
};

export default BuySellConfirmModal;
