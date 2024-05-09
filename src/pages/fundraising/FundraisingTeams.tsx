import { useGlobalState } from './../../GlobalProvider';

import React from 'react';
import { Flex, Button, Result, theme } from 'antd';
import { ProCard, PageContainer } from '@ant-design/pro-components';

import { useNavigate } from 'react-router-dom';

import { PlusOutlined } from '@ant-design/icons';
import { FundraisingTeamListItem } from '../../ui/FundraisingTeamListItem';

const FundraisingTeams: React.FC = () => {
  const { isEmpty } = useGlobalState();
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const seeInvitations = () => {
    navigate('/fundraising/teams/invitations');
  };

  const createTeams = () => {
    navigate('/fundraising/teams/create');
  };

  return (
    <PageContainer
      header={{
        title: 'Teams',
        breadcrumb: {
          items: [
            {
              title: 'Fundraising',
            },
            {
              title: 'Teams',
            },
          ],
        },
      }}
      extra={[
        <Button type="text" key="2" onClick={seeInvitations}>
          See Invitations
        </Button>,
        <Button key="1" onClick={createTeams} icon={<PlusOutlined />}>
          Create a Team
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
                  You are not part of any team at the moment.
                  <br />
                  Team up with others or create a team to get started.
                </>
              }
              extra={
                <Button
                  key="1"
                  type="primary"
                  size="large"
                  icon={<PlusOutlined />}
                  onClick={createTeams}
                >
                  Create a Team
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
                  onClick={createTeams}
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
          {mockData.map((data, index) => (
            <FundraisingTeamListItem
              key={index}
              imgUrl={data.imgUrl}
              name={data.title}
              supporterCount={data.supporters}
              completionPercent={data.progress}
              teamMember={data.teamMember}
              amountRaised={data.fundraised}
              target={data.target}
              dayLeft={data.dayLeft}
              isOwner={data.isOwner}
              pageRoute={data.pageRoute}
            />
          ))}
        </Flex>
      )}
        </>
      )}
    </PageContainer>
  );
};

export default FundraisingTeams;


// Mockup data
const mockData = [
  {
    title: 'Safa Springs Academy',
    imgUrl:
      'https://placehold.co/300x300?text=No Image',
    supporters: 0,
    progress: 0,
    fundraised: '0',
    teamMember: 0,
    target: '£100,000',
    dayLeft: 120,
    isOwner: true,
    pageRoute: '/fundraising/teams/members-empty'
  },
  {
    title: 'Firdaus Fields School',
    imgUrl:
      'https://images.pexels.com/photos/1206101/pexels-photo-1206101.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    supporters: 998,
    progress: 58,
    fundraised: '£71,740',
    teamMember: 38,
    target: '£123,000',
    dayLeft: 120,
    isOwner: false,
    pageRoute: '/fundraising/teams/members'
  },
];
