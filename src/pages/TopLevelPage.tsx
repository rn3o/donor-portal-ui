import React, { useState } from 'react';
import { Flex, Typography } from 'antd';
import {
  FolderOutlined,
  ShareAltOutlined,
  UserOutlined,
  PlusOutlined,
} from '@ant-design/icons';

const { Text, Link } = Typography;

const TopLevelPage: React.FC = () => {


  return (
    <div
      style={{
        height: '80vh',
        minHeight: 1200,
        alignItems: 'center'
      }}
    >
      <Flex vertical>
        <Text>I'm a top <s>notch</s> level page </Text>
        <Text style={{ opacity: 0.2}}>for test purposes only</Text>

      </Flex>
      
      <div />
    </div>
  );
};

export default TopLevelPage;

