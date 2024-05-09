import { useGlobalState } from './../../GlobalProvider';

import React from 'react';
import { Flex, Button, Result, theme } from 'antd';
import { ProCard, PageContainer } from '@ant-design/pro-components';

import { useNavigate } from 'react-router-dom';

import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { FundraisingTeamMemberListItem } from '../../ui/FundraisingTeamMemberListItem';

const FundraisingTeamMember: React.FC = () => {
  const { isEmpty } = useGlobalState();
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const inviteMember = () => {
    navigate('/fundraising/teams/invite-member');
  };

  const goToTeams = () => {
    navigate('/fundraising/teams');
  };

  return (
    <PageContainer
      header={{
        title: 'Firdaus Fields School Fundraisers',
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
        <Button key="1" onClick={inviteMember}>
          Invite Member
        </Button>,
      ]}
      // subTitle="Simple Description"
      style={{ width: '100%', margin: 'auto', maxWidth: '1000px' }}
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
          justify='space-between'
        //   vertical
          // style={{ margin: `-${token.sizeLG}px 0` }}
        >
          {mockData.map((data, index) => (
            <FundraisingTeamMemberListItem
              key={index}
              imgUrl={data.imgUrl}
              pageTitle={data.title}
              fundraiserName={data.fundraiserName}
              fundraiserAvatarURL={data.fundraiserAvatarURL}
              supporterCount={data.supporters}
              completionPercent={data.progress}
              amountRaised={data.fundraised}
              target={data.target}
              dayLeft={data.dayLeft}
            />
          ))}
        </Flex>
      )}
        </>
      )}
    </PageContainer>
  );
};

export default FundraisingTeamMember;


// Mockup data
  const mockData = [
    {
      title: 'Climb the mountain for kids',
      fundraiserName: 'Ali',
      fundraiserAvatarURL: 'https://i.pravatar.cc/82',
      imgUrl:
        'https://images.pexels.com/photos/461593/pexels-photo-461593.jpeg?auto=compress&cs=tinysrgb&w=400',
      supporters: 128,
      progress: 58,
      fundraised: '£1,740',
      target: '£3,000',
      dayLeft: 48,
    },
    {
      title: 'Run for Books',
      fundraiserName: 'Ella',
      fundraiserAvatarURL: 'https://i.pravatar.cc/92',
      imgUrl:
        'https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=400',
      supporters: 95,
      progress: 40,
      fundraised: '£1,200',
      target: '£2,500',
      dayLeft: 22,
    },
    {
      title: 'Art Auction for Creativity',
      fundraiserName: 'Max',
      fundraiserAvatarURL: 'https://i.pravatar.cc/82',
      imgUrl:
        'https://images.pexels.com/photos/998067/pexels-photo-998067.jpeg?auto=compress&cs=tinysrgb&w=400',
      supporters: 180,
      progress: 60,
      fundraised: '£3,600',
      target: '£5,000',
      dayLeft: 14,
    },
    {
      title: 'Bake Sale Bonanza',
      fundraiserName: 'Sophie',
      fundraiserAvatarURL: 'https://i.pravatar.cc/65',
      imgUrl:
        'https://images.pexels.com/photos/5561446/pexels-photo-5561446.jpeg?auto=compress&cs=tinysrgb&w=400',
      supporters: 75,
      progress: 25,
      fundraised: '£500',
      target: '£2,000',
      dayLeft: 10,
    },
    {
      title: '2 miles Marathon for School Programs',
      fundraiserName: 'Jack',
      fundraiserAvatarURL: 'https://i.pravatar.cc/154',
      imgUrl:
        'https://images.pexels.com/photos/2002209/pexels-photo-2002209.jpeg?auto=compress&cs=tinysrgb&w=400',
      supporters: 300,
      progress: 90,
      fundraised: '£4,500',
      target: '£5,000',
      dayLeft: 5,
    },
    {
      title: 'Quiz Night for Technology',
      fundraiserName: 'Emma',
      fundraiserAvatarURL: 'https://i.pravatar.cc/94',
      imgUrl:
        'https://images.pexels.com/photos/207756/pexels-photo-207756.jpeg?auto=compress&cs=tinysrgb&w=400',
      supporters: 150,
      progress: 50,
      fundraised: '£1,500',
      target: '£3,000',
      dayLeft: 18,
    },
    {
      title: 'Gardening Day for Green Spaces',
      fundraiserName: 'Oliver',
      fundraiserAvatarURL: 'https://i.pravatar.cc/87',
      imgUrl:
        'https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?auto=compress&cs=tinysrgb&w=400',
      supporters: 50,
      progress: 20,
      fundraised: '£400',
      target: '£1,000',
      dayLeft: 7,
    },
    {
      title: 'Craft Fair for Art Supplies',
      fundraiserName: 'Lily',
      fundraiserAvatarURL: 'https://i.pravatar.cc/78',
      imgUrl:
        'https://images.pexels.com/photos/6941096/pexels-photo-6941096.jpeg?auto=compress&cs=tinysrgb&w=400',
      supporters: 120,
      progress: 70,
      fundraised: '£2,800',
      target: '£4,000',
      dayLeft: 12,
    },
    {
      title: 'Music Concert for Instruments',
      fundraiserName: 'Noah',
      fundraiserAvatarURL: 'https://i.pravatar.cc/91',
      imgUrl:
        'https://placehold.co/300x300',
      supporters: 200,
      progress: 80,
      fundraised: '£4,000',
      target: '£5,000',
      dayLeft: 3,
    },
    {
        title: 'Strong together for education',
        fundraiserName: 'Budi',
        fundraiserAvatarURL: 'https://i.pravatar.cc/82',
        imgUrl:
          'https://placehold.co/300x300',
        supporters: 256,
        progress: 75,
        fundraised: '£2,250',
        target: '£3,000',
        dayLeft: 30,
      },
    {
      title: 'Food Festival for School Meals',
      fundraiserName: 'Ava',
      fundraiserAvatarURL: 'https://i.pravatar.cc/82',
      imgUrl:
        'https://placehold.co/300x300',
      supporters: 90,
      progress: 35,
      fundraised: '£1,050',
      target: '£3,000',
      dayLeft: 25,
    },
    {
      title: 'Science Fair for Lab Equipment',
      fundraiserName: 'James',
      fundraiserAvatarURL: 'https://i.pravatar.cc/84',
      imgUrl:
        'https://placehold.co/300x300',
      supporters: 110,
      progress: 45,
      fundraised: '£900',
      target: '£2,000',
      dayLeft: 15,
    },
    {
      title: 'Movie Night Fundraiser',
      fundraiserName: 'Mia',
      fundraiserAvatarURL: 'https://i.pravatar.cc/86',
      imgUrl:
        'https://placehold.co/300x300',
      supporters: 140,
      progress: 55,
      fundraised: '£1,650',
      target: '£3,000',
      dayLeft: 20,
    },
    {
      title: 'Charity Auction for Scholarships',
      fundraiserName: 'William',
      fundraiserAvatarURL: 'https://i.pravatar.cc/87',
      imgUrl:
        'https://placehold.co/300x300',
      supporters: 85,
      progress: 30,
      fundraised: '£600',
      target: '£2,000',
      dayLeft: 8,
    },
    {
      title: 'Charity Auction for Scholarships',
      fundraiserName: 'William',
      fundraiserAvatarURL: 'https://i.pravatar.cc/87',
      imgUrl:
        'https://placehold.co/300x300',
      supporters: 85,
      progress: 30,
      fundraised: '£600',
      target: '£2,000',
      dayLeft: 8,
    },
  ];
  