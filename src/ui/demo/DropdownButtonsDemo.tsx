import React, { useState } from 'react';
import { DownOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import DropdownButtonDemo from './DropdownButtonDemo';

const items: MenuProps['items'] = [
  {
    icon: <SaveOutlined />,
    label: 'Save as Draft',
    key: '1',
  },
  {
    icon: <SaveOutlined />,
    label: 'Save and Publish',
    key: '2',
  },
  {
    type: 'divider',
  },
  {
    label: 'Discard',
    key: '3',
    icon: <DeleteOutlined />,
    danger: true,
  },
];

const disabledItemKeys = ['2', '3']; // Keys of the items you want to disable

// Modify the items array to disable specific items
const modifiedItems = items.map((item) => ({
  ...item,
  disabled: disabledItemKeys.includes(item.key),
}));

const DropdownButtonsDemo: React.FC = () => {
  const [loadings, setLoadings] = useState<boolean[]>([]);

  const enterLoading = (index: number) => {
    setLoadings((state) => {
      const newLoadings = [...state];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((state) => {
        const newLoadings = [...state];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 3000);
  };

  return (
    <Space>
      <DropdownButtonDemo />

      <Dropdown.Button
        icon={<DownOutlined />}
        type="primary"
        loading={loadings[0]}
        menu={{ items }}
        onClick={() => enterLoading(0)}
      >
        Save
      </Dropdown.Button>

      {/* set menu items disabled for this dropdown only */}
      <Dropdown.Button
        type="primary"
        icon={<DownOutlined />}
        loading
        menu={{ items: modifiedItems }}
      >
        Saving
      </Dropdown.Button>

      <Dropdown.Button
        icon={<DownOutlined />}
        loading={loadings[1]}
        menu={{ items }}
        onClick={() => enterLoading(1)}
      >
        Save
      </Dropdown.Button>
    </Space>
  );
};

export default DropdownButtonsDemo;
