import React from 'react';
import {
  Card,
  Alert,
  Space,
  Button,
  theme,
  Divider,
  Flex,
} from 'antd';
import { FileOutlined } from '@ant-design/icons';

const NameThisComponent: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <Card hoverable bordered={false} title="Card Item">
      <Flex
        gap={token.sizeXXL}
        wrap="wrap"
        justify="space-between"
        align="center"
      >
       <div> 
        Text
       </div>
        <Button size="large" icon={<FileOutlined />} type="primary">
          Button
        </Button>
      </Flex>
    </Card>
  );
};

export default NameThisComponent;
