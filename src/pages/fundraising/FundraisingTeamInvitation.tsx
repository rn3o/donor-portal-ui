import { useGlobalState } from './../../GlobalProvider';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Button, Avatar, Empty, Typography, theme } from 'antd';
import { ProCard, PageContainer } from '@ant-design/pro-components';

import {
  PlusOutlined,
  LeftOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';

const FundraisingTeamInvitation: React.FC = () => {
  const navigate = useNavigate();
  const { isEmpty } = useGlobalState();
  

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
          {isEmpty ?
            (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="You don't have team invitation at the moment"
              />
            ) : (
              <InvitationItem />
            )
          }
        </Flex>
      </ProCard>
    </PageContainer>
  );
};

export default FundraisingTeamInvitation;


const InvitationItem: React.FC = () => {

  const { token } = theme.useToken();

  return (
    <Flex justify='space-between' style={{ width: '100%'}}>

      <Flex gap={token.sizeXS}>
        <Avatar size={'large'} src='https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=80' /><br />
        <Typography.Text><b>Mikael</b> is inviting you to team up with
          <br /><b>Safa Springs Academy</b></Typography.Text>
      </Flex>

      <Button>Accept</Button>
    </Flex>
  );
};