import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import React from 'react';

const CustomFooter = (props) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Space>
        <a href={"https://github.com/tushartambe"} target="_blank">
          <Button type="primary" shape="circle" icon={<GithubOutlined />}></Button>
        </a>
        <Button type="primary" shape="circle" icon={<LinkedinOutlined />}></Button>
      </Space>
    </div>
  );
};

export default CustomFooter;
