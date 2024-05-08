import React, { useState } from 'react';
import {
  EditOutlined,
  DeleteOutlined,
  SendOutlined,
  DownOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  StarOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';

const items: MenuProps['items'] = [
  // {
  //   icon: <SendOutlined />,
  //   label: 'Send',
  //   key: '1',
  // },
  {
    icon: <EditOutlined />,
    label: 'Edit',
    key: '2',
  },
  {
    icon: <ShareAltOutlined />,
    label: 'Share',
    key: '3',
  },
  {
    icon: <StarOutlined />,
    label: 'Bookmark',
    key: '4',
  },
  {
    icon: <DownloadOutlined />,
    label: 'Export',
    key: '5',
    children: [
      {
        key: '1-1',
        label: 'PDF',
      },
      {
        key: '1-2',
        label: 'Excel',
      },
      {
        key: '1-3',
        label: 'CSV',
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    label: 'Delete',
    key: '6',
    icon: <DeleteOutlined />,
    danger: true,
  },
];

const DropdownButtonDemo: React.FC = () => {
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
    }, 6000);
  };

  return (
    <Dropdown.Button
      // icon={<DownOutlined />}
      placement="bottomRight"
      type="primary"
      loading={loadings[0]}
      menu={{ items }}
      onClick={() => enterLoading(0)}
    >
      <SendOutlined />
      &nbsp;Send
    </Dropdown.Button>
  );
};

export default DropdownButtonDemo;
