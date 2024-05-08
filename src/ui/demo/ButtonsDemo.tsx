import React, { useState } from 'react';
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Button, Divider, Flex, Radio, theme } from 'antd';
import type { ConfigProviderProps } from 'antd';

type SizeType = ConfigProviderProps['componentSize'];

const ButtonsDemo: React.FC = () => {
  const { token } = theme.useToken();

  const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
  return (
    <Flex vertical gap="large">
      <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
        <Radio.Button value="large">Large</Radio.Button>
        <Radio.Button value="default">Default</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group>
      <Flex gap="small" align="flex-start" vertical>
        <Flex gap="small" wrap="wrap">
          <Button type="primary" size={size}>
            Primary
          </Button>
          <Button size={size}>Default</Button>
          {/* <Button type="dashed" size={size}>
            Dashed
          </Button> */}
          <Button icon={<PlusCircleOutlined />} type="dashed" size={size}>
            Add
          </Button>
          <Button
            type="text"
            icon={<EditOutlined />}
            size={size}
            color={token.colorPrimary}
          >
            Edit
          </Button>
          <Button
            type="text"
            icon={<DeleteOutlined />}
            size={size}
            color={token.colorPrimary}
            danger
          >
            Delete
          </Button>
          <Button type="link" size={size} color={token.colorPrimary}>
            Link
          </Button>
        </Flex>
        {/* <Flex gap="small" wrap="wrap">
          <Button type="primary" icon={<DownloadOutlined />} size={size} />
          <Button
            type="primary"
            shape="circle"
            icon={<DownloadOutlined />}
            size={size}
          />
          <Button
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            size={size}
          />
          <Button
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            size={size}
          >
            Download
          </Button>
          <Button type="primary" icon={<DownloadOutlined />} size={size}>
            Download
          </Button>
        </Flex> */}
      </Flex>
    </Flex>
  );
};

export default ButtonsDemo;
