import {
  BookOutlined,
  FileDoneOutlined,
  HeartOutlined,
  LogoutOutlined,
  UserOutlined,
  WalletOutlined
} from '@ant-design/icons';
import { Button, Dropdown, Menu, notification } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { JWT_TOKEN } from '../utils/APIUtils';


const ProfileActions = (props) => {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem(JWT_TOKEN);

    history.push("/login");

    notification.success({
      message: 'iStocks',
      description: "You've successfully logged out.",
    });
  }
  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<WalletOutlined />} onClick={() => history.push("/transactions")}>
        Wallet
    </Menu.Item>
      <Menu.Item key="2" icon={<FileDoneOutlined />} onClick={() => history.push("/transactions")}>
        Orders
    </Menu.Item>
      <Menu.Item key="3" icon={<BookOutlined />} onClick={() => history.push("/my-investments")}>
        Investments
    </Menu.Item>
      <Menu.Item key="4" icon={<HeartOutlined />} onClick={() => history.push("/favorites")}>
        Favorites
    </Menu.Item>
      <Menu.Item key="5" icon={<LogoutOutlined />} onClick={logout}>
        Log Out
    </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} arrow>
      <Button type="primary" shape="circle" icon={<UserOutlined />} />
    </Dropdown >
  );
};

export default ProfileActions;
