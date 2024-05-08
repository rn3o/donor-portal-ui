import React, { useState } from 'react';
import { TreeSelect, Flex, Typography } from 'antd';
import {
  FolderOutlined,
  ShareAltOutlined,
  UserOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';

const { Text, Link } = Typography;

const App: React.FC = () => {
  const [value, setValue] = useState<string>();

  const onChange = (newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <ProCard
      style={{
        height: '80vh',
        minHeight: 800,
      }}
    >
      <Flex vertical>
        <Text>Move List to </Text>
        <TreeSelect
          style={{ width: '100%' }}
          value={value}
          // defaultSelectedKeys={['0-0-3']}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeData={treeData}
          placeholder="Select Folder"
          // treeDefaultExpandAll
          onChange={onChange}
          treeIcon={true}
        />
        <Text style={{ fontSize: 10, opacity: 0.5, marginTop: 4 }}>
          Some folder may appear disabled, that's because the folder is shared
          but I don't have modify access or only have read only permission.
        </Text>
      </Flex>
      <div />
    </ProCard>
  );
};

export default App;

const treeData = [
  {
    title: 'Shared with me',
    value: '0-0',
    icon: <ShareAltOutlined />,
    children: [
      {
        title: 'Marketing',
        value: '0-0-0',
        isLeaf: true,
        icon: <FolderOutlined />,
      },
      {
        title: 'Donor Care',
        value: '0-0-1',
        isLeaf: false,
        icon: <FolderOutlined />,
        children: [
          {
            title: 'Tube Well',
            value: '0-0-1-0',
            isLeaf: false,
            icon: <FolderOutlined />,
            children: [
              {
                title: 'Overdue',
                value: '0-0-1-0-1',
                isLeaf: true,
                icon: <FolderOutlined />,
              },
              {
                title: 'Instructed',
                value: '0-0-1-0-2',
                isLeaf: false,
                icon: <FolderOutlined />,
                children: [
                  {
                    title: 'Pakistan',
                    value: '0-0-1-0-2-0',
                    isLeaf: true,
                    icon: <FolderOutlined />,
                  },
                  {
                    title: 'Yemen',
                    value: '0-0-1-0-2-1',
                    isLeaf: true,
                    icon: <FolderOutlined />,
                  },
                  {
                    title: 'Syria',
                    value: '0-0-1-0-2-3',
                    isLeaf: true,
                    icon: <FolderOutlined />,
                  },
                  {
                    title: 'Gaza',
                    value: '0-0-1-0-2-4',
                    isLeaf: true,
                    icon: <FolderOutlined />,
                  },
                ],
              },
            ],
          },
          {
            title: 'Aqiqa',
            value: '0-0-1-1',
            isLeaf: true,
            icon: <FolderOutlined />,
          },
          {
            title: 'School Building (Dev note: view only to me)',
            value: '0-0-1-2',
            isLeaf: true,
            disabled: true,
            icon: <FolderOutlined />,
          },
          {
            title: 'Water Cooler',
            value: '0-0-1-3',
            isLeaf: true,
            icon: <FolderOutlined />,
          },
          {
            title: 'Water Heater',
            value: '0-0-1-4',
            isLeaf: true,
            icon: <FolderOutlined />,
          },
        ],
      },
      // Dev note: Shared with me but view only to me, I cannot move list to this folder
      {
        title: 'HNWI (Dev note: view only to me)',
        value: '0-0-3',
        isLeaf: true,
        disabled: true,
        icon: <FolderOutlined />,
      },
      {
        title: 'Beneficiaries',
        value: '0-0-4',
        isLeaf: true,
        icon: <FolderOutlined />,
      },
    ],
  },

  {
    title: <b>My Lists</b>,
    value: '0-2',
    icon: <FolderOutlined />,
    children: [
      {
        title: 'Accounts',
        value: '0-2-0',
        isLeaf: true,
        icon: <FolderOutlined />,
      },
      {
        title: 'Feedbacks',
        value: '0-2-1',
        isLeaf: true,
        icon: <FolderOutlined />,
      },
    ],
  },
];
