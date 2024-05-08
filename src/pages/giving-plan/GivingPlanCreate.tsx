import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Button, Result, Empty } from 'antd';
import { ProCard, PageContainer } from '@ant-design/pro-components';

import {
  PlusOutlined,
  LeftOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';

const GivingPlanCreate: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/giving-plan');
  };

  return (
    <PageContainer
      extra={
        <Button key="2" type="text" onClick={goBack}>
          Maybe Later
        </Button>
      }
      header={{
        title: 'Create a Giving Plan',
      }}
      // subTitle="Simple Description"
      style={{ width: '100%', margin: 'auto', maxWidth: '800px' }}
    >
      <ProCard
        style={
          {
            // height: '80vh',
            // minHeight: 600,
            // paddingBottom: 40,
          }
        }
      >
        <Flex align="center" vertical>
          TODO
          <br />
          ...
          <br />
          <br />
          <br />
          <br />
          <br />
          Create this : {'<'} GivingPlanForm / {'>'}
          {/* <GivingPlanForm /> */}
        </Flex>
      </ProCard>
    </PageContainer>
  );
};

export default GivingPlanCreate;
