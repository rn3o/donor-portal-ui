import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Button, Result, Empty } from 'antd';
import { ProCard, PageContainer } from '@ant-design/pro-components';

import {
  PlusOutlined,
  LeftOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';

const DonationCreate: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/donation');
  };

  return (
    <PageContainer
      extra={
        <Button key="2" type="text" onClick={goBack}>
          Maybe Later
        </Button>
      }
      header={{
        title: 'Make an Impact!',
        // breadcrumb: {
        //   items: [
        //     {
        //       title: 'Donation',
        //     },
        //     {
        //       title: 'Create',
        //     },
        //   ],
        // },
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
          Create this : {'<'} DonationForm / {'>'}
          {/* <DonationForm /> */}
        </Flex>
      </ProCard>
    </PageContainer>
  );
};

export default DonationCreate;
