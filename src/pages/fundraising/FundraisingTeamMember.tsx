import { useGlobalState } from './../../GlobalProvider';

import React from 'react';
import { Flex, Button, Result, theme } from 'antd';
import { ProCard, PageContainer } from '@ant-design/pro-components';

import { useNavigate } from 'react-router-dom';

import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { FundraisingTeamListItem } from '../../ui/FundraisingTeamListItem';

const FundraisingTeamMember: React.FC = () => {
  const { isEmpty } = useGlobalState();
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const seeInvitations = () => {
    navigate('/fundraising/teams/invitations');
  };

  const inviteMember = () => {
    navigate('/fundraising/teams/invite-member');
  };

  const goToTeams = () => {
    navigate('/fundraising/teams');
  };

  return (
    <PageContainer
      header={{
        title: 'Firdaus Fields School',
        breadcrumb: {
          items: [
            {
              title: 'Fundraising',
            },
            {
              title: 'Teams',
            },
            {
              title: 'Fundraisers',
            },
          ],
        },
      }}
      extra={[
        <Button type="text" key="2" onClick={goToTeams}>
          <ArrowLeftOutlined /> Back to Teams
        </Button>,
        <Button key="1" onClick={seeInvitations}>
          Invite Member
        </Button>,
      ]}
      // subTitle="Simple Description"
      style={{ width: '100%', margin: 'auto', maxWidth: '800px' }}
    >
      {isEmpty ? (
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
            <Result
              // status="404"
              icon={
                <img src="https://res.cloudinary.com/rn3o/image/upload/v1714642400/empty-no-team_gmualx.svg" />
              }
              title="Let's team up!"
              subTitle={
                <>
                  No Member yet
                </>
              }
              extra={
                <Button
                  key="1"
                  type="primary"
                  size="large"
                  icon={<PlusOutlined />}
                  onClick={inviteMember}
                >
                  Invite Fundraiser to team up
                </Button>
              }
            />
          </Flex>
        </ProCard>
      ) : (
        <>
          {isEmpty ? (
        <ProCard
          style={{
            padding: `${token.sizeSM}px 0`,
          }}
        >
          <Flex align="center" vertical>
            <Result
              // status="404"
              icon={
                <img src="https://res.cloudinary.com/rn3o/image/upload/v1714641887/empty-no-fundraising-page_uv6kkn.svg" />
              }
              title="Still Empty"
              subTitle={
                <>
                  You don’t have any Fundraising Page yet.
                  <br />
                  Let’s start one whenever you are ready.
                </>
              }
              extra={
                <Button
                  key="1"
                  type="primary"
                  size="large"
                  icon={<PlusOutlined />}
                  onClick={inviteMember}
                >
                  Create a Fundraising Page
                </Button>
              }
            />
          </Flex>
        </ProCard>
      ) : (
        <Flex
          gap={token.sizeMD}
          wrap="wrap"
          vertical
          // style={{ margin: `-${token.sizeLG}px 0` }}
        >
          list of members
        </Flex>
      )}
        </>
      )}
    </PageContainer>
  );
};

export default FundraisingTeamMember;


// Mockup data
