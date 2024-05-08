import React from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Space, Switch, Divider } from 'antd';

const SwitchesDemo: React.FC = () => (
  <Space>
    <Switch
      checkedChildren="Active"
      unCheckedChildren="Inactive"
      defaultChecked
    />
    <Switch checkedChildren="On" unCheckedChildren="Off" />
    <Switch
      checkedChildren={<CheckOutlined />}
      unCheckedChildren={<CloseOutlined />}
      defaultChecked
    />
    <Divider type="vertical" />
    Sizes:
    <Switch defaultChecked />
    <Switch size="small" defaultChecked />
  </Space>
);

export default SwitchesDemo;
