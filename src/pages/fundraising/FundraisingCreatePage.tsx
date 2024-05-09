import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Button, Result, Empty, Steps } from 'antd';
import { ProCard, PageContainer } from '@ant-design/pro-components';


import StepsDemo from './../../ui/demo/StepsDemo';

import {
  PlusOutlined,
  LeftOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';

const FundraisingCreatePage: React.FC = () => {
  const navigate = useNavigate();

  const goToPages = () => {
    navigate('/fundraising/pages');
  };

  return (
    <PageContainer
      extra={
        <Button key="2" type="text" onClick={goToPages}>
          Cancel
        </Button>
      }
      header={{
        title: 'Create A Fundraising Page',
        breadcrumb: {
          items: [
            {
              title: 'Fundraising',
            },
            {
              title: 'Pages',
            },
            {
              title: 'Create',
            },
          ],
        },
      }}
      // subTitle="Simple Description"
      style={{ width: '100%', margin: 'auto', maxWidth: '640px' }}
    >
      
      <StepsDemo />
      <br />
      <br />

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
          TODO, steps of creating a fundraising page
        </Flex>
      </ProCard>
    </PageContainer>
  );
};

export default FundraisingCreatePage;
