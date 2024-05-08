import React from 'react';
import {
  UserOutlined,
  LoadingOutlined,
  SettingOutlined,
  FileAddOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Space } from 'antd';

const IconsDemo: React.FC = () => (
  <Space>
    <UserOutlined />
    <SettingOutlined />
    <FileAddOutlined />
    <SyncOutlined rotate={180} />
    <SyncOutlined spin />
    <LoadingOutlined />
  </Space>
);

export default IconsDemo;