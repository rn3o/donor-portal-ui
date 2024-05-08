import React from 'react';
import { Flex, Button, Result } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import CreateAccountDrawer from '../ui/CreateAccountDrawer';

const TestPage: React.FC = () => {
  return (
    <ProCard
      style={
        {
          // height: '80vh',
          // minHeight: 600,
        }
      }
    >
      <CreateAccountDrawer />
    </ProCard>
  );
};

export default TestPage;
