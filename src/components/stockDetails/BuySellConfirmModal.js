import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React from 'react';

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
