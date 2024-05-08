import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Button, Result, Empty } from 'antd';
import { ProCard, PageContainer } from '@ant-design/pro-components';

import {
  PlusOutlined,
  LeftOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';

const FundraisingTeamInvitation: React.FC = () => {
  const navigate = useNavigate();

  const goToTeams = () => {
    navigate('/fundraising/teams');
  };

  return (
    <PageContainer
      extra={
        <Button key="2" type="text" onClick={goToTeams}>
          <ArrowLeftOutlined /> Back To Teams
        </Button>
      }
      header={{
        title: 'Invitations',
        breadcrumb: {
          items: [
            {
              title: 'Fundraising',
            },
            {
              title: 'Teams',
            },
            {
              title: 'Invitations',
            },
          ],
        },
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
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No invitation"
          />
        </Flex>
      </ProCard>
    </PageContainer>
  );
};

export default FundraisingTeamInvitation;
